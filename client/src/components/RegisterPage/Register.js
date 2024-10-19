import React, { useState } from 'react';
import eyeSlash from "../../assets/images/eyeSlash.png";
import seePassword from "../../assets/images/seePassword.png";
import "../RegisterPage/Register.css"

const Register = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [iconToggle, setIconToggle] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirm_password: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const toggleIcon = () => {
    setIconToggle(!iconToggle);
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirm_password) {
      setError("Passwords do not match.");
      return;
    }
    console.log('Form Data:', data);
    try {
      const url = 'http://localhost:5000/api/users/register';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(data),
      });
      
      const responseData = await response.json();
      // console.log('API Response', responseData);

      if (responseData.success) {
        setMessage("Account successfully created.");
        setError(""); // Clear any previous error
        // console.log('User Details:', responseData.message);
        
      
      } else {
        setError("Failed to create account.");
      }
    } catch (e) {
      console.log("Error:", e);
      setError("An error occurred while creating the account.");
    }
  };

  return (
    <div>
      <div className="contact-pg">
        <h3>Registration Form</h3>
        <p>Fill in the details below to get an account with us</p>
      </div>
      <form className='createacct-form' onSubmit={handleFormSubmit}>
        <div className='name-div'>
          <div className="fname">
            <label htmlFor='fname'>First Name</label>
            <input 
              type="text" 
              placeholder="John" 
              required 
              className='input' 
              id="fname" 
              name="firstName" 
              value={data.firstName} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="lname">
            <label htmlFor='lname'>Last Name</label>
            <input 
              type="text" 
              placeholder="Doe" 
              required 
              className='input' 
              id="lname" 
              name="lastName" 
              value={data.lastName} 
              onChange={handleInputChange} 
            />
          </div>
        </div>
        <div className='contactinfo-div'>
          <div className="mail">
            <label htmlFor='phone'>Phone Number</label>
            <input 
              type="phone" 
              placeholder="+234-000-0000-000" 
              className='input' 
              required 
              id="phone" 
              name="phoneNumber" 
              value={data.phoneNumber} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="mail">
            <label htmlFor='email'>Email Address</label>
            <input 
              type="email" 
              placeholder="myemail@gmail.com" 
              className='input' 
              required 
              id="email" 
              name="email" 
              value={data.email} 
              onChange={handleInputChange} 
            />
          </div>
        </div>
        <div className='password-container'>
          <div className="password pwrd flex">
            <label htmlFor='password'>Password</label>
            <input 
              type={passwordType} 
              placeholder="**********" 
              required 
              className='input' 
              id="password" 
              name="password" 
              value={data.password} 
              onChange={handleInputChange} 
            />
            <div onClick={togglePassword}>
              {passwordType === "password" ? <img src={eyeSlash} alt="eye slash" /> : <img src={seePassword} alt="see password" />}
            </div>
          </div>
          <div className="password pwrd flex">
            <label htmlFor='confirm_password'>Confirm Password</label>
            <input 
              type={passwordType} 
              placeholder="**********" 
              required 
              className='input' 
              id="confirm_password" 
              name="confirm_password" 
              value={data.confirm_password} 
              onChange={handleInputChange} 
            />
            <div onClick={togglePassword}>
              {passwordType === "password" ? <img src={eyeSlash} alt="eye slash" /> : <img src={seePassword} alt="see password" />}
            </div>
          </div>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <button type='submit' className="login-btn">Create Account</button>
      </form>
    </div>
  );
};

export default Register;
