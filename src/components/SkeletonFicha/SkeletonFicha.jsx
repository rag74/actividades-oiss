import React from 'react'
import './SkeletonFicha.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


function SkeletonFicha() {
  return (
    <div className="contenedor actividad">
        <div className='mb-10'>
            <Skeleton height={20} width={220}/> 
        </div>
        <div className='w50'>
            <Skeleton height={20} width={190}/> 
        </div>
         <div className=''>
            <Skeleton height={20} /> 
        </div>

        <div className='separador'/>

        <div className='w50'>
            <Skeleton height={20} width={50}/> 
        </div>
        <div className='w50'>
            <Skeleton height={20}/> 
        </div>
        <div className='col'>
            <div className='w60 mt-5'>
                <Skeleton height={20} width={110}/> 
            </div>
            <div className='w20 mt-5 pl-5'>
                <Skeleton height={20} width={80}/> 
            </div>
            <div className='w20 mt-5 pl-5'>
                <Skeleton height={20} width={80}/> 
            </div>
        </div>
        <div className='col'>
            <div className='w60'>
                <Skeleton height={20} /> 
            </div>
            <div className='w20 pl-5'>
                <Skeleton height={20} /> 
            </div>
            <div className='w20 pl-5'>
                <Skeleton height={20} /> 
            </div>
        </div>
        <div className='col mt-5'>
            <div className='w50'>
                <Skeleton height={20} width={120} /> 
            </div>
            <div className='w50 pl-5'>
                <Skeleton height={20} width={80} /> 
            </div>
        </div>
        <div className='col'>
            <div className='w50'>
                <Skeleton height={20} /> 
            </div>
            <div className='w50 pl-5'>
                <Skeleton height={20} /> 
            </div>
        </div>

        <div className='separador'/>

        <div className='col mt-5'>
            <div className='w40'>
                <Skeleton height={20} width={110} /> 
            </div>
            <div className='w60 pl-5'>
                <Skeleton height={20} width={120} /> 
            </div>
        </div>
        <div className='col'>
            <div className='w40'>
                <Skeleton height={20} /> 
            </div>
            <div className='w60 pl-5'>
                <Skeleton height={20} /> 
            </div>
        </div>

        <div className='col'>
            <div className='w50'>
                <Skeleton height={20} width={120} /> 
            </div>
            <div className='w50 pl-5'>
                <Skeleton height={20} width={80} /> 
            </div>
        </div>
        <div className='col'>
            <div className='w50'>
                <Skeleton height={20} /> 
            </div>
            <div className='w50 pl-5'>
                <Skeleton height={20} /> 
            </div>
        </div>

        <div className='separador'/>

        <div className='mb-10'>
            <Skeleton height={20} width={260}/> 
        </div>
        <div className='w50'>
            <Skeleton height={20} width={200}/> 
        </div>

        <div className='col'>
            <div className=''>
                <Skeleton height={20} width={10} count={10}/> 
            </div>
            <div className='w45 pl-5'>
                <Skeleton height={20} width={120} /> 
                <Skeleton height={20} width={280} /> 
                <Skeleton height={20} width={250} /> 
                <Skeleton height={20} width={300} /> 
                <Skeleton height={20} width={120} /> 
                <Skeleton height={20} width={140} /> 
                <Skeleton height={20} width={280} /> 
                <Skeleton height={20} width={210} /> 
                <Skeleton height={20} width={190} /> 
                <Skeleton height={20} width={140} /> 
            </div>
            <div className=''>
                <Skeleton height={20} width={10} count={5}/> 
            </div>
            <div className='w45 pl-5'>
                <Skeleton height={20} width={140} /> 
                <Skeleton height={20} width={300} /> 
                <Skeleton height={20} width={270} /> 
                <Skeleton height={20} width={330} /> 
                <Skeleton height={20} width={140} /> 
            </div>
        </div>

    </div>
  )
}

export default SkeletonFicha