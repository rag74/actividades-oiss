import React from "react";
import { Chart } from "react-google-charts";


function BarraCompResultReg ({stats, title}) {

console.log ("barras stacked stats")
console.log(stats)
//console.log(newGroups)

const data = crearArraysData(stats)

function crearArraysData(objeto) {
    const arrays = [["Orientación Estretégica (OE)","R.1","R.2","R.3"]];
  
    for (let OE = 1; OE < 5; OE++) {
      arrays.push(
        [`OE.${objeto[OE].OE}`, objeto[OE].R1, objeto[OE].R2, objeto[OE].R3 ]
        );
      }

      return arrays;
    }

  const colors = ["adb2eb","a5e381","ffe587","c6e3e6","58adb2","7465A2"]
  
  const options = {
    title: `${title}`,
    titleTextStyle: {
        fontSize: 15,
        fontFamily: "Arial"
    },
    chartArea: { width: "70%" },
    isStacked: true,
    hAxis: {
      title: "Actividades (OE/R)",
      minValue: 0,
      format: "#"
    },
    colors: colors,
    selectionMode: "multiple",
    vAxis:{
     format: "#",
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


export default BarraCompResultReg