export function generarFicha(ponentes, participantes, tiposubida, user, REG, recupero) {
   var ponentes = ponentes
   if (ponentes == undefined){ponentes=""}
   var participantes = participantes
   if (participantes == undefined){participantes=""}
   var tipoFicha = tiposubida


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
        var id = REG+'23-'+cod4()
            } else {///cuando la ficha ya existe
        var delegación = recupero.delegación
        var creador = recupero.creador
        var creado = recupero.creado
        var editor = [user.email,user.uid]
        var modificación = Date.now()
        var id = recupero.id
        }

    

    

    /*
    var arrayObj = [titulo,tipo,subtipo,formato,fechainicio,fechafinal,localidad,país,organizador,organizadorDetalle,cofinanciadora,enlaceActividad,destinatarios,participantes,ponentes,planEstratégico,CodPlanEstratégico,DescPlanEstratégico,transversal,fuentes,descripción]
    console.log(arrayObj)*/



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