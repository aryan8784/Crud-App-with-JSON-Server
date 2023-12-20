import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateUser = () => {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/users", inputData).then((res) => {
      Swal.fire({
        title: "Good job!",
        text: "User Added Successfully!",
        icon: "success",
      });
      navigate("/");
    });
  };

  return (
    <>
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center ">
        <div className="w-50 border bg-info text-white p-5 rounded ">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="mb-1">
                Name:
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={(e) =>
                  setInputData({ ...inputData, name: e.target.value })
                }
              />
            </div>
            <div className="mt-3">
              <label htmlFor="email" className="mb-1">
                Email:
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={(e) =>
                  setInputData({ ...inputData, email: e.target.value })
                }
              />
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <button className="btn btn-dark mt-4 px-3">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
