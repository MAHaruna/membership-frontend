import { useState } from "react";
import { createMember } from "../services/memberService";
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
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await createMember(form);

      setMessage("Member created successfully ✅");

      // reset form
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

      // callback to parent (dashboard/list refresh)
      if (onSuccess) onSuccess();

    } catch (err) {
      console.error(err);
      setMessage("Failed to create member ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="member-form-container">

      <form onSubmit={handleSubmit} className="member-form">

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
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="state"
          placeholder="State ID"
          value={form.state}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="senatorial_zone"
          placeholder="Senatorial Zone ID"
          value={form.senatorial_zone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="local_government"
          placeholder="Local Government ID"
          value={form.local_government}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="ward"
          placeholder="Ward ID"
          value={form.ward}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="polling_unit"
          placeholder="Polling Unit ID"
          value={form.polling_unit}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Register Member"}
        </button>

      </form>

      {message && <p className="form-message">{message}</p>}

    </div>
  );
}

export default MemberForm;