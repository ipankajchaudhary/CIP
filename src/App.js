import React, { Fragment, useState } from "react";
import InputScreen from "./Components/InputScreen";
import TableComponent from "./Components/TableComponent";
import "./App.css";
// import Titlebar from 'Components/titlebar/Titlebar';

// import logo from 'logo.svg';
// import styles from 'components/App.module.scss';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingSpinner from "./Components/Spinner";
// import EnhancedTable from "./demo";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [formData, setFormdata] = useState({});
  const handleFormSubmit = (formData) => {
    console.log(formData)
    setLoading(true);
    setFormdata(formData);
    fetch("http://192.168.1.13:3001/data", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.parse(data));
        setResponse(JSON.parse(data));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error);
      });
  };

  return (


    <Fragment>
      {/* <Titlebar /> */}
      <div>
        {loading ? (
          <LoadingSpinner />
        ) : response ? (
          <TableComponent response={response} formData={formData} />
        ) : (
          <InputScreen handleFormSubmit={handleFormSubmit} />
        )}
      </div>
    </Fragment>
  );
};

export default App;
