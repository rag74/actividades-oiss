import React from 'react'
import { useState } from "react";
import Papa from "papaparse";
import {useUserAuth} from '../../context/UserAuthContext';

function CVStest2() {

    const {codigosPresupuesto} = useUserAuth()
    const [parsedData, setParsedData] = useState();
    console.log(parsedData)

    const revisarFile = (valuesArray)=> {
      console.log(valuesArray[0][0])
      console.log(valuesArray[1][0])
      console.log(valuesArray[2][0])

      if (valuesArray[0][0] !== "1.1." || valuesArray[1][0] !== "1.1.1." || valuesArray[2][0] !== "1.1.1.1." ){
        console.log("falso")
        alert("formato de archivo incorrecto. Subir otro por favor")
        return false
      }
      
      return true

    }

    const changeHandler = (event) => {
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        Papa.parse(event.target.files[0], {
          header: false,
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

            const revision = revisarFile(valuesArray)
            console.log(revision)

            if (revision) {
                var arr = []

                results.data.forEach(element => {
                  if (element[0].length > 8){
                    arr.push(element)
                  }
                });

                var objects = arr.map((element)=>(
                    {
                    cod: element[0],
                    desc: element[1],
                    asign: ""
                      }
                  ));

              setParsedData(objects);
              listadoPresup()
            }

          },
        });
      };;

      

const listadoPresup = codigosPresupuesto.map((cod) => {

              const codigosElegidos = parsedData?.filter((object)=> object.cod.slice(0,8) === cod.cod )
            
              return(
                <div>
                  <h4 className=' mt-10 mb-5'>{cod.cod} - {cod.desc}</h4>

                  {codigosElegidos?.map((codE) => (
                      <div key={codE.desc}>
                        <p className='titulo'>{codE.cod} - {codE.desc}</p>
                      </div>
                    ))}
                </div>
              )

              })



   
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
        <div>
            { parsedData && listadoPresup}
        </div>
        </>
      );
    }
 

export default CVStest2