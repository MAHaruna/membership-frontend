import { useEffect, useState } from "react";
import { createMember } from "../services/memberService";
import {
  getStates,
  getZones,
  getLGAs,
  getWards,
  getPollingUnits,
} from "../services/locationService";
import "./MemberForm.css";

function MemberForm({ onSuccess }) {
  const [form, setForm] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    state: "",
    senatorial_zone: "",
    local_government: "",
    ward: "",
    polling_unit: "",
  });

  const [loading, setLoading] = useState(false);

  const [states, setStates] = useState([]);
  const [zones, setZones] = useState([]);
  const [lgas, setLgas] = useState([]);
  const [wards, setWards] = useState([]);
  const [pollingUnits, setPollingUnits] = useState([]);

  useEffect(() => {
    loadStates();
  }, []);

  const loadStates = async () => {
    try {
      const data = await getStates();
      setStates(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    // Upstream local update execution prevents state race conditions
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    try {
      if (name === "state") {
        if (!value) return;
        const zoneData = await getZones(value);
        setZones(zoneData);
        setLgas([]);
        setWards([]);
        setPollingUnits([]);
        setForm((prev) => ({
          ...prev,
          state: value,
          senatorial_zone: "",
          local_government: "",
          ward: "",
          polling_unit: "",
        }));
      }

      if (name === "senatorial_zone") {
        if (!value) return;
        const lgaData = await getLGAs(value);
        setLgas(lgaData);
        setWards([]);
        setPollingUnits([]);
        setForm((prev) => ({
          ...prev,
          senatorial_zone: value,
          local_government: "",
          ward: "",
          polling_unit: "",
        }));
      }

      if (name === "local_government") {
        if (!value) return;
        const wardData = await getWards(value);
        setWards(wardData);
        setPollingUnits([]);
        setForm((prev) => ({
          ...prev,
          local_government: value,
          ward: "",
          polling_unit: "",
        }));
      }

      if (name === "ward") {
        if (!value) return;
        const pollingData = await getPollingUnits(value);
        setPollingUnits(pollingData);
        setForm((prev) => ({
          ...prev,
          ward: value,
          polling_unit: "",
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createMember(form);
      alert("Member registered successfully");
      setForm({
        full_name: "",
        phone_number: "",
        email: "",
        state: "",
        senatorial_zone: "",
        local_government: "",
        ward: "",
        polling_unit: "",
      });
      setZones([]);
      setLgas([]);
      setWards([]);
      setPollingUnits([]);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      alert("Failed to register member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form className="member-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Register New Member</h2>
          <p>Provide personal and regional deployment information</p>
        </div>

        {/* SECTION 1: PERSONAL DETAILS */}
        <fieldset className="form-section">
          <legend>Personal Profiles</legend>
          <div className="input-group">
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={form.full_name}
              onChange={handleChange}
              required
            />
            <label>Full Name</label>
          </div>

          <div className="input-grid-2x">
            <div className="input-group">
              <input
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                value={form.phone_number}
                onChange={handleChange}
                required
              />
              <label>Phone Number</label>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
              />
              <label>Email Address</label>
            </div>
          </div>
        </fieldset>

        {/* SECTION 2: REGIONAL PLACEMENT */}
        <fieldset className="form-section">
          <legend>Regional / Location Parameters</legend>
          
          <div className="input-grid-2x">
            <div className="input-group">
              <select 
                name="state" 
                value={form.state} 
                onChange={handleChange} 
                data-has-value={!!form.state}
                required
              >
                <option value="" disabled hidden></option>
                {states.map((state) => (
                  <option key={state.id} value={state.id}>{state.name}</option>
                ))}
              </select>
              <label>State Hierarchy</label>
            </div>

            <div className="input-group">
              <select
                name="senatorial_zone"
                value={form.senatorial_zone}
                onChange={handleChange}
                disabled={!form.state}
                data-has-value={!!form.senatorial_zone}
                required
              >
                <option value="" disabled hidden></option>
                {zones.map((zone) => (
                  <option key={zone.id} value={zone.id}>{zone.name}</option>
                ))}
              </select>
              <label>Senatorial Zone</label>
            </div>
          </div>

          <div className="input-grid-3x">
            <div className="input-group">
              <select
                name="local_government"
                value={form.local_government}
                onChange={handleChange}
                disabled={!form.senatorial_zone}
                data-has-value={!!form.local_government}
                required
              >
                <option value="" disabled hidden></option>
                {lgas.map((lga) => (
                  <option key={lga.id} value={lga.id}>{lga.name}</option>
                ))}
              </select>
              <label>Local Government</label>
            </div>

            <div className="input-group">
              <select
                name="ward"
                value={form.ward}
                onChange={handleChange}
                disabled={!form.local_government}
                data-has-value={!!form.ward}
                required
              >
                <option value="" disabled hidden></option>
                {wards.map((ward) => (
                  <option key={ward.id} value={ward.id}>{ward.name}</option>
                ))}
              </select>
              <label>Ward Jurisdiction</label>
            </div>

            <div className="input-group">
              <select
                name="polling_unit"
                value={form.polling_unit}
                onChange={handleChange}
                disabled={!form.ward}
                data-has-value={!!form.polling_unit}
                required
              >
                <option value="" disabled hidden></option>
                {pollingUnits.map((unit) => (
                  <option key={unit.id} value={unit.id}>{unit.name}</option>
                ))}
              </select>
              <label>Polling Unit</label>
            </div>
          </div>
        </fieldset>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? (
            <span className="loader-container">
              <span className="mini-spinner"></span> Processing...
            </span>
          ) : (
            "Complete Registration"
          )}
        </button>
      </form>
    </div>
  );
}

export default MemberForm;