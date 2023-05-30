import React from 'react'



function Codificacion() {
  return (
    <header>

       <div className='categoria'> 
            <div className='headRow'>
            <span className='code'>1.1.</span><span>Mayores, Discapacidad, Juventud, Educación</span>
            </div>
            <div className='headRow'>
            <span className='code'>1.1.1.</span><span>Mayores</span>
            </div>
            <div className='headRow'>
            <span className='code'>1.1.1.1</span><span>Mayores. Actividades con impacto externo</span>
            </div>
            <p>---</p>
            <div className='headRow'>
            <span className='code'>1.1.1.2</span><span>Mayores. Actividades sin imp
               
               acto externo</span>
            </div>
            <p>---</p>
       </div> 


       <div className='categoria'> 
            <div className='headRow'>
            <span className='code'>1.1.2.</span><span>Discapacidad</span>
            </div>
            <div className='headRow'>
            <span className='code'>1.1.2.1</span><span>Discapacidad. Actividades con impacto externo</span>
            </div>
            <p>---</p>
            <div className='headRow'>
            <span className='code'>1.1.2.2</span><span>Discapacidad. Actividades sin impacto externo</span>
            </div>
            <p>---</p>
       </div>

       <div className='categoria'> 
            <div className='headRow'>
            <span className='code'>1.1.3.</span><span>Juventud</span>
            </div>
            <div className='headRow'>
            <span className='code'>1.1.3.1</span><span>Juventud. Actividades con impacto externo</span>
            </div>
            <p>---</p>
            <div className='headRow'>
            <span className='code'>1.1.3.2</span><span>Juventud. Actividades sin impacto externo</span>
            </div>
            <p>---</p>
       </div>

    </header>
  )
}

export default Codificacion