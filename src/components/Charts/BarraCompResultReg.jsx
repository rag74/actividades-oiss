import React from "react";
import { Chart } from "react-google-charts";


function BarraCompResultReg ({stats, title}) {

console.log ("barras stacked stats")
console.log(stats)
//console.log(newGroups)

const data = crearArraysData(stats)

function crearArraysData(objeto) {
    const arrays = [["Orientación Estretégica (OE)","R1.1","R1.2","R2.1","R3.1","R4.1","R4.2","R4.3","R5.1","R5.2"]];
  
    for (let OE = 1; OE < 6; OE++) {
      arrays.push(
        [`OE.${objeto[OE].OE}`, objeto[OE]['R1.1'], objeto[OE]['R1.2'], objeto[OE]['R2.1'], objeto[OE]['R3.1'],objeto[OE]['R4.1'], objeto[OE]['R4.2'], objeto[OE]['R4.3'], objeto[OE]['R5.1'], objeto[OE]['R5.2']]
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