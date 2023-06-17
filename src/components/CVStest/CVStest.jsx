import React from 'react'
import { useState } from "react";
import Papa from "papaparse";

function CVStest() {

    const [parsedData, setParsedData] = useState([]);
    console.log(parsedData)


    const changeHandler = (event) => {
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        Papa.parse(event.target.files[0], {
          header: true,
          skipEmptyLines: true,
          complete: function (results) {
            const rowsArray = [];
            const valuesArray = [];
    
            // Iterating data to get column name and their values
            results.data.map((d) => {
              rowsArray.push(Object.keys(d));
              valuesArray.push(Object.values(d));
            });
    
            // Parsed Data Response in array format
            setParsedData(results.data);

            
            // Filtered Values
            console.log(valuesArray);
    
            // Filtered Column Names
            console.log(rowsArray[0]);
    
          },
        });
      };;


   
      return (
        <>
        
        <div>
        <h1 style={{ display: "block", margin: "10px auto" }}>CSV Test</h1>
          {/* File Uploader */}
          <input
            type="file"
            name="file"
            accept=".csv"
            onChange={changeHandler}
            style={{ display: "block", margin: "10px auto" }}
          />
        </div>
        </>
      );
    }
 

export default CVStest
