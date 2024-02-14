import React from "react";
import { Chart } from "react-google-charts";
import './Charts.css'

function ActividadesReg({fichas}) {

const activParticipantes = fichas.map((grupo) => {
    const total = sumParticipantes(grupo);
    const OE = grupo.planEstratégico[0].charAt(0)
    return { titulo: grupo.titulo, participantes: total, orientación:`OE.${OE}` };
  });

function sumParticipantes(obj) {
    return obj.participantes[3] + obj.ponentes[3];
  }

function obsEstrategico(obj){
  
}

const nuevosGrupos = activParticipantes.sort((a, b) => b.participantes - a.participantes);

const arrayData = [[`<div class="Ttable red">Actividad</div>`,"Participantes totales","OE"]];

nuevosGrupos.forEach((grupo) => {
  arrayData.push([`<div class="Ttable">${grupo.titulo}</div>`, grupo.participantes, grupo.orientación]);
});




console.log("genero?")
console.log(arrayData)
    


const options = {
  allowHtml: true,
  showRowNumber: true,
};

const formatters = [
  {
    type: "BarFormat",
    column: 1,
    options: {
      width: 220,
    },
  },
];

  return (
    <Chart
    chartType="Table"
    width="100%"
    height="900px"
    data={arrayData}
    options={options}
    formatters={formatters}chartPackages={["corechart", "controls"]}
    render={({ renderControl, renderChart }) => {
      return (
        <div>
        <div style={{ display: "block" }}>
          <div style={{ width: "60%" }}>{renderControl(() => true)}</div>
        </div>
        <div>
          <div style={{ width: "100%", height: "100%" }}>{renderChart()}</div>
        </div>
        </div>
      );
    }}
    controls={[
      {
          controlType: "StringFilter",
          controlID: "str-filter",
          options: {
            filterColumnIndex: 0,
            matchType: "any", // 'prefix' | 'exact',
            ui: {
              label: "Search by name",
            },
          },
        },
      {
        controlType: "NumberRangeFilter",
        controlID: "age-filter",
        options: {
          filterColumnIndex: 1,
          ui: {
            labelStacking: "vertical",
            label: "Años",
            allowTyping: false,
            allowMultiple: false,
            format: "#",
          },
        },
      },

      {
        controlType: 'CategoryFilter',
        containerId: 'category_div',
        options: {
          filterColumnIndex: 2
        }
      },

    ]}
  />
    
  );
}

export default ActividadesReg


/*
<Chart
      width={800}
      height={1000}
      chartType="BarChart"
      loader={<div>Loading Chart</div>}
      options={options}
      data={arrayData}
      rootProps={{ "data-testid": "6" }}
      chartPackages={["corechart", "controls"]}
      render={({ renderControl, renderChart }) => {
        return (
          <div style={{ display: "block" }}>
            <div style={{ width: "40%" }}>{renderControl(() => true)}</div>
            <div style={{ width: "100%", height: "100%" }}>{renderChart()}</div>
          </div>
        );
      }}
      controls={[
        {
            controlType: "StringFilter",
            controlID: "str-filter",
            options: {
              filterColumnIndex: 0,
              matchType: "any", // 'prefix' | 'exact',
              ui: {
                label: "Search by name",
              },
            },
          },
        {
          controlType: "NumberRangeFilter",
          controlID: "age-filter",
          options: {
            filterColumnIndex: 1,
            ui: {
              labelStacking: "vertical",
              label: "Años",
              allowTyping: false,
              allowMultiple: false,
              format: "#",
            },
          },
        },

      ]}
    />*/