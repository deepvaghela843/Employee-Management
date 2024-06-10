import React, { useEffect, useState } from "react";
import { constantString } from "../constant/ConstantString";
import EmpNavbar from "./EmpNavbar/EmpNavbar";
import EmpButton from "./EmpButton/Empbutton";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import lodar from "../assets/videos/spinner.gif";

const UpdateEmp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const handleGender = (e) => {
    if (e.target.value == "male") {
      setGender("Male");
    } else {
      setGender("Female");
    }
  };

  const getSingleUser = async () => {
    setShowLoader(true);
    await axios
      .get(
        `https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/${location.state.userId}`
      )
      .then((response) => {
        if (response) {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setGender(response.data.checkbox);
        }
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  const UpdateItem = async (e) => {
    setShowLoader(true);
    e.preventDefault();
    await axios
      .put(
        `https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/${location.state.userId}`,
        {
          firstName: firstName,
          lastName: lastName,
          checkbox: gender,
        }
      )
      .then((response) => {
        if (response) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setShowLoader(false);
      });
  };
  return (
    <div>
      <EmpNavbar name={constantString.UPDATE_EMPLOYEE} />
      <div className="m-5">
        <form
          className="border border-dark rounded p-4"
          action="#"
          onSubmit={UpdateItem}
        >
          <p className="h5 text-primary">
            {constantString.EMPLOYEE_INFORMATION}
          </p>
          <div className="form-group">
            <label>{constantString.FIRST_NAME}</label>
            <input
              type="text"
              className="form-control mt-1 mb-2"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={constantString.FIRST_NAME}
            />
          </div>
          <div className="form-group">
            <label>{constantString.LAST_NAME}</label>
            <input
              type="text"
              className="form-control mt-1 mb-2"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={constantString.LAST_NAME}
            />
          </div>
          <div>
            <label>{constantString.GENDER}</label>
            <br />
            <div className="mt-1">
              <input
                name="gender"
                type="radio"
                value="male"
                id="male"
                onChange={handleGender}
              />
              <label htmlFor="male" className="mx-1">
                {constantString.MALE}
              </label>
            </div>
            <div className="mb-3">
              <input
                name="gender"
                type="radio"
                value="female"
                id="female"
                onChange={handleGender}
              />
              <label htmlFor="female" className="mx-1">
                {constantString.FEMALE}
              </label>
            </div>
          </div>

          <EmpButton name={constantString.SAVE} />
        </form>
      </div>
      {showLoader && (
        <img
          src={lodar}
          alt=""
          width={80}
          style={{ position: "absolute", top: "45%", left: "45%" }}
        />
      )}
    </div>
  );
};

export default UpdateEmp;
