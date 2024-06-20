export function generarFicha(ponentes, participantes, tiposubida, user, REG, recupero, checked) {
   var ponentes = ponentes
   if (ponentes == undefined){ponentes=""}
   var participantes = participantes
   if (participantes == undefined){participantes=""}
   var tipoFicha

   if (checked === true) {
    tipoFicha = "encurso"
   } else {tipoFicha = tiposubida}
    


   let arr
   var titulo = document.getElementById("titulo").value
   var tipo = document.getElementById("tipo").value
   var subtipo = document.getElementById("subtipo").value
   var formato = document.getElementById("formato").value
   var fechainicio = document.getElementById("fechainicio").valueAsNumber+43200000
   var fechafinal = document.getElementById("fechafinal").valueAsNumber+43200000
   var localidad = document.getElementById("localidad").value
   var país = document.getElementById("país").value
   var organizador = document.getElementById("organizador").value
   var organizadorDetalle = document.getElementById("organizadorDetalle").value
   //var CodContable


   if (organizador == "OISS") {
        var organizadorApoya = document.getElementById("organizadorApoya").value
        } else {var organizadorApoya = "" }   
                                       
   var cofinanciadora = document.getElementById("cofinanciadora").value
   var enlaceActividad = document.getElementById("enlaceActividad").value

   var destinatarios = ""
        arr = Array.from(document.querySelectorAll("input[name=destinatarios]:checked")).map((elem) => elem.value)
        //console.log(arr.length) 
        if (arr.length > 0) {destinatarios = arr}

    var CodPlanEstratégico = ""
    var DescPlanEstratégico = ""
        arr = document.getElementById('planEstratégico').value
        if (arr !== ""){arr = arr.split(",")
        CodPlanEstratégico = arr[0]
        DescPlanEstratégico = arr[1]
        }
    var planEstratégico = arr
    var enfoque = ""
        if (document.querySelector("input[name=transversales]:checked")!=null){enfoque=document.querySelector("input[name=transversales]:checked").value}
    var fuentes = ""
    arr = Array.from(document.querySelectorAll("input[name=fuentes]:checked")).map((elem) => elem.value)
    if (arr.length > 0) {fuentes = arr}

    var descripción = document.getElementById("descripción").value

    var período 
    var año
    if (fechafinal) {
        período = new Date(fechafinal).getFullYear()
    } else 
    {
         período = new Date()
         período = período.getFullYear()
    }
    console.log(período)
     
    let cod4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
            .toUpperCase();
    }

    if (!recupero){//creado por primera vez
        var delegación = REG
        var creador = [user.email,user.uid]
        var editor = creador 
        var creado = Date.now()
        var modificación = creado
        var año = período.toString().substr(-2)
        var id = REG+año+'-'+cod4()
        var CodContable = "S/C"
            } else {///cuando la ficha ya existe
        var delegación = recupero.delegación
        var creador = recupero.creador
        var creado = recupero.creado
        var editor = [user.email,user.uid]
        var modificación = Date.now()
        var id = recupero.id
        var CodContable 
        if (recupero.CodPlanEstratégico === CodPlanEstratégico){
            CodContable = recupero.CodContable
            } else { 
             CodContable = "S/C"
            } 
        }

    

   período = obtenerAniosEntreFechas(fechainicio, fechafinal, checked);



   const ficha = {
        titulo,
        tipo,
        subtipo,
        formato,
        fechainicio,
        fechafinal,
        período,
        localidad,
        país,
        organizador,
        organizadorDetalle,
        organizadorApoya,
        cofinanciadora,
        enlaceActividad,
        destinatarios,
        participantes,
        ponentes,
        planEstratégico,
        CodPlanEstratégico,
        DescPlanEstratégico,
        CodContable,
        enfoque,
        fuentes,
        descripción,
        tipoFicha,
        delegación,
        creador,
        creado,
        editor,
        modificación,
        id
        }

 

    console.log(ficha)
    let currentDate = new Date();
    var year = ficha.fechafinal;	
    console.log(year)																							
    return (ficha)

}

function obtenerAniosEntreFechas(fecha1, fecha2, checked) {

    // Crear un array vacío para almacenar los años
    const anios = [];

    if (checked) {
            // Convertir las fechas a objetos Date
            const fechaInicio = new Date(fecha1);
            const fechaFin = new Date(fecha2);
        
            // Obtener el año inicial y final
            const anioInicio = fechaInicio.getFullYear();
            const anioFin = fechaFin.getFullYear();
        
            
        
            // Recorrer desde el año inicial hasta el final
            for (let i = anioInicio; i <= anioFin; i++) {
            // Agregar el año al array
            anios.push(i);
            }

        } else {
            const fechaFin = new Date(fecha2);
            const anioFin = fechaFin.getFullYear();
            anios.push(anioFin);
        }

    // Devolver el array de años
    return anios;
  }


