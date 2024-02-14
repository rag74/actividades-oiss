export function generarStats(fichas) {
    ////TOTAL DE ACTIVIDADES////
    const totalActividades = fichas.length;

    console.log(totalActividades)


     //////TOTAL PARTICIPANTES TODAS LAS ACTIVIDADES SEGUN CLASE
     function countAsistentes(fichas,clase){
        console.log(clase)

        let total = 0;
        let mujeres = 0;
        let hombres = 0;
        let otros = 0;

        for (const ficha of fichas) {
          total += ficha[clase][3];
          mujeres += ficha[clase][0];
          hombres += ficha[clase][1];
          otros += ficha[clase][2];
        }
      
        let numeros = {mujeres,hombres,otros,total}
        console.log("NUMEROS")
        console.log(numeros)
        return (numeros);
      };
      
      const totalAsistentes = countAsistentes(fichas,"participantes");
      const totalPonentes = countAsistentes(fichas,"ponentes");
      
      console.log("Total asistentes: "+totalAsistentes); 

      ///////TRES ACTIVIDADES CON + ASISTENCIA
      function countTresActividades(fichas) {
        const actividades = fichas.map((ficha) => ({
          nombre: ficha.titulo,
          participantes: ficha.participantes[3],
        }));
      
        const sortedActividades = actividades.sort((a, b) => b.participantes - a.participantes);
      
        const tresActividades = sortedActividades.slice(0, 3);
      
        return tresActividades;
      };
      
      const tresActividadesConMasAsistentes = countTresActividades(fichas);
      
      console.log("Tres actividades con mas asistentes:");
      console.log(tresActividadesConMasAsistentes);


  ///////////////TOTAL PARTICPANTES SUMADOS TRES ACTIVIDADES
  const tresActividades = tresActividadesConMasAsistentes;

  const totalParticipantes = tresActividades.reduce((total, actividad) => {
  return total + actividad.participantes;
  }, 0);

  console.log("Partcipantes de las tres actividades: "+totalParticipantes);


  ////// PORCENTAJES - DOS TIPOS (exacto, con solo 2 decimales)/////
  const porcentajes = tresActividadesConMasAsistentes.map((grupo) => {
    const porcentaje = (grupo.participantes / totalParticipantes) * 100;
    return porcentaje.toFixed(1);
  });
  console.log(porcentajes);

  const porcentajes2 = tresActividades.map((actividad) => {
    return (actividad.participantes / totalParticipantes) * 100;
  });

  console.log(porcentajes2);


  ////OBJETIVOS y RESULTADOS 

  const resultadosPorObjetivo = fichas.reduce((objetivos, ficha) => {
    const objetivo = ficha.CodPlanEstratégico.slice(0, 1);
   
    const objetivosVacío= {
      1:{OE:1,R1: 0,R2: 0,R3: 0,R4: 0,Total: 0},
      2:{OE:2,R1: 0,R2: 0,R3: 0,R4: 0,Total: 0},
      3:{OE:3,R1: 0,R2: 0,R3: 0,R4: 0,Total: 0},
      4:{OE:4,R1: 0,R2: 0,R3: 0,R4: 0,Total: 0}
    };
  
   if (!objetivos[objetivo]) {
      objetivos[objetivo] = {OE: objetivo,R1: 0,R2: 0,R3: 0,R4: 0,Total: 0,};
    }
  

    switch (ficha.CodPlanEstratégico.slice(4, 5)) {
      case "1":
        objetivos[objetivo].R1++;
        objetivos[objetivo].Total++;
        break;
      case "2":
        objetivos[objetivo].R2++;
        objetivos[objetivo].Total++;
        break;
      case "3":
        objetivos[objetivo].R3++;
        objetivos[objetivo].Total++;
        break;
      case "4":
        objetivos[objetivo].R4++;
        objetivos[objetivo].Total++;
        break;
    }

    const objCompleto = Object.assign({}, objetivosVacío, objetivos);

    return objCompleto;
    
  }, {});

  console.log("resultadosPorObjetivo");
  console.log(resultadosPorObjetivo);




///// TIPO y SUBS ///////

const tipoysubtipos = agruparPorTipo(fichas)

function agruparPorTipo(fichas) {
    const Asesoramiento = {};
    const Comunicación = {};
    const Evento = {};
    const Formación = {};
    const Producto = {};

    fichas.forEach((grupo) => {
      const tipo = grupo.tipo;
      const sub = grupo.subtipo;
  
      if (tipo === "Asesoramiento") {
        Asesoramiento[sub] = (Asesoramiento[sub] || 0) + 1;
        Asesoramiento.Total = (Asesoramiento.Total || 0) + 1;
      } else if (tipo === "Comunicación") {
        Comunicación[sub] = (Comunicación[sub] || 0) + 1;
        Comunicación.Total = (Comunicación.Total || 0) + 1;
      } else if (tipo === "Evento") {
        Evento[sub] = (Evento[sub] || 0) + 1;
        Evento.Total = (Evento.Total || 0) + 1;
      } else if (tipo === "Formación") {
        Formación[sub] = (Formación[sub] || 0) + 1;
        Formación.Total = (Formación.Total || 0) + 1;
      } else if (tipo === "Producto") {
        Producto[sub] = (Producto[sub] || 0) + 1;
        Producto.Total = (Producto.Total || 0) + 1;
      }
    });
  
    return { Asesoramiento, Comunicación, Evento, Formación, Producto};
  }

  console.log("Tipo y subtipos")
  console.log(tipoysubtipos)


///// ENFOQUE TRANSVERSAL /////

const enfoques = contarEnfoques(fichas)

function contarEnfoques(fichas){
    const enfoques = {};

    fichas.forEach((ficha) => {
        const enfoque = ficha.enfoque;

        if (enfoque === "Enfoque de Derechos Humanos") {
            enfoques[enfoque] = (enfoques[enfoque] || 0) + 1;
            enfoques.Total = (enfoques.Total || 0) + 1;
          } else if (enfoque === "Enfoque de Género") {
            enfoques[enfoque] = (enfoques[enfoque] || 0) + 1;
            enfoques.Total = (enfoques.Total || 0) + 1;
          } else if (enfoque === "Espacio accesible") {
            enfoques[enfoque] = (enfoques[enfoque] || 0) + 1;
            enfoques.Total = (enfoques.Total || 0) + 1;
          } else if (enfoque === "Huella de carbono reducida") {
            enfoques[enfoque] = (enfoques[enfoque] || 0) + 1;
            enfoques.Total = (enfoques.Total || 0) + 1;
          }

    });
  
    return enfoques;
  }

  console.log("ENFOQUES")
  console.log(enfoques)


  ///// FORMATO DE LAS ACTIVIDADES //////////

  const formatos = contarFormatos(fichas)

  function contarFormatos(fichas) {

        const formatos = {
          "Híbrida (retransmisión en directo)": 0,
          "Mixto (presencial + virtual)": 0,
          "Presencial": 0,
          "Virtual sincrónica": 0,
          "Virtual asincrónica": 0,
        };

        fichas.forEach((ficha) => {
          
          formatos[ficha.formato]++;
        });

        console.log(formatos)

    return formatos
  }

  const formatoParticipantes = generarObjetoFormPart(fichas)
  console.log("formatoParticipantes:")
  console.log(formatoParticipantes)

  function generarObjetoFormPart(fichas){

    const formatos = {
      "Híbrida (retransmisión en directo)": 0,
      "Mixto (presencial + virtual)": 0,
      "Presencial": 0,
      "Virtual sincrónica": 0,
      "Virtual asincrónica": 0,
      };

    fichas.forEach((ficha) => {

          switch (ficha.formato) {
            case "Híbrida (retransmisión en directo)":
              formatos[ficha.formato]=formatos[ficha.formato]+ficha.participantes[3]
              formatos[ficha.formato]=formatos[ficha.formato]+ficha.ponentes[3]
              break;

            case "Mixto (presencial + virtual)":
              formatos[ficha.formato]=formatos[ficha.formato]+ficha.participantes[3]
              formatos[ficha.formato]=formatos[ficha.formato]+ficha.ponentes[3]
              break;

            case "Presencial":
              formatos[ficha.formato]=formatos[ficha.formato]+ficha.participantes[3]
              formatos[ficha.formato]=formatos[ficha.formato]+ficha.ponentes[3]
              break;

            case "Virtual sincrónica":
              formatos[ficha.formato]=formatos[ficha.formato]+ficha.participantes[3]
              formatos[ficha.formato]=formatos[ficha.formato]+ficha.ponentes[3]
              break;
              
            case "Virtual asincrónica":
              formatos[ficha.formato]=formatos[ficha.formato]+ficha.participantes[3]
              formatos[ficha.formato]=formatos[ficha.formato]+ficha.ponentes[3]
              break;
          }
              
        }
    );

    return formatos

  }

  function calcularPorcentajes(numeros) {
    var total = numeros.reduce((a, b) => a + b, 0);
    console.log(total)
    var porcentajes = numeros.map((numero) => Math.round((numero / total) * 1000) / 10);
    console.log(porcentajes)
    total = porcentajes.reduce((a, b) => a + b, 0);
    if (total > 100) {
        porcentajes[0] = porcentajes[0]-0.1
      }

      console.log(porcentajes)
    return porcentajes;
  }


////ARMADO DE GRUPO DEVUELTO
    const estadisticas = {
      totalActividades, // es un numero
      totalAsistentes,  // definir [0] mujeres, [1] hombres, [2] otros, [3] total
      totalPonentes,
      resultadosPorObjetivo, // definir por objetivo [1,2,3,4] los diferentes resultados [R1,R2,R3,R4]
      tresActividadesConMasAsistentes,  //definir la act [0,1,2] y seleccionar .nombre .participantes
      tipoysubtipos, // definir el tipo y luego seleccionar .subtipo (ej: tipoysubtipos.Comunicación["Total"])
      enfoques,
      formatos,
      formatoParticipantes
    }

    return(estadisticas)

}
