export function verify(ponentes, participantes) {
   var stringResult
   let arr
   var titulo = document.getElementById("titulo").value
   var tipo = document.getElementById("tipo").value
   var subtipo = document.getElementById("subtipo").value
   var formato = document.getElementById("formato").value
   var fechainicio = document.getElementById("fechainicio").value
   var fechafinal = document.getElementById("fechafinal").value
   var localidad = document.getElementById("localidad").value
   var país = document.getElementById("país").value
   var organizador = document.getElementById("organizador").value
   var organizadorDetalle = document.getElementById("organizadorDetalle").value
   var cofinanciadora = document.getElementById("cofinanciadora").value
   var enlaceActividad = document.getElementById("enlaceActividad").value
   var fechainicio = document.getElementById('fechainicio').value
   var fechafinal = document.getElementById('fechafinal').value
   var destinatarios = ""
        arr = Array.from(document.querySelectorAll("input[name=destinatarios]:checked")).map((elem) => elem.value)
        console.log(arr.length) 
        if (arr.length > 0) {destinatarios = arr}

    var CodPlanEstratégico = ""
    var DescPlanEstratégico = ""
        arr = document.getElementById('planEstratégico').value
        if (arr != ""){arr = arr.split(",")
        CodPlanEstratégico = arr[0]
        DescPlanEstratégico = arr[1]
        }
    var planEstratégico = arr
    var transversal = document.querySelector("input[name=transversales]:checked").value
    var fuentes = ""
    arr = Array.from(document.querySelectorAll("input[name=fuentes]:checked")).map((elem) => elem.value)
    //*console.log(arr.length) 
    if (arr.length > 0) {fuentes = arr}

    var descripción = document.getElementById("descripción").value

    var arrayObj = [titulo,tipo,subtipo,formato,fechainicio,fechafinal,localidad,país,organizador,organizadorDetalle,cofinanciadora,enlaceActividad,destinatarios,participantes,ponentes,planEstratégico,CodPlanEstratégico,DescPlanEstratégico,transversal,fuentes,descripción]


   console.log(arrayObj)

   const ficha = {
        titulo,
        tipo,
        subtipo,
        formato,
        fechainicio,
        fechafinal,
        localidad,
        país,
        organizador,
        organizadorDetalle,
        cofinanciadora,
        enlaceActividad,
        destinatarios,
        participantes,
        ponentes,
        planEstratégico,
        CodPlanEstratégico,
        DescPlanEstratégico,
        transversal,
        fuentes,
        descripción
        }

    console.log(ficha)
    stringResult = "Todo ok"

    return ficha
  }

  