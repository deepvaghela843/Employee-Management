import React, { useEffect, useState } from "react";
import { constantString } from "../constant/ConstantString";
import EmpNavbar from "./EmpNavbar/EmpNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmpButton from "./EmpButton/Empbutton";
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import lodar from "../assets/videos/spinner.gif";
import "./Home.css";
import { deleteEmployee, getEmployee } from "../api/apifunction/ApiFunction";

const Home = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");

  const getUser = async () => {
    setShowLoader(true);
    getEmployee()
      .then((response) => {
        if (response) {
          setEmployee(response.data);
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
    getUser();
  }, []);

  const deleteItem = async (id) => {
    setShowModal(false);
    setShowLoader(true);
    deleteEmployee(id)
      .then((response) => {
        if (response) {
          getUser();
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
      <EmpNavbar name={constantString.EMPLOYEE_MANAGEMENT_APP} />
      <div className="m-5">
        <table className="table table-striped broder">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col">
                <div>
                  <EmpButton
                    name={constantString.ADD_EMPLOYEE}
                    onClick={() => navigate("/addEmp")}
                  />
                </div>
              </th>
            </tr>
            <tr>
              <th scope="col">{constantString.NO}</th>
              <th scope="col">{constantString.FIRST_NAME}</th>
              <th scope="col">{constantString.LAST_NAME}</th>
              <th scope="col">{constantString.GENDER}</th>
              <th scope="col">{constantString.ACTIONS}</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{item?.id}</th>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.checkbox}</td>
                  <td>
                    <tr>
                      <td>
                        <GrEdit
                          size={18}
                          onClick={() =>
                            navigate("/updateEmp", {
                              state: {
                                userId: item.id,
                              },
                            })
                          }
                          color="blue"
                          cursor="pointer"
                        />
                      </td>
                      <td>
                        <MdDeleteForever
                          onClick={() => {
                            setMessage(`${item.firstName} ${item.lastName}`);
                            setUserId(item.id);
                            setShowModal(true);
                          }}
                          size={23}
                          color="red"
                          className="mx-2"
                          cursor="pointer"
                        />
                      </td>
                    </tr>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="modals ">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{message}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure to delete...?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => deleteItem(userId)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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

export default Home;
