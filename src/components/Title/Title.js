import React from 'react'
import './Title.css'
import img from '../../static/logo192.png'
const Title = ()=>{
    return(
        <>
        <article className="title">
        <div>
        <img src={img} alt='WM robot' className='mw-robot'/><h1>A dedicated Web Developer</h1>

        </div>
        <h3>Specialized on backend technology</h3>

        </article>
        </>
    )
}

export default Title