export function generarStatsComp(fichas,OISSCentro) {

    //TOTAL ACTIVIDADES
    const totalActividades = fichas.length;
    console.log("COMP totalActividades")
    console.log(totalActividades)
    ////////////////////

    //TOTAL PARTICIPANTES


    //CREACIÓN DE OBJETOS BASE
    const delegAsistAcumlados = {};

    for (const grupo of fichas) {
        const { delegación, hombres, mujeres, otros, hombresP, OE1, OE2, OE3, OE4 } = grupo;
      
        // Si la ciudad no existe en el objeto, crearlo con valores 0
        if (!delegAsistAcumlados[grupo.delegación]) {
            delegAsistAcumlados[grupo.delegación] = {
            actividades: 0,
            mujeres: 0,
            hombres: 0,
            otros: 0,
            mujeresP: 0,
            hombresP: 0,
            otrosP: 0,
            OE1: 0,
            OE2: 0,
            OE3: 0,
            OE4: 0,
            OE5: 0,
            Asesoramiento: 0,
            Comunicación: 0,
            Evento: 0,
            Formación: 0,
            Producto: 0,
            "Enfoque de Derechos Humanos":0,
            "Enfoque de Género":0,
            "Espacio accesible":0,
            "Huella de carbono reducida":0,
            "HíbridaAct":0,
            "MixtoAct":0,
            "PresencialAct":0,
            "asincrónicaAct":0,
            "sincrónicaAct":0,
            "HíbridaPart":0,
            "MixtoPart":0,
            "PresencialPart":0,
            "asincrónicaPart":0,
            "sincrónicaPart":0,
          };
        }
        // Sumar los valores de cada propiedad a la ciudad correspondiente
        delegAsistAcumlados[delegación].actividades +=  1;

        delegAsistAcumlados[delegación].mujeres +=  grupo.participantes[0];
        delegAsistAcumlados[delegación].hombres += grupo.participantes[1];
        delegAsistAcumlados[delegación].otros += grupo.participantes[2];

        delegAsistAcumlados[delegación].mujeresP +=  grupo.ponentes[0];
        delegAsistAcumlados[delegación].hombresP += grupo.ponentes[1];
        delegAsistAcumlados[delegación].otrosP += grupo.ponentes[2];
        

        switch (grupo.CodPlanEstratégico.slice(0, 1)) {
            case "1":
            delegAsistAcumlados[delegación].OE1++;
              break;
            case "2":
            delegAsistAcumlados[delegación].OE2++;
              break;
            case "3":
            delegAsistAcumlados[delegación].OE3++;
              break;
            case "4":
            delegAsistAcumlados[delegación].OE4++;
              break;
            case "5":
              delegAsistAcumlados[delegación].OE5++;
                break;
          }

        switch (grupo.tipo) {
            case "Asesoramiento":
            delegAsistAcumlados[delegación].Asesoramiento++;
              break;
            case "Comunicación":
            delegAsistAcumlados[delegación].Comunicación++;
              break;
            case "Evento":
            delegAsistAcumlados[delegación].Evento++;
              break;
            case "Formación":
            delegAsistAcumlados[delegación].Formación++;
              break;
            case "Producto":
            delegAsistAcumlados[delegación].Producto++;
                break;
          }

          switch (grupo.enfoque) {
            case "Enfoque de Derechos Humanos":
            delegAsistAcumlados[delegación]["Enfoque de Derechos Humanos"]++;
              break;
            case "Enfoque de Género":
            delegAsistAcumlados[delegación]["Enfoque de Género"]++;
              break;
            case "Espacio accesible":
            delegAsistAcumlados[delegación]["Espacio accesible"]++;
              break;
            case "Huella de carbono reducida":
            delegAsistAcumlados[delegación]["Huella de carbono reducida"]++;
              break;
          }

          switch (grupo.formato) {
            case "Híbrida (retransmisión en directo)":
            delegAsistAcumlados[delegación].HíbridaAct++;
            delegAsistAcumlados[delegación].HíbridaPart=delegAsistAcumlados[delegación].HíbridaPart+grupo.participantes[3]+grupo.ponentes[3];
              break;
            case "Mixto (presencial + virtual)":
            delegAsistAcumlados[delegación].MixtoAct++;
            delegAsistAcumlados[delegación].MixtoPart=delegAsistAcumlados[delegación].MixtoPart+grupo.participantes[3]+grupo.ponentes[3];
              break;
            case "Presencial":
            delegAsistAcumlados[delegación].PresencialAct++;
            delegAsistAcumlados[delegación].PresencialPart=delegAsistAcumlados[delegación].PresencialPart+grupo.participantes[3]+grupo.ponentes[3];
              break;
            case "Virtual asincrónica":
            delegAsistAcumlados[delegación].asincrónicaAct++;
            delegAsistAcumlados[delegación].asincrónicaPart=delegAsistAcumlados[delegación].asincrónicaPart+grupo.participantes[3]+grupo.ponentes[3];
              break;
            case "Virtual sincrónica":
            delegAsistAcumlados[delegación].sincrónicaAct++;
            delegAsistAcumlados[delegación].sincrónicaPart=delegAsistAcumlados[delegación].sincrónicaPart+grupo.participantes[3]+grupo.ponentes[3];
              break;
          }
      
        }

    const delegAcumulados = Object.entries(delegAsistAcumlados).map(([delegación, datos]) => ({
            delegación,
            ...datos,
          }));

     console.log("COMP delegAcumulados")
     console.log(delegAcumulados)

    //////////////////////////////      

    ///////////////////////////////////////////////
    /////// ARRAYS ////////////////////////////////
    ///////////////////////////////////////////////

    const arrayTortaActividades = arrayTortaAct(delegAcumulados)
    console.log(arrayTortaActividades)

    function arrayTortaAct(objetos) {
            const arrays = [["Delegación","Cantidad",{type: 'string',label: 'Tooltip Chart',role: 'tooltip','p': {'html': true}}]];
            var total = 0
            

            objetos.forEach((grupo) => {
                //const { OE1, OE2, OE3, OE4 } = grupo;
                total += grupo.OE1 + grupo.OE2 + grupo.OE3 + grupo.OE4;
            });
            
            objetos.forEach((grupo) => {
                var porcentaje =  (grupo.actividades*100/total).toFixed(1)//Math.round((objeto[propiedad] / total) * 1000) / 10

            
            arrays.push(
                [`${OISSCentro[grupo.delegación]} (${grupo.actividades})`, grupo.actividades,`<div class="toolTipPie"><p>${OISSCentro[grupo.delegación]}</p><p><strong>${grupo.actividades} (${porcentaje}%)</strong></p></div>`]
                ); 
            });

        return arrays
    }

    const arrayTortaParticipantes = arrayTortaPart(delegAcumulados)
    console.log(arrayTortaParticipantes)

    function arrayTortaPart(objetos) {
        const arrays = [["Delegación","Cantidad",{type: 'string',label: 'Tooltip Chart',role: 'tooltip','p': {'html': true}}]];
        var total = 0
        

        objetos.forEach((grupo) => {
            const { hombres, mujeres, otros, hombresP, mujeresP, otrosP } = grupo;
            total += hombres + mujeres + otros + hombresP + mujeresP + otrosP;
          });
        
        objetos.forEach((grupo) => {
            var totalPart = grupo.hombres + grupo.mujeres + grupo.otros + grupo.hombresP + grupo.mujeresP + grupo.otrosP;

            var porcentaje =  (grupo.actividades*100/totalPart).toFixed(1)//Math.round((objeto[propiedad] / total) * 1000) / 10

        
        arrays.push(
            [`${OISSCentro[grupo.delegación]} (${totalPart})`, totalPart,`<div class="toolTipPie"><p>${OISSCentro[grupo.delegación]}</p><p><strong>${totalPart} (${porcentaje}%)</strong></p></div>`]
            ); 
        });

    return arrays
}

////// ARRAY DE OE

const arrayOE = crearArraysOE(delegAcumulados)

function crearArraysOE(objeto) {
    const arrays = [["Delegación","OE.1","OE.2","OE.3","OE.4","OE.5"]];
  
    objeto.forEach((grupo) => {
     
    arrays.push(
        [`${OISSCentro[grupo.delegación]}`, grupo.OE1, grupo.OE2, grupo.OE3, grupo.OE4, grupo.OE5]
        ); 
      });

      return arrays;
    }



// ARRAY DE TIPOLOGIA    

const arrayTipo = crearArraysTipo(delegAcumulados)

function crearArraysTipo(objeto) {
    const arrays = [["Delegación","Asesoriamiento","Comunicación","Evento","Formación","Prodructo"]];
  
    objeto.forEach((grupo) => {
     
    arrays.push(
        [`${OISSCentro[grupo.delegación]}`, grupo.Asesoramiento, grupo.Comunicación, grupo.Evento, grupo.Formación, grupo.Producto]
        ); 
      });

      return arrays;
    }


// ARRAY GENERO //////////////////////// 

    const arrayGenero = crearArraysGenero(delegAcumulados)

    function crearArraysGenero(objeto) {
        const arrays = [["Delegación","Asistentes mujeres","Asistentes hombres","Asistentes otros","Ponentes mujeres","Ponentes hombres","Ponentes otros"]];
      
        objeto.forEach((grupo) => {
                
            const totalPart = (grupo.mujeres + grupo.hombres + grupo.otros + grupo.mujeresP + grupo.hombresP + grupo.otrosP)
            
            arrays.push(
                [`${OISSCentro[grupo.delegación]} (${totalPart})`, grupo.mujeres, grupo.hombres, grupo.otros, grupo.mujeresP, grupo.hombresP, grupo.otrosP]
                ); 
            });
        
          return arrays;
        }
    

// ARRAY ENFOQUE //////////////////////// 

const arrayEnfoque = crearArraysEnfoque(delegAcumulados)
console.log(arrayEnfoque)

function crearArraysEnfoque(objeto) {
    const arrays = [["Delegación","Enfoque de Género","Espacio accesible","Huella de carbono reducida"]];

    objeto.forEach((grupo) => {
            
        const totalPart = (grupo["Enfoque de Género"] + grupo["Espacio accesible"] + grupo["Huella de carbono reducida"])
        
        arrays.push(
            [`${OISSCentro[grupo.delegación]} (${totalPart})`, grupo["Enfoque de Género"], grupo["Espacio accesible"], grupo["Huella de carbono reducida"]]
            ); 
        });
    
      return arrays;
    }


// ARRAY FORMATO (ACTIVIDAD) //////////////////////// 

const arrayFormatoAct = crearArrayFormatoAct(delegAcumulados)
console.log(arrayFormatoAct)

function crearArrayFormatoAct(objeto) {
    const arrays = [["Delegación","Híbrida (retransmisión en directo)", "Mixto (presencial + virtual)",
    "Presencial", "Virtual sincrónica", "Virtual asincrónica"]];

    objeto.forEach((grupo) => {
            
        const totalPart = (grupo.HíbridaAct + grupo.MixtoAct + grupo.PresencialAct + grupo.asincrónicaAct + grupo.sincrónicaAct)
        
        arrays.push(
            [`${OISSCentro[grupo.delegación]} (${totalPart})`, grupo.HíbridaAct , grupo.MixtoAct , grupo.PresencialAct , grupo.asincrónicaAct , grupo.sincrónicaAct]
            ); 
        });
    
      return arrays;
    }

const arrayFormatoPart = crearArrayFormatoPart(delegAcumulados)
console.log(arrayFormatoPart)
    
    function crearArrayFormatoPart(objeto) {
        const arrays = [["Delegación","Presencial", "Virtual (completa o de apoyo)"]];
    
        objeto.forEach((grupo) => {
                
            const totalPart = (grupo.HíbridaPart + grupo.MixtoPart + grupo.PresencialPart + grupo.asincrónicaPart + grupo.sincrónicaPart)
            
            arrays.push(
                [`${OISSCentro[grupo.delegación]} (${totalPart})`, grupo.PresencialPart , (grupo.PresencialPart + grupo.HíbridaPart + grupo.MixtoPart + grupo.asincrónicaPart + grupo.sincrónicaPart)]
                ); 
            });
        
          return arrays;
        }
    
    

////ARMADO DE GRUPO DEVUELTO
const estadisticasComp = {
    totalActividades, // es un numero
    delegAcumulados, // grupos por delegación con todos los valores de asistentes/ponentes, OE, tipos
    arrayTortaActividades,
    arrayTortaParticipantes,
    arrayOE,
    arrayTipo,
    arrayGenero,
    arrayEnfoque,
    arrayFormatoAct,
    arrayFormatoPart
  }

  return(estadisticasComp)

}



/*
objetos.forEach((grupo) => {
    const { hombres, mujeres, otros, hombresP, mujeresP, otrosP } = grupo;
    total += hombres + mujeres + otros + hombresP + mujeresP + otrosP;
  });*/