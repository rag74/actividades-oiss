export function filtrarPorAnio(fichas, YEAR){

    console.log("fichas funcion filtrar")
    console.log(fichas)

    console.log("año funcion filtrar")
    console.log(YEAR)

    var arr = []
    
    const filtradas = fichas.forEach(function(ficha){
        
        for (var i=0;i<ficha.período.length;i++){
            if (ficha.período[i] === YEAR){
               arr.push(ficha)
            }
        }
    })

    console.log("FILTRADAS?")
    console.log(arr)

}


/*
 const filtradas = fichas.filter((ficha) => {
        const periodoArray = ficha.período
        //periodoAnio = periodoAnio.toString
        //console.log(periodoArray)
        return periodoArray.toString.includes("2023") 
})
*/