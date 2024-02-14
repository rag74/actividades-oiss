export function prellenar(recupero, setearTipo, setOrga) {
    //
    
    console.log(recupero)
    setearTipo(recupero.tipo)
    setOrga(recupero.organizador)
    //let elem = document.getElementById("SUBtipo")
    //elem.classList.remove("none")
    
    function timestampToDate(timestamp) {
        const date = new Date(timestamp) 
        // Format the date string in the desired format.
          let day = date.getDate()
          let month = date.getMonth();
          month = (month + 1)
          let year = date.getFullYear();
        
              if (day < 10) {
                  day = '0' + day;
              }
              
              if (month < 10) {
                  month = `0${month}`;
              }
              
              let formattedDate = `${year}-${month}-${day}`;
              console.log(formattedDate); // 07-23-2022
      
        console.log(formattedDate)
        return formattedDate
  }
    

    document.getElementById("titulo").value = recupero.titulo
    document.getElementById("tipo").value = recupero.tipo
    setTimeout(() => {  document.getElementById("subtipo").value = recupero.subtipo
                         }, 5);
    
    document.getElementById("formato").value = recupero.formato

  
    document.getElementById("fechainicio").value = timestampToDate(recupero.fechainicio)
    
    document.getElementById("fechafinal").value = timestampToDate(recupero.fechafinal)

    document.getElementById("localidad").value = recupero.localidad

    document.getElementById("país").value = recupero.país

    document.getElementById("organizador").value = recupero.organizador

    document.getElementById("cofinanciadora").value = recupero.cofinanciadora
    
    document.getElementById("enlaceActividad").value = recupero.enlaceActividad 
    
    document.getElementById('planEstratégico').value = recupero.planEstratégico

    document.getElementById("descripción").value = recupero.descripción 

    document.getElementById("partMujeres").value = recupero.participantes[0]
    document.getElementById("partHombres").value = recupero.participantes[1]
    document.getElementById("partOtros").value = recupero.participantes[2]
    document.getElementById("partTotal").value = recupero.participantes[3]

    document.getElementById("ponentesMujeres").value = recupero.ponentes[0]
    document.getElementById("ponentesHombres").value = recupero.ponentes[1]
    document.getElementById("ponentesOtros").value = recupero.ponentes[2]
    document.getElementById("poneTotal").value = recupero.ponentes[3]


    setTimeout(() => { organizadoresSet(); }, 10);

    const organizadoresSet = ()=>{
      document.getElementById("organizadorDetalle").value = recupero.organizadorDetalle

      if (recupero.organizadorApoya) {
       document.getElementById("organizadorApoya").value = recupero.organizadorApoya
      }

      }


    
    const checkCheckboxes = (ids)=>{
        // Get all the checkbox elements
        const checkboxes = document.querySelectorAll("input[type=checkbox]");
      
        // Iterate over the checkboxes
        for (const checkbox of checkboxes) {
          // Check if the checkbox id is in the array
          if (ids.includes(checkbox.id)) {
            // Check the checkbox
            checkbox.checked = true;
          }
        }
      }

    checkCheckboxes(recupero.destinatarios)
    checkCheckboxes(recupero.enfoque)
    checkCheckboxes(recupero.fuentes)
    
}