import React, { useState } from 'react';
import './css/Donordetails.css';
import './css/Hospitaldetails.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BsGithub, BsTwitter, BsInstagram, BsFacebook } from "react-icons/bs";

const Companydetails = () => {
  const [values, setValues] = useState({
    Companyname: '',
    Email: '',
    Password_hash: '',
    Password_confirmation: '',
    Contact_number: '',
    Location: '',
    Role: 'Company'
  });

  const [passwordError, setPasswordError] = useState('');

  // Example function to send email
const sendEmail = async (to, subject, text) => {
  try {
    await axios.post('http://localhost:3008/send-email', { to, subject, text });
    alert('Email sent!');
  } catch (error) {
    alert('Failed to send email. Please try again later.');
  }
};

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    if (passwordError) {
      setPasswordError('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (values.Password_hash === values.Password_confirmation) {
      if (values.Password_hash.length >= 8 && values.Password_hash.length <= 15) {
        axios.post('http://localhost:3007/blood-donation', values)
          .then(res => {
            console.log("Registered successfully!!!");
            setValues({
              Companyname: '',
              Email: '',
              Password_hash: '',
              Password_confirmation: '',
              Contact_number: '',
              Location: ''
            });
            alert("Registered successfully");
          })
          .catch(err => {
            console.error('AxiosError:', err);
            alert("Error occurred. Data not saved to the database.");
          });
      } else {
        setPasswordError('Password must be between 8 and 15 characters.');
      }
    } else {
      alert("Error: Password and Password Confirmation do not match.");
    }
  };

  const navigate1 = useNavigate();

  const handleDonateNowClick1 = () => {
    navigate1('/Hospital');
  };

  return (
    <section>
      <div className="container" id='Donordetails'>
        <div className="row">
          <div className="col-12 col-lg-12">
            <form onSubmit={handleSubmit}>
              <label htmlFor="exampleFormControlInput1" className="form-label">Company Name*</label>
              <input type="varchar" className="form-control" name="Companyname" onChange={handleChange} value={values.Companyname} placeholder="" required/>
              
              <label htmlFor="exampleFormControlInput1" className="form-label">Email*</label>
              <input type="email" className="form-control" onChange={handleChange} name="Email" value={values.Email} placeholder="" required/>
              
              <label htmlFor="exampleFormControlInput1" className="form-label">Password*</label>
              <input type="password" className={`form-control ${passwordError ? 'border-red' : ''}`} onChange={handleChange} name="Password_hash" value={values.Password_hash} placeholder="" required/>
              
              {passwordError && <div className="password-error-message">{passwordError}</div>}
              <div className="password-requirement lette">
                <p>Your password can’t be too similar to your other personal information.</p>
                <p>Your password must contain at least 8 characters.</p>
              </div>
              
              <label htmlFor="exampleFormControlInput1" className="form-label">Password Confirmation*</label>
              <input type="password" className="form-control" onChange={handleChange} name="Password_confirmation" value={values.Password_confirmation} placeholder="" required/>
              
              {passwordError && <div className="password-error-message">{passwordError}</div>}

              <label htmlFor="exampleFormControlInput1" className="form-label">Contact No*</label>
              <input type="text" className="form-control" onChange={handleChange} name="Contact_number" value={values.Contact_number} placeholder="" required/>

              <label htmlFor="exampleFormControlInput1" className="form-label">Location*</label>
              <input type="text" className="form-control" onChange={handleChange} name="Location" value={values.Location} placeholder="" required/>
              
              <button type="submit" className="btn2 btn-success">Register</button> <br />

              <div className="account-info">
                <p>Already have an account?</p>
                <button type="button" className="btnLogin btn-success" onClick={handleDonateNowClick1}>Login here</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container" id='Contact'>
        <div className="row">
          <div className="horizontal-line"></div>
          <div className="Contact-text">
            <div className="Contact-copyright">
              <h5>Copyright &copy; Salad Mohamed | All right reserved.</h5>
            </div>
            <div className="socials">
              <div><BsGithub /></div>
              <div><BsTwitter /></div>
              <div><BsInstagram /></div>
              <div><BsFacebook /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Companydetails;
