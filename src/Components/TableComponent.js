import React, { useEffect, useState } from "react";
import EnhancedTable from "./demo";
import MeasureDropdown from "./MeasureDropdown";
import VisualDropdown from "./VisualDropdown";
import DimensionDropdown from "./DimensionDropdown";

const TableComponent = ({ response, formData }) => {
  const [measureList, setMeasureList] = useState(
    [...new Set(response.result.map((entry) => entry.Measure))]
  );
  const [dimensionList, setDimensionList] = useState(
    [...new Set(response.result.map((entry) => entry.DimensionName))]
  );
  const [visualList, setVisualList] = useState(
    [...new Set(response.result.map((entry) => entry.VisualName))]
    );

  const [filteredData, setFilteredData] = useState([]);
  const [MeasureName, setMeasureName] = useState("");

  const handleMeasureSelect = (e) => {
    setMeasureName(e);
    setFilteredData(filteredData.filter((row) => row.Measure === e));
  };

  const [visualName, setVisualName] = useState("");
  const handleVisualSelect = (e) => {
    const filtered = filteredData.filter((item) => visualName.includes(item.data));
    setFilteredData(filtered);
  };

  const [DimensionName, setDimensionName] = useState("");
  const handleDimensionSelect = (e) => {
    setDimensionName(e);
    setFilteredData(filteredData.filter((row) => row.DimensionName === e));
  };


  function makeAPICall(url, requestBody) {

    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => (response.json())).then((data) => {
        setFilteredData(JSON.parse(data).result)
      })
      .catch(error => {
        console.error('API Error:', error);
        throw error;
      });
  }

  // Function to make multiple API calls concurrently in batches
  const apiUrl = 'http://192.168.2.251:3001/firequery';

  const requestbody =  {
    result : response.result,
    connection_string: response.connection_string,
    threshold_time : formData.thresholdValue
  }
   

  useEffect(() => {
    makeAPICall(apiUrl,requestbody)
  }, [])



  const [tableData, setTableData] = useState(filteredData);
  const [filter, setFilter] = useState({ value: '', active: false });

  // Event handler for filter change
  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    const isFilterActive = filterValue !== '';

    console.log(filterValue)

    setFilter({ value: filterValue, active: isFilterActive });

    if (isFilterActive) {
      const filteredDat = filteredData.filter((row) =>
        row.VisualName.toLowerCase().includes(filterValue.toLowerCase())
      );
      setTableData(filteredDat);
    } else {
      setTableData(filteredData);
    }
  };


  
  return (
    <div class="  mt-5">
      <div class="dropdowns">
        <div class="dropdown px-5 ">
           <select value={filter.value} onChange={handleFilterChange}>
            {
              visualList.map((ele) =>{
                return(
                  <option value ={ele}>
                    {ele}
                  </option>
                )
              })
            }
          </select>
        </div>
        <div class="dropdown px-5">
            <MeasureDropdown
              names={measureList}
              handleMeasureSelect={handleMeasureSelect}
            />
        </div>
        <div class="dropdown px-5">
          <DimensionDropdown
            names={dimensionList}
            handleDimensionSelect={handleDimensionSelect}
          />
        </div>
      </div>
      <div class="cards">
        <div class="carD px-5">
          <div class="card total_measures">
            <div class="card-body">
              <h3 class="card-title mb-auto">{response.result.length}</h3>
              <h4 class="card-text">
                {" "}
                <b>Total Measure Combination</b>{" "}
              </h4>
            </div>
          </div>
        </div>

        <div class="carD px-5">
          <div class="card combinations_below_threshold">
            <div class="card-body">
              <h3 class="card-title mb-auto">
                {
                  response.result
                    .map((entry) => entry.LoadTime)
                    .filter((e) => e < formData.thresholdValue).length
                }
              </h3>
              <h4 class="card-text">
                {" "}
                <b>Combinations below threshold</b>{" "}
              </h4>
            </div>
          </div>
        </div>
        <div class="carD px-5">
          <div class="card combinations_above_threshold">
            <div class="card-body">
              <h3 class="card-title mb-auto">
                {
                  response.result
                    .map((entry) => entry.LoadTime)
                    .filter((e) => e > formData.thresholdValue).length
                }
              </h3>
              <h4 class="card-text">
                {" "}
                <b>Combinations above threshold</b>{" "}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div class="table" style={{overflowY : "auto", height : "1000px"}}>
        <EnhancedTable rows={filteredData} thresholdValue={formData.thresholdValue} connection_string = {response.connection_string}   />
      </div>
    </div>
  );
};

export default TableComponent;
