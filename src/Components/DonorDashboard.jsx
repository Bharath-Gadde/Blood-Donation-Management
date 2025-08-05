import React, { useEffect, useState } from "react";
import axios from "axios";

const DonorDashboard = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Replace with actual donor ID from auth context/session
    const donorId = localStorage.getItem("donor_id");
    axios.get(`http://localhost:3001/donation-history/${donorId}`)
      .then(res => setHistory(res.data));
  }, []);

  return (
    <div>
      <h2>Welcome, Donor!</h2>
      <h3>Your Donation History</h3>
      <ul>
        {history.map((item) => (
          <li key={item.id}>
            {item.donation_date} - {item.location} - {item.hospital} - {item.notes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonorDashboard;