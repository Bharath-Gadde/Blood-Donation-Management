import React, { useState } from "react";
import axios from "axios";

const HospitalDashboard = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [donors, setDonors] = useState([]);

  const searchDonors = async () => {
    const res = await axios.get("http://localhost:3004/search-donors", {
      params: { blood_group: bloodGroup, location }
    });
    setDonors(res.data);
  };

  return (
    <div>
      <h2>Welcome, Hospital!</h2>
      <input value={bloodGroup} onChange={e => setBloodGroup(e.target.value)} placeholder="Blood Group" />
      <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" />
      <button onClick={searchDonors}>Search Donors</button>
      <ul>
        {donors.map(d => <li key={d.id}>{d.Fullname} - {d.Blood_group} - {d.City}</li>)}
      </ul>
    </div>
  );
};

export default HospitalDashboard;