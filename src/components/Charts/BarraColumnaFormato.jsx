import React from "react";
import { Chart } from "react-google-charts";
import './Charts.css'


function BarraColumnaFormato({stats, title}) {


console.log ("barras colunma formato stats")
console.log(stats)

const objetoOrdenado = ordenarObjeto(stats);

const data = crearArraysData(objetoOrdenado)

function crearArraysData(objeto) {
    const arrays = [["Formato","Cantidad"]];

    for (const propiedad in objeto) {
        arrays.push(
          [`${propiedad}`, objeto[propiedad]]
          );
      }
      return arrays;
    }

function ordenarObjeto(objeto) {
        const keys = Object.keys(objeto);
        const sortedKeys = keys.sort();
        const sortedObject = {};
      
        for (const key of sortedKeys) {
          sortedObject[key] = objeto[key];
        }
      
        return sortedObject;
      }

  const colors = ["adb2eb","a5e381","ffe587","c6e3e6","58adb2","7465A2"]
  
  const options = {
    title: `${title}`,
    titleTextStyle: {
        fontSize: 15,
        fontFamily: "Arial"
    },
    legend: { position: "none" },  
    chartArea: { width: "90%" },
    isStacked: false,
    hAxis: {
      title: "",
      minValue: 0,
      format: "#"
    },
    colors: colors,
    selectionMode: "multiple",
    vAxis:{
     format: "#",
     title: "Asistentes",
    },
    
    
  };


  return (
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
}

export default BarraColumnaFormato
