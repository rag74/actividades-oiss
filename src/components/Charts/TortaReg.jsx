import React from 'react'
import { useEffect, useState } from "react";
import './Charts.css'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Chart } from "react-google-charts";

function TortaReg({stats,title}) {

 console.log("estaditicas en charts")
 console.log(stats)
 delete stats.Total;
 delete stats.total;
 const total = Object.values(stats).reduce((acc, value) => acc + value, 0);

 /*
 const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);*/


 const objetoOrdenado = ordenarObjeto(stats);

 const data = crearArraysData(objetoOrdenado)


 const colors = ["adb2eb","a5e381","ffe587","c6e3e6","58adb2","7465A2"]

 const options = {
    title: `${title}`,
    titleTextStyle: {
      fontSize: 15,
  },
    pieHole: 0.4,
    is3D: false,
    width: "100%",
    height: "100%",
    chartArea:{
     
        left:5,
        right: 5,
        top: 60,
        bottom: 10},
    legend: {
      position: "left"
    },
    legendTextStyle: {
      fontSize: 13,
     },
    tooltip: {
            trigger: "focus",
            isHtml: true
          },
    colors: colors,
    selectionMode: "multiple"
  };

  function ordenarObjeto(objeto) {
    const keys = Object.keys(objeto);
    const sortedKeys = keys.sort();
    const sortedObject = {};
  
    for (const key of sortedKeys) {
      sortedObject[key] = objeto[key];
    }
  
    return sortedObject;
  }

  function crearArraysData(objeto) {
    const arrays = [["Género","Cantidad",{type: 'string',label: 'Tooltip Chart',role: 'tooltip','p': {'html': true}}]];
  
    for (const propiedad in objeto) {
      if (propiedad === "Otros"|| propiedad === "Total") {
        continue; // Ignorar la propiedad "Otros" o "Total" por ahora
      }

      var porcentaje =  (objeto[propiedad]*100/total).toFixed(1)//Math.round((objeto[propiedad] / total) * 1000) / 10

      
      arrays.push(
        [`${propiedad} (${objeto[propiedad]})`, objeto[propiedad],`<div class="toolTipPie"><p>${propiedad}</p><p><strong>${objeto[propiedad]} (${porcentaje}%)</strong></p></div>`]
        );
    }
  
    // Agregar la propiedad "Otros" al final
    if (objeto.hasOwnProperty("Otros")) {
      arrays.push([`Otros (${objeto.Otros})`, objeto.Otros,`<div class="toolTipPie"><p>Otros</p><p><strong>${objeto.Otros} (${porcentaje}%)</strong></p></div>`]);
    }
  
    return arrays;
  }


 

  return (
    <>
        <div className='torta1' style={{ width: "390px", height: "300px"}} /*style={{ width: width/4.5, height: width/3.5}}*/> 
            <Chart
            chartType="PieChart"
            data={data}
            options={options}
            />
        </div>
    </>
  )
}

export default TortaReg