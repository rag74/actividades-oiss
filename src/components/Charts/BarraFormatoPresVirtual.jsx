import React from "react";
import { Chart } from "react-google-charts";
import './Charts.css'


function BarraFormatoPresVirtual({stats, title}) {



console.log ("barras formato pres/virtual stats")
console.log(stats)
//console.log(newGroups)

const objetoOrdenado = ordenarObjeto(stats);

const data2 = crearArraysData(objetoOrdenado)

const data = [
  ["Tipo", "Presencial", "Híbrida (retransmisión en directo)","Mixto (presencial + virtual)","Virtual sincrónica","Virtual asincrónica"],
  ["Presencial", stats["Presencial"], null,null,null,null],
  ["Virtual (completa o de apoyo)", null, stats["Híbrida (retransmisión en directo)"],stats["Mixto (presencial + virtual)"],stats["Virtual sincrónica"],stats["Virtual asincrónica"]],
];


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
    legend: { position: "right" },  
    chartArea: { 
        width: "60%",
        
        
    },
    isStacked: true,
    hAxis: {
      title: "Asistentes totales",
      minValue: 0,
    },
    vAxis: {
  
    },
    colors: colors,
    selectionMode: "multiple",

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

export default BarraFormatoPresVirtual
