import React from 'react'
import './Title.css'
import img from '../../static/banner.png'
const Title = ()=>{
    return(
        <>
        <article className="title">
        <div>
        <img src={img} alt='WM robot' className='mw-robot'/>
        <h1 className='secondary--text double-w'>W</h1>

        </div>
        <h3 className='programming'>PROGRAMMING</h3>

        </article>
        </>
    )
}

export default Title