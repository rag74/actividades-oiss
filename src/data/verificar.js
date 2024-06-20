export function verify(ficha) {
    var mensaje = "OK"
    console.log(ficha)  
   
    if (ficha.tipoFicha === "borrador" ){
        if (!ficha.titulo || !ficha.planEstratégico || !ficha.fechainicio || !ficha.fechafinal){
            mensaje = "No es posible guardar el borrador (la actividad debe tener definido por lo menos un título, su aporte al Plan Estratétics y fechas de inicio y final)"  
        } /*else {
            mensaje = "OK"
         }*/
     return mensaje
     } 


    if (ficha.tipoFicha === "encurso"){
        if (!ficha.titulo || !ficha.planEstratégico || !ficha.fechainicio || !ficha.fechafinal){
            mensaje = "No es posible guardar la actividad como 'En curso' (la actividad debe tener definido por lo menos un título, su aporte al Plan Estratégico y fechas de inicio y final)"  
        }
        if (!ficha.titulo) {
            let element = document.getElementById("titulo");
            element.classList.add("error-class");
        }
        if (!ficha.fechainicio) {
            let element = document.getElementById("fechainicio");
            element.classList.add("error-class");
        }  
        if (!ficha.fechafinal) {
            let element = document.getElementById("fechafinal");
            element.classList.add("error-class");
        }
        if (!ficha.planEstratégico) {
            let element = document.getElementById("planEstratégico");
            element.classList.add("error-class");
        }
        
    return mensaje 
    }

    if (ficha.tipoFicha === "publicada"){
        if (!ficha.titulo) {
            let element = document.getElementById("titulo");
            element.classList.add("error-class");
            mensaje = "La ficha no pudo subirse. Revise el ingreso de los datos obligatorios marcados en rojo."
        }
        if (!ficha.tipo) {
            let element = document.getElementById("tipo");
            element.classList.add("error-class");
            mensaje = "La ficha no pudo subirse. Revise el ingreso de los datos obligatorios marcados en rojo."
        }
        if (!ficha.subtipo) {
            let element = document.getElementById("subtipo");
            element.classList.add("error-class");
            mensaje = "La ficha no pudo subirse. Revise el ingreso de los datos obligatorios marcados en rojo."
        }    
        if (!ficha.formato) {
            let element = document.getElementById("formato");
            element.classList.add("error-class");
            mensaje = "La ficha no pudo subirse. Revise el ingreso de los datos obligatorios marcados en rojo."
        }   
        if (!ficha.fechainicio) {
            let element = document.getElementById("fechainicio");
            element.classList.add("error-class");
            mensaje = "La ficha no pudo subirse. Revise el ingreso de los datos obligatorios marcados en rojo."
        }  
        if (!ficha.fechafinal) {
            let element = document.getElementById("fechafinal");
            element.classList.add("error-class");
            mensaje = "La ficha no pudo subirse. Revise el ingreso de los datos obligatorios marcados en rojo."
        }  
        if (!ficha.localidad) {
            let element = document.getElementById("localidad");
            element.classList.add("error-class");
            mensaje = "La ficha no pudo subirse. Revise el ingreso de los datos obligatorios marcados en rojo."
        } 
        if (!ficha.país) {
            let element = document.getElementById("país");
            element.classList.add("error-class");
            mensaje = "La ficha no pudo subirse. Revise el ingreso de los datos obligatorios marcados en rojo."
        } 
        if (!ficha.organizador) {
            let element = document.getElementById("organizador");
            element.classList.add("error-class");
            mensaje = "La ficha no pudo subirse. Revise el ingreso de los datos obligatorios marcados en rojo."
        }
        if (!ficha.organizadorDetalle) {
            let element = document.getElementById("organizadorDetalle");
            element.classList.add("error-class");
            mensaje = "La ficha no pudo subirse. Revise el ingreso de los datos obligatorios marcados en rojo."
        }
        if (!ficha.fechainicio) {
            let element = document.getElementById("fechainicio");
            element.classList.add("error-class");
            mensaje = "La ficha no pudo subirse. Revise el ingreso de los datos obligatorios marcados en rojo."
        }
        if (!ficha.fechafinal) {
            let element = document.getElementById("fechafinal");
            element.classList.add("error-class");
            mensaje = "La ficha no pudo subirse. Revise el ingreso de los datos obligatorios marcados en rojo."
        }
        if (!ficha.destinatarios) {
            let element = document.getElementById("publico");
            element.classList.add("error-class");
            mensaje = "La ficha no pudo subirse. Revise el ingreso de los datos obligatorios marcados en rojo."
        }
        if (!ficha.planEstratégico) {
            let element = document.getElementById("planEstratégico");
            element.classList.add("error-class");
            mensaje = "La ficha no pudo subirse. Revise el ingreso de los datos obligatorios marcados en rojo."
        }

        /*// SACAR CONDICION OBLIGATORIA PARTICIPANTES Y PONENTES
        if (!ficha.participantes) {
            let element = document.getElementById("participantes");
            element.classList.add("error-class");
            mensaje = "La ficha no pudo subirse. Revise el ingreso de los datos obligatorios marcados en rojo."
        }
        if (!ficha.ponentes) {
            let element = document.getElementById("ponentes");
            element.classList.add("error-class");
            mensaje = "La ficha no pudo subirse. Revise el ingreso de los datos obligatorios marcados en rojo."
        }
        */

        /*// SACAR CONDICION OBLIGATORIA ENFOQUE
         if (!ficha.enfoque) {
            let element = document.getElementById("enfoque");
            element.classList.add("error-class");
            mensaje = "La ficha no pudo subirse. Revise el ingreso de los datos obligatorios marcados en rojo."
        }*/

        if (!ficha.fuentes) {
            let element = document.getElementById("fuentes");
            element.classList.add("error-class");
            mensaje = "La ficha no pudo subirse. Revise el ingreso de los datos obligatorios marcados en rojo."
        }

        if (!ficha.descripción) {
            let element = document.getElementById("descripción");
            element.classList.add("error-class");
            mensaje = "La ficha no pudo subirse. Revise el ingreso de los datos obligatorios marcados en rojo."
        }


    }

     return mensaje

  }

  