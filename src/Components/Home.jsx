import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserSecret } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  // first rander data JSON
  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you like to delete?");

    if (confirm) {
      try {
        await axios.delete(`http://localhost:3000/users/${id}`);
        Swal.fire("Data Successfully Deleted!");
        const updatedData = data.filter((user) => user.id !== id);
        setData(updatedData);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center mt-3">CRUD APP With JSON</h1>
        <Link to="/createUser" className="btn btn-info text-white fs-4">
          Create User <FaUserSecret />
        </Link>
        <div className="container mt-3">
          <table className="table border-dark ">
            <thead>
              <tr className="fs-4">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={i}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>{d.email}</td>
                  <td>
                    <Link
                      to={`/updateUser/${d.id}`}
                      className="btn btn-success mx-2 mt-1"
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-danger mx-2 mt-1"
                      onClick={(e) => handleDelete(d.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
