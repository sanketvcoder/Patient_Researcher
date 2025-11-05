import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  User,
  HeartPulse,
  MapPin,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import axios from "axios";

const steps = [
  { id: 1, label: "Basic Bio", icon: <User size={16} /> },
  { id: 2, label: "Disease / Interest + Address", icon: <HeartPulse size={16} /> },
  { id: 3, label: "Confirm", icon: <CheckCircle size={16} /> },
];

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 200 : -200, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction < 0 ? 200 : -200, opacity: 0 }),
};

const ProfileSetup = ({ initialRole = "patient" }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryRole = searchParams.get("role");

  useEffect(() => {
    if (!queryRole) navigate("/choice-section");
  }, [queryRole, navigate]);

  const [role, setRole] = useState(queryRole || initialRole);
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    diseases: [],
    interests: [],
    city: "",
    state: "",
    country: "",
    address: "",
  });
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      diseases: prev.diseases || [],
      interests: prev.interests || [],
    }));
  }, [role]);

  const next = () => {
    if (stepIndex < steps.length - 1) {
      setDirection(1);
      setStepIndex((s) => s + 1);
    }
  };
  const back = () => {
    if (stepIndex > 0) {
      setDirection(-1);
      setStepIndex((s) => s - 1);
    }
  };

  const updateField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const addTag = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (role === "patient") {
      if (!form.diseases.includes(trimmed)) {
        updateField("diseases", [...form.diseases, trimmed]);
      }
    } else {
      if (!form.interests.includes(trimmed)) {
        updateField("interests", [...form.interests, trimmed]);
      }
    }
    setTagInput("");
  };

  const removeTag = (tag) => {
    if (role === "patient")
      updateField("diseases", form.diseases.filter((t) => t !== tag));
    else updateField("interests", form.interests.filter((t) => t !== tag));
  };

  const canProceedToStep2 = () =>
    form.name.trim() && /\S+@\S+\.\S+/.test(form.email) && form.phone.trim();

  const canProceedToStep3 = () =>
    (role === "patient" ? form.diseases.length > 0 : form.interests.length > 0) &&
    form.city.trim() &&
    form.state.trim() &&
    form.country.trim() &&
    form.address.trim();

  const buildPayload = () => {
    const base = {
      name: form.name.trim(),
      email: form.email.trim(),
      basic_bio: form.bio.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      country: form.country.trim(),
      address: form.address.trim(),
      phone_no: form.phone.trim(),
    };
    return role === "patient"
      ? { ...base, diseases: form.diseases }
      : { ...base, interest: form.interests };
  };

const handleSubmit = async () => {
  setIsSubmitting(true);
  const payload = buildPayload();

  try {
    const endpoint =
      role === "patient"
        ? "http://localhost:3000/api/patients"
        : "http://localhost:3000/api/researchers";

    console.log("📦 Sending payload:", payload);

    const res = await axios.post(endpoint, payload, {
      withCredentials: true,
    });

    console.log("✅ Server response:", res.data);
    setSuccess(true);
    setShowPopup(true);

    // 👇 Navigation logic after successful submission
    setTimeout(() => {
      setShowPopup(false);

      // Navigate based on diseases or interests
      if (payload.diseases && payload.diseases.length > 0) {
        navigate("/patient/dashboard");
      } else if (payload.interest && payload.interest.length > 0) {
        navigate("/researcher/dashboard");
      } else {
        navigate("/dashboard"); // fallback if neither present
      }
    }, 2000); // Wait for popup animation to finish
  } catch (err) {
    console.error("❌ Submit error:", err);
    alert("Submit failed — check console for details.");
  } finally {
    setIsSubmitting(false);
  }
};


  const progress = (stepIndex + (success ? 1 : 0)) / steps.length;

  return (
    <div className="ps-page">
      <div className="topbar">
        <div className="progress-wrap">
          <div
            className="progress"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>

        <div className="role-toggle">
          <button
            className={`role-btn ${role === "patient" ? "active" : ""}`}
            onClick={() => setRole("patient")}
          >
            Patient
          </button>
          <button
            className={`role-btn ${role === "researcher" ? "active" : ""}`}
            onClick={() => setRole("researcher")}
          >
            Researcher
          </button>
        </div>
      </div>

      {/* Step Tracker */}
      <div className="step-tracker">
        {steps.map((s, i) => {
          const completed = success ? i <= stepIndex : i < stepIndex;
          const current = i === stepIndex;
          return (
            <div className="step-item" key={s.id}>
              <div
                className={`step-bubble ${completed ? "done" : ""} ${
                  current ? "current" : ""
                }`}
              >
                {completed ? <CheckCircle size={18} /> : <span>{s.id}</span>}
              </div>
              <div className="step-label">{s.label}</div>
              {i < steps.length - 1 && <div className="step-line" />}
            </div>
          );
        })}
      </div>

      {/* Step Cards */}
      <div className="card-wrap">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={stepIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35 }}
            className="card"
          >
            {/* STEP 0 */}
            {stepIndex === 0 && (
              <div className="step-content">
                <h3>{role === "patient" ? "Patient Bio" : "Researcher Bio"}</h3>
                <div className="field">
                  <span>Name</span>
                  <input
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="field">
                  <span>Email</span>
                  <input
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="field">
                  <span>Phone</span>
                  <input
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="field">
                  <span>Bio</span>
                  <textarea
                    value={form.bio}
                    onChange={(e) => updateField("bio", e.target.value)}
                    placeholder="Write a short bio..."
                  />
                </div>

                <div className="nav-row">
                  <button className="nav-btn back" onClick={back} disabled={stepIndex === 0}>
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    className="nav-btn next"
                    onClick={next}
                    disabled={!canProceedToStep2()}
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 1 */}
            {stepIndex === 1 && (
              <div className="step-content">
                <h3>
                  {role === "patient"
                    ? "Diseases & Address Info"
                    : "Research Interests & Address Info"}
                </h3>

                <div className="tags-input">
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder={
                      role === "patient"
                        ? "Type a disease and press Add"
                        : "Type an interest and press Add"
                    }
                  />
                  <button className="add-tag" onClick={() => addTag(tagInput)}>
                    Add
                  </button>
                </div>
                <div className="tags">
                  {(role === "patient" ? form.diseases : form.interests).map(
                    (tag, idx) => (
                      <div className="tag" key={idx}>
                        {tag}
                        <button onClick={() => removeTag(tag)}>x</button>
                      </div>
                    )
                  )}
                </div>

                <div className="field">
                  <span>City</span>
                  <input
                    value={form.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    placeholder="Enter your city"
                  />
                </div>
                <div className="field">
                  <span>State</span>
                  <input
                    value={form.state}
                    onChange={(e) => updateField("state", e.target.value)}
                    placeholder="Enter your state"
                  />
                </div>
                <div className="field">
                  <span>Country</span>
                  <input
                    value={form.country}
                    onChange={(e) => updateField("country", e.target.value)}
                    placeholder="Enter your country"
                  />
                </div>
                <div className="field">
                  <span>Address</span>
                  <textarea
                    value={form.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    placeholder="Enter your address"
                  />
                </div>

                <div className="nav-row">
                  <button className="nav-btn back" onClick={back}>
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    className="nav-btn next"
                    onClick={next}
                    disabled={!canProceedToStep3()}
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {stepIndex === 2 && (
              <div className="step-content">
                <h3>Confirm Details</h3>
                <div className="preview">
                  {Object.entries(form).map(([key, val]) => (
                    <div className="preview-row" key={key}>
                      <strong>{key}</strong>
                      <span>
                        {Array.isArray(val) ? val.join(", ") : val || "—"}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="nav-row">
                  <button className="nav-btn back" onClick={back}>
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    className="confirm-btn"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="spin" size={16} /> Submitting...
                      </>
                    ) : (
                      "Confirm & Submit"
                    )}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="popup"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CheckCircle size={26} />
            <span>Profile Created Successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="small-footer">
        <MapPin size={14} />{" "}
        <span>
          Data prepared for PostgreSQL tables — ready to send via axios.post()
        </span>
      </div>

      {/* (CSS unchanged) */}
      {<style>{ `:root{ --navy:#0f1724; --blue:#00d4ff; --accent:#8a2be2; --card-bg: rgba(255,255,255,0.03); --muted: rgba(255,255,255,0.7); } .ps-page{ min-height: 100vh; padding: 36px 18px; display:flex; flex-direction:column; align-items:center; background: linear-gradient(-45deg, #0f0c29, #302b63, #24243e, #302b63); color: #eef2ff; font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; } /* Topbar */ .topbar{ width:100%; max-width:980px; display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:18px; } .progress-wrap{ flex:1; height:8px; background: rgba(255,255,255,0.05); border-radius:6px; overflow:hidden; margin-right:16px; } .progress{ height:100%; background: linear-gradient(90deg,var(--blue), var(--accent)); transform-origin:left; transition: transform 350ms ease; } .role-toggle{ display:flex; gap:8px; background: rgba(255,255,255,0.03); padding:6px; border-radius:999px; border:1px solid rgba(255,255,255,0.04); } .role-btn{ padding:8px 12px; border-radius:999px; background:transparent; color:var(--muted); border:none; cursor:pointer; } .role-btn.active{ background: linear-gradient(90deg,var(--blue), var(--accent)); color:white; box-shadow: 0 6px 24px rgba(138,43,226,0.12); } /* Step tracker */ .step-tracker{ width:100%; max-width:980px; display:flex; gap:12px; justify-content:space-between; align-items:center; padding:8px 10px; margin-bottom:22px; overflow:auto; } .step-item{ display:flex; align-items:center; gap:10px; min-width:120px; } .step-bubble{ width:40px; height:40px; border-radius:50%; background: var(--card-bg); display:flex; align-items:center; justify-content:center; color: var(--blue); border:1px solid rgba(255,255,255,0.06); font-weight:600; } .step-bubble.current{ box-shadow: 0 6px 24px rgba(0,212,255,0.12); background: linear-gradient(90deg,var(--blue), var(--accent)); color:white; } .step-bubble.done{ background: linear-gradient(90deg, #18d175, #06b78a); color:white; } .step-label{ color: var(--muted); font-size:0.92rem; } .step-line{ height:2px; width:18px; background: rgba(255,255,255,0.03); border-radius:2px } /* Card */ .card-wrap{ width:100%; max-width:980px; display:flex; flex-direction:column; align-items:center; gap:16px; } .card{ width:100%; background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02)); border-radius:14px; padding:22px; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 8px 30px rgba(2,6,23,0.6); } .step-content h3{ margin:0 0 6px 0; color:var(--blue); display:flex; gap:8px; align-items:center } .muted{ color: rgba(255,255,255,0.7); font-size:0.95rem; margin-bottom:8px; } .field{ display:flex; flex-direction:column; gap:8px; margin:10px 0; } .field span{ font-weight:600; color:#dff7ff; font-size:0.95rem; display:flex; align-items:center; gap:8px; } .hint{ font-weight:400; font-size:0.82rem; color:rgba(255,255,255,0.6) } input, textarea{ background: rgba(255,255,255,0.03); color: #eef2ff; border: 1px solid rgba(255,255,255,0.06); padding:10px 12px; border-radius:10px; outline:none; transition: box-shadow 220ms ease, border-color 220ms ease, transform 120ms ease; } input:focus, textarea:focus{ box-shadow: 0 8px 30px rgba(0,212,255,0.08); border-color: rgba(0,212,255,0.6); transform: translateY(-2px); } textarea{ resize:vertical; min-height:90px; } .row{ display:flex; gap:12px; } .small{ flex:1; } /* tags */ .tags-input{ display:flex; gap:8px; align-items:center; margin-top:6px; } .tags-input input{ flex:1; } .add-tag{ background:linear-gradient(90deg,var(--blue),var(--accent)); color:white; border:none; padding:8px 10px; border-radius:8px; cursor:pointer; } .tags{ display:flex; gap:8px; flex-wrap:wrap; margin-top:8px; } .tag{ background: rgba(255,255,255,0.06); padding:6px 8px; border-radius:8px; display:flex; gap:6px; align-items:center; color: #fff; font-size:0.85rem; } .tag button{ background:transparent; border:none; color:#ffd6d6; cursor:pointer; font-weight:700; margin-left:6px; } /* preview */ .preview{ background: rgba(0,0,0,0.25); border-radius:10px; padding:12px; margin:12px 0; border:1px solid rgba(255,255,255,0.04); } .preview-row{ display:flex; justify-content:space-between; gap:12px; padding:8px 6px; border-bottom: 1px dashed rgba(255,255,255,0.03); } .preview-row strong{ color:var(--blue); } .confirm-btn{ margin-top:14px; width:100%; padding:12px 16px; border-radius:10px; border:none; background: linear-gradient(90deg,var(--blue),var(--accent)); color:white; font-weight:700; cursor:pointer; box-shadow: 0 10px 30px rgba(0,212,255,0.14); } .confirm-btn:disabled{ opacity:0.6; cursor:not-allowed; } .nav-row{ display:flex; justify-content:space-between; margin-top:12px; gap:12px; } .nav-btn{ padding:10px 16px; border-radius:10px; border:none; cursor:pointer; display:flex; align-items:center; gap:8px; } .nav-btn.back{ background: rgba(255,255,255,0.04); color:var(--blue) } .nav-btn.next{ background: linear-gradient(90deg,var(--blue),var(--accent)); color:white; box-shadow: 0 8px 24px rgba(0,212,255,0.12); } .success{ display:flex; gap:12px; align-items:center; justify-content:center; margin-top:12px; color:#bfffe8; background: rgba(0,0,0,0.25); padding:12px; border-radius:10px; } .small-footer{ margin-top:18px; color:rgba(255,255,255,0.6); font-size:0.92rem; display:flex; gap:8px; align-items:center; } @media (max-width:880px){ .row{ flex-direction:column; } .step-item{ min-width:90px; } .step-tracker{ gap:8px; padding:8px } .card{ padding:16px } .main-heading { font-size:1.6rem; } }` }</style>}
    </div>
  );
};

export default ProfileSetup;

  

