import React, { useState } from "react";
import "./LimitarPalabras.css"

function LimitarPalabras ({texto, cantidadPalabras,cantidadRenglones}) { 
    const [ampliar, setAmpliar] = useState(false)
    const palabras = texto.split(" ");
    const textoReducido = palabras.slice(0, cantidadPalabras).join(" ");
    const textoOculto = palabras.slice(cantidadPalabras).join(" ");

    const renglones = textoReducido.split("\n");
    const textoReducidoRenglones = renglones.slice(0, cantidadRenglones).join("\n");
    const textoOcultoRenglones = renglones.slice(cantidadRenglones).join("\n");


    console.log("Reducido: "+textoReducido)
    console.log("Oculto :"+textoOculto)
    
    return (
        <>
        { palabras.length < cantidadPalabras ? <>{textoReducido} {textoOculto}</> :
            
            !ampliar ?
        
            <>{textoReducido}...
            <button onClick={() => setAmpliar(true)}><i class="fa-solid fa-circle-plus"></i></button>
            </>
            
                    :
            
            <>{textoReducido} {textoOculto}
            <button onClick={() => setAmpliar(false)}><i class="fa-solid fa-circle-minus"></i></button>
            </>
            
        }
        </>
      );
}

export default LimitarPalabras

/*
{ palabras.length < cantidadPalabras ? <>{textoReducido} {textoOculto}</> :
            
            !ampliar ?
        
            <>{textoReducido}...
            <button onClick={() => setAmpliar(true)}>Más</button>
            </>
            
                    :
            
            <>{textoReducido} {textoOculto}
            <button onClick={() => setAmpliar(false)}>Menos</button>
            </>
            
        }

(<i class="fa-solid fa-plus">)</i>
        (<i class="fa-solid fa-minus">)</i>
    */