import React from "react";
import { Chart } from "react-google-charts";


function CompBarraOE ({stats, title, cuadroTipo, state}) {

console.log ("barras stacked stats")
console.log(stats)
//console.log(newGroups)

const data = stats

  const colors = ["adb2eb","a5e381","ffe587","c6e3e6","58adb2","7465A2"]
  
  const options = {
    title: `${title}`,
    titleTextStyle: {
        fontSize: 15,
        fontFamily: "Arial"
    },
    chartArea: { 
      width: "80%", 
      left:120,
      right: 160,
      top: 60,
      bottom: 40
   },
    isStacked: state,
    hAxis: {
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
      chartType={cuadroTipo}
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
}


export default CompBarraOE