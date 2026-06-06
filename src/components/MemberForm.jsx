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

  // dropdown data
  const [states, setStates] = useState([]);
  const [zones, setZones] = useState([]);
  const [lgas, setLgas] = useState([]);
  const [wards, setWards] = useState([]);
  const [pollingUnits, setPollingUnits] = useState([]);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      setStates(await getStates());
      setZones(await getZones());
      setLgas(await getLGAs());
      setWards(await getWards());
      setPollingUnits(await getPollingUnits());
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createMember(form);
      alert("Member created successfully ✅");

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

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      alert("Error creating member ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        name="full_name"
        placeholder="Full Name"
        onChange={handleChange}
        value={form.full_name}
      />

      <input
        name="phone_number"
        placeholder="Phone"
        onChange={handleChange}
        value={form.phone_number}
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={form.email}
      />

      {/* STATE */}
      <select name="state" onChange={handleChange} value={form.state}>
        <option value="">Select State</option>
        {states.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* ZONE */}
      <select name="senatorial_zone" onChange={handleChange} value={form.senatorial_zone}>
        <option value="">Select Zone</option>
        {zones.map((z) => (
          <option key={z.id} value={z.id}>
            {z.name}
          </option>
        ))}
      </select>

      {/* LGA */}
      <select name="local_government" onChange={handleChange} value={form.local_government}>
        <option value="">Select LGA</option>
        {lgas.map((l) => (
          <option key={l.id} value={l.id}>
            {l.name}
          </option>
        ))}
      </select>

      {/* WARD */}
      <select name="ward" onChange={handleChange} value={form.ward}>
        <option value="">Select Ward</option>
        {wards.map((w) => (
          <option key={w.id} value={w.id}>
            {w.name}
          </option>
        ))}
      </select>

      {/* POLLING UNIT */}
      <select name="polling_unit" onChange={handleChange} value={form.polling_unit}>
        <option value="">Select Polling Unit</option>
        {pollingUnits.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <button disabled={loading}>
        {loading ? "Saving..." : "Register Member"}
      </button>

    </form>
  );
}

export default MemberForm;