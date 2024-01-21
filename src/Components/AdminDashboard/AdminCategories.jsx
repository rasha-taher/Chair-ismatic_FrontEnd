import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/category/getAllCategories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const addCategory = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/category/addCategory",
        { category: newCategory }
      );
      console.log("Category added:", response.data);
      fetchCategories();
      setNewCategory(""); // Reset input field after adding category
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/category/deleteCategoriesById/${id}`
      );
      console.log("Category deleted");
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>
      <p className="divTitle"> Categories On The Website </p>

      <input
        type="text"
        className="addUserInput"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <button className="signUpBtn" onClick={addCategory}>
        Add Category
      </button>
      <table className="usersTable">
        <thead>
          <tr>
            <td className="table-data-title">Id</td>
            <td className="table-data-title">Category Name</td>
            <td className="table-data-title"></td>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id} className="table-data-row">
              <td className="table-data-data">{category._id}</td>
              <td className="table-data-data">{category.category}</td>

              <td className="table-data-data">
                <button
                  className="updateDataBtn deleteBtn"
                  onClick={() => deleteCategory(category._id)}
                >
                  Delete Category
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategories;
