import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "./registration.css";

function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    role: "patient",
    details: {},
  });

  const navigate = useNavigate();
  const api = "http://localhost:8000/api/registration";
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`${api}/${id}`)
        .then((res) => {
          const data = res.data;
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
          setAge(data.age ? String(data.age) : "");
          setGender(data.gender || "");
          setContactNumber(data.contactNumber || "");
          setEmail(data.email || "");
          setPassword("");
          setConfirmPassword("");
          setFormData({
            role: data.role || "patient",
            details: data.details || {},
          });
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!firstName || !lastName || !email || !contactNumber || !age || !gender || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (!/^\d{10}$/.test(contactNumber)) {
      setError("Phone number must be 10 digits.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (id) {
      await putData();
    } else {
      await postData();
    }
  };

  const postData = async () => {
    try {
      const response = await axios.post(api, {
        firstName,
        lastName,
        age: parseInt(age),
        gender,
        contactNumber,
        email,
        password,
        role: formData.role,
        details: formData.details,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  const putData = async () => {
    try {
      const response = await axios.put(`${api}/${id}`, {
        firstName,
        lastName,
        age: parseInt(age),
        gender,
        contactNumber,
        email,
        password,
        role: formData.role,
        details: formData.details,
      });
      navigate("/login");
    } catch (error) {
      setError("Failed to update user.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const handleDetailsChange = (e) => {
    setFormData({
      ...formData,
      details: { ...formData.details, [e.target.name]: e.target.value },
    });
  };

  return (
    <div className="registration">
      <div className="left">
        <h2 className="h2">{id ? "Update User" : "Registration Form"}</h2>

        <form onSubmit={handleSubmit} className="mt-4 form registration container mt-2 justify-center">
          {error && <p className="text-danger text-center">{error}</p>}

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number (10 digits)"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Select Role:</label>
            <select name="role" value={formData.role} onChange={handleChange} className="form-control">
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          {formData.role === "patient" && (
            <div className="mb-3">
              <label>Diagnosis:</label>
              <input
                type="text"
                className="form-control"
                name="diagnosis"
                placeholder="Enter Diagnosis"
                onChange={handleDetailsChange}
                value={formData.details.diagnosis || ""}
              />
            </div>
          )}

          {formData.role === "doctor" && (
            <>
              <div className="mb-3">
                <label>Specialization:</label>
                <input
                  type="text"
                  className="form-control"
                  name="specialization"
                  placeholder="Enter Specialization"
                  onChange={handleDetailsChange}
                  value={formData.details.specialization || ""}
                />
              </div>
              <div className="mb-3">
                <label>Experience (Years):</label>
                <input
                  type="number"
                  className="form-control"
                  name="experience"
                  placeholder="Enter Experience"
                  onChange={handleDetailsChange}
                  value={formData.details.experience || ""}
                />
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary w-100">
            {id ? "Update" : "Register"}
          </button>

          <p className="mt-3 text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;
