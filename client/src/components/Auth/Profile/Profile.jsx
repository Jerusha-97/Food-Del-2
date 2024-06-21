import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
  });

  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState('');

  useEffect(() => {
    // Fetch user profile data when the component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      const response = await axios.get('http://localhost:4000/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:4000/api/user/profile', userData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const handleAddAddress = () => {
    if (addresses.length < 3 && newAddress.trim() !== '') {
      setAddresses([...addresses, newAddress]);
      setNewAddress('');
    }
  };

  const handleRemoveAddress = (index) => {
    const newAddresses = [...addresses];
    newAddresses.splice(index, 1);
    setAddresses(newAddresses);
  };

  return (
    <div className="profile-container">
      <form onSubmit={onSubmitHandler} className="profile-form">
        <h2>User Profile</h2>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={userData.firstName}
            type="text"
            placeholder="First Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={userData.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            required
            name="email"
            onChange={onChangeHandler}
            value={userData.email}
            type="email"
            placeholder="Email"
            disabled // Disable email input
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            name="address"
            onChange={onChangeHandler}
            value={userData.address}
            type="text"
            placeholder="Address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            name="phone"
            onChange={onChangeHandler}
            value={userData.phone}
            type="text"
            placeholder="Phone"
          />
        </div>
        <button type="submit" className="update-button">Update Profile</button>
      </form>
      <div className="address-section">
          <h2>Address Book</h2>
          <div className="add-address-form">
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Enter new address"
            />
            <button onClick={handleAddAddress} className="add-address-button">Add Address</button>
          </div>
          <div className="address-list">
            {addresses.map((address, index) => (
              <div key={index} className="address-card">
                <div className="address-content">
                  <input type="radio" value={address}/>{address}
                  <button onClick={() => handleRemoveAddress(index)} className="remove-button">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

  );
};

export default Profile;
