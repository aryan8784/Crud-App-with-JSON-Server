import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";



const UpdateUser = () => {
  const { id } = useParams();

  const [inputData, setInputData] = useState({
    id: id,
    name: "",
    email: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/users/" + id)
      .then((res) => setInputData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("http://localhost:3000/users/" + id, inputData).then((res) => {
      Swal.fire({
        title: "Good job!",
        text: "User Updated Successfully!",
        icon: "success",
      });
      navigate("/");
    });
  };

  return (
    <>
      <div>
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center ">
          <div className="w-50 border bg-info text-white p-5 rounded ">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="id" className="mb-1">
                  ID:
                </label>
                <input
                  disabled
                  value={inputData.id}
                  type="number"
                  name="id"
                  className="form-control"
                />
              </div>
              <div>
                <label htmlFor="name" className="mb-1">
                  Name:
                </label>
                <input
                  value={inputData.name}
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
                  value={inputData.email}
                  type="email"
                  name="email"
                  className="form-control"
                  onChange={(e) =>
                    setInputData({ ...inputData, email: e.target.value })
                  }
                />
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button className="btn btn-dark mt-4 px-3">Update User</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
