import React, { useState } from "react";
import axios from "axios";

const CompanyDashboard = () => {
  const [location, setLocation] = useState("");
  const [donors, setDonors] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  const searchDonors = async () => {
    const res = await axios.get("http://localhost:3008/search-donors", {
      params: { location }
    });
    setDonors(res.data);
  };

  const sendEmail = async () => {
    await axios.post("http://localhost:3010/send-email", {
      recipients: selectedEmails.join(","),
      subject,
      text
    });
    alert("Email sent!");
  };

  return (
    <div>
      <h2>Welcome, Company!</h2>
      <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" />
      <button onClick={searchDonors}>Search Donors</button>
      <ul>
        {donors.map(d => (
          <li key={d.id}>
            <input type="checkbox" onChange={e => {
              if (e.target.checked) setSelectedEmails([...selectedEmails, d.Email]);
              else setSelectedEmails(selectedEmails.filter(email => email !== d.Email));
            }} />
            {d.Fullname} - {d.Email}
          </li>
        ))}
      </ul>
      <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" />
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Message" />
      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
};

export default CompanyDashboard;