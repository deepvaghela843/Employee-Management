import React, { useState } from "react";
import { constantString } from "../constant/ConstantString";
import EmpNavbar from "./EmpNavbar/EmpNavbar";
import EmpButton from "./EmpButton/Empbutton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import lodar from "../assets/videos/spinner.gif";

const AddEmp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const handleGender = (e) => {
    if (e.target.value == "male") {
      setGender("Male");
    } else {
      setGender("Female");
    }
  };

  const formSubmittion = async (e) => {
    e.preventDefault();
    if (firstName.length == 0) {
      alert("");
      return;
    }
    if (lastName.length == 0) {
      alert("");
      return;
    }
    if (gender.length == 0) {
      alert("");
      return;
    }
    setShowLoader(true);
    await axios
      .post("https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData", {
        firstName: firstName,
        lastName: lastName,
        checkbox: gender,
      })
      .then((response) => {
        if (response) {
          setFirstName("");
          setLastName("");
          setGender("");
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
      <EmpNavbar name={constantString.ADD_EMPLOYEE} />
      <div className="m-5">
        <form
          className="border border-dark rounded p-4"
          action="#"
          onSubmit={formSubmittion}
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

          <EmpButton name={constantString.SUBMIT} />
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

export default AddEmp;
