import React, { useState, useEffect } from "react";
import "../../Style/Admin.css";
import axios from "axios";
import UpdateModal from "./UpdateModal";
const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const wurl = "http://localhost:8080";

  useEffect(() => {
    axios
      .get(wurl + "/user/customers")
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error("Error fetching customer data:", error));
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      const response = await axios.delete(wurl + `/user/deleteUserById/${id}`);

      if (response.data.success) {
        setCustomers((prevCustomers) =>
          prevCustomers.filter((customer) => customer._id !== id)
        );
        console.log("User deleted successfully");
      } else {
        console.error("Error deleting user:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdateUser = async (updatedValues) => {
    try {
      const response = await axios.put(
        wurl + `/user/updateUserById/${selectedUser._id}`,
        updatedValues
      );

      if (response.data.success) {
        // Update the user in the state
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer._id === selectedUser._id ? response.data.user : customer
          )
        );

        // Highlight the updated row for 5 seconds
        // You may need to implement this using additional state or CSS classes
        // Example: setUpdatedRowId(selectedUser._id);

        console.log("User updated successfully");
        handleCloseModal(); // Close the modal after updating
      } else {
        console.error("Error updating user:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setShowUpdateModal(true);
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setSelectedUser(null);
  };
  return (
    <div className="tableContainer">
      <p className="divTitle"> All Customers Account Details </p>
      <table className="usersTable">
        <thead>
          <tr>
            <td className="table-data-title">Id</td>
            <td className="table-data-title">First Name</td>
            <td className="table-data-title">Last Name</td>
            <td className="table-data-title">Email</td>
            <td className="table-data-title">Phone Number</td>
            <td className="table-data-title">Vendor</td>
            <td className="table-data-title">Update</td>
            <td className="table-data-title">Delete</td>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id} className="table-data-row">
              <td className="table-data-data">{customer._id}</td>
              <td className="table-data-data">{customer.firstName}</td>
              <td className="table-data-data">{customer.lastName}</td>
              <td className="table-data-data">{customer.email}</td>
              <td className="table-data-data">{customer.phoneNumber}</td>
              <td className="table-data-data">
                {customer.is_vendor ? "Yes" : "No"}
              </td>
              <td className="table-data-data">
                <button
                  className="updateDataBtn"
                  onClick={() => handleOpenModal(customer)}
                >
                  Update Information
                </button>
              </td>

              <td className="table-data-data">
                <button
                  className="updateDataBtn deleteBtn"
                  onClick={() => handleDeleteUser(customer._id)}
                >
                  Delete User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showUpdateModal && (
        <UpdateModal
          user={selectedUser}
          onUpdate={handleUpdateUser}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
export default AdminCustomers;
