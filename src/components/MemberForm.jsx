import { useEffect, useState } from "react";
import { createMember } from "../services/memberService";
import {
  getStates,
  getZones,
  getLGAs,
  getWards,
  getPollingUnits,
} from "../services/locationService";

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

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    try {
      // STATE -> ZONES
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

      // ZONE -> LGAS
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

      // LGA -> WARDS
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

      // WARD -> POLLING UNITS
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

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to register member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="member-form" onSubmit={handleSubmit}>
      <h2>Register New Member</h2>

      <input
        type="text"
        name="full_name"
        placeholder="Full Name"
        value={form.full_name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="phone_number"
        placeholder="Phone Number"
        value={form.phone_number}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
      />

      {/* STATE */}
      <select
        name="state"
        value={form.state}
        onChange={handleChange}
        required
      >
        <option value="">Select State</option>

        {states.map((state) => (
          <option key={state.id} value={state.id}>
            {state.name}
          </option>
        ))}
      </select>

      {/* ZONE */}
      <select
        name="senatorial_zone"
        value={form.senatorial_zone}
        onChange={handleChange}
        disabled={!form.state}
        required
      >
        <option value="">Select Senatorial Zone</option>

        {zones.map((zone) => (
          <option key={zone.id} value={zone.id}>
            {zone.name}
          </option>
        ))}
      </select>

      {/* LGA */}
      <select
        name="local_government"
        value={form.local_government}
        onChange={handleChange}
        disabled={!form.senatorial_zone}
        required
      >
        <option value="">Select Local Government</option>

        {lgas.map((lga) => (
          <option key={lga.id} value={lga.id}>
            {lga.name}
          </option>
        ))}
      </select>

      {/* WARD */}
      <select
        name="ward"
        value={form.ward}
        onChange={handleChange}
        disabled={!form.local_government}
        required
      >
        <option value="">Select Ward</option>

        {wards.map((ward) => (
          <option key={ward.id} value={ward.id}>
            {ward.name}
          </option>
        ))}
      </select>

      {/* POLLING UNIT */}
      <select
        name="polling_unit"
        value={form.polling_unit}
        onChange={handleChange}
        disabled={!form.ward}
        required
      >
        <option value="">Select Polling Unit</option>

        {pollingUnits.map((unit) => (
          <option key={unit.id} value={unit.id}>
            {unit.name}
          </option>
        ))}
      </select>

      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register Member"}
      </button>
    </form>
  );
}

export default MemberForm;