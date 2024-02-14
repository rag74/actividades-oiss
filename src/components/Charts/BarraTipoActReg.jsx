import React from "react";
import { Chart } from "react-google-charts";

function BarraTipoActReg({stats}) {

  console.log("estaditicas BARRA TIPO REG")
  console.log(stats.Asesoramiento.Total)
  console.log(stats)

  const data = [
    ["Tipo","Nro. de actividades"],
    ["Asesoramiento", stats.Asesoramiento.Total],
    ["Evento", stats.Evento.Total],
    ["Comunicación", stats.Comunicación.Total],
    ["Formación", stats.Formación.Total],
    ["Producto", stats.Producto.Total],
  ]

  const actTotal = stats.length

  const options = {
      title: `Actividades separadas por tipo`,
      legend: { position: "none" },   
      titleTextStyle: {
        fontSize: 15,
    },
    hAxis: {
      title: `Total de actividades ${actTotal}`,
      format: "#"
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

export default BarraTipoActReg
