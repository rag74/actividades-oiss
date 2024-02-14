import React, { useEffect, useState } from 'react'
import { Chart } from "react-google-charts";
import './Charts.css'

function TortaFormReg ({stats, title}) {

    delete stats.total;
    delete stats.Total;
    const total = Object.values(stats).reduce((acc, value) => acc + value, 0);

    const objetoOrdenado = ordenarObjeto(stats)
   
    const data = crearArraysData(objetoOrdenado)


    const colors = ["adb2eb","a5e381","ffe587","c6e3e6","58adb2","7465A2"]

     const options = {
        title: `${title}`,
        titleTextStyle: {
            fontSize: 15,
        },
        pieHole: 0.4,
        is3D: false,
        legend: {
            position: "left"
          },
        legendTextStyle: {
            fontSize: 13,
        },
        chartArea:{
            left:5,
            right: 5,
            top: 60,
            bottom: 10},
        colors: colors,
        selectionMode: "multiple",
        tooltip: {
            trigger: "focus",
            isHtml: true,
          },
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
        const arrays = [["Formato","Cantidad",{type: 'string',label: 'Tooltip Chart',role: 'tooltip','p': {'html': true}}]];
      
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
          arrays.push([`Otros (${objeto.Otros})`, objeto.Otros,`<div class="toolTipPie"><p>Otros</p><p><strong>${objeto.Otros} (${porcentaje}}%)</strong></p></div>`]);
        }
      
        return arrays;
      }

      
      
  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  )
}

export default TortaFormReg 
