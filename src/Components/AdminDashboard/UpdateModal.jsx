import React, { useState } from 'react';
import "../../Style/Admin.css"; 

const UpdateModal = ({ user, onUpdate, onClose }) => {
    const [updatedValues, setUpdatedValues] = useState({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
    });
  
    const handleUpdate = () => {
      // Perform any validation or additional logic before updating
      onUpdate(updatedValues);
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUpdatedValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    };
  
    return (
      <div className='updateModalBackground'>
        <div className='updateModal'>
          {user && (
            <>
              <p className="updateText">First Name:</p>
              <input
                type="text"
                className="userUpdateInput"
                name="firstName"
                value={updatedValues.firstName}
                onChange={handleInputChange}
              />
              <p className="updateText">Last Name: </p>
              <input
                type="text"
                className="userUpdateInput"
                name="lastName"
                value={updatedValues.lastName}
                onChange={handleInputChange}
              />
              <p className="updateText">Email: </p>
              <input
                type="text"
                className="userUpdateInput"
                name="email"
                value={updatedValues.email}
                onChange={handleInputChange}
              />
              <p className="updateText">Phone Number:</p>
              <input
                type="text"
                className="userUpdateInput"
                name="phoneNumber"
                value={updatedValues.phoneNumber}
                onChange={handleInputChange}
              />
              <button className="updateDataBtn" onClick={handleUpdate}>
                Update
              </button>
              <button className="updateDataBtn" onClick={onClose}>
                Close
              </button>
            </>
          )}
        </div>
      </div>
    );
  };
  
  export default UpdateModal;