import React from 'react'
import './Home.css'
import waldoImg from '../../static/waldo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
    return (
        <>
            <main className={'main light'}>
                {/* <h1>WELLCOME</h1> */}
                <div className='img-wrapper' draggable>
                <img src={waldoImg} alt='Photo of Waldo Milanes' className='mw-img' />
                   <div>
                    <h4 className='name'>Waldo Milanes</h4>
                    <small className='job-title'>Full-stack developer</small>

                   </div>
                   <div className='icon-container'>
                       <FontAwesomeIcon className='fa-lg primary--text chevron-down' icon={faAngleDoubleDown} />    
                   </div>
                </div>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                           </p>
            </main>
            <article className='light'>
                <button className='my-work-btn light'>
                    my work
               </button>
            </article>
            <aside className='secondary'>
                <h1>education</h1>
                <p>
                    Lorem Ipsum is dummy.
            </p>
            </aside>
        </>
    )
}


export default Home