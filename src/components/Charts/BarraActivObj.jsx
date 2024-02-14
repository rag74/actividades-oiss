import React from "react";
import { Chart } from "react-google-charts";
import './Charts.css'

function BarraActivObj ({stats, title}) {

  console.log("estaditicas BARRA ACTIVIDADES ORIENTACIÓN")
  console.log(stats)
  
  const data = crearArraysData(stats)

  function crearArraysData(objeto) {
    const arrays = [["Orientación Estretégica (OE)","Nro. de actividades"]];
  
    for (let OE = 1; OE < 5; OE++) {
      arrays.push(
        [`OE.${objeto[OE].OE}`, objeto[OE].Total]
        );
      }

      return arrays;
    }

  const options = {
    
      title: `${title}`,
      //subtitle: "Sales, Expenses, and Profit: 2014-2017",
    
      legend: { position: "none" },   
      titleTextStyle: {
        fontSize: 15,
    },
    hAxis: {
      title: `Total de actividades`,
      format:"#"
    },
    colors: ["#58ADB2"],
      is3D:true
  };


  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
}

export default BarraActivObj
