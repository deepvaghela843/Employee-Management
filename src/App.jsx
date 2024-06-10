import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import AddEmp from "./component/AddEmp";
import UpdateEmp from "./component/UpdateEmp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addEmp" element={<AddEmp />} />
        <Route path="/updateEmp" element={<UpdateEmp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
