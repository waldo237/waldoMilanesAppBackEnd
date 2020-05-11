import React, { useState } from 'react'
import './Home.css'
import waldoImg from '../../static/waldo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'
import { useTransition, animated } from 'react-spring'

const MainCard = () => {
    return <>
        <div className='img-wrapper'>
            <img src={waldoImg} alt='Waldo Milanes' className='mw-img' />
            <div >
                <h4 className='name'>Waldo Milanes</h4>
                <small className='job-title'>Full-stack developer</small>
            </div>
            <div className='icon-container'>
                <FontAwesomeIcon className='fa-lg primary--text chevron-down' icon={faAngleDoubleDown} />
            </div>
        </div>
    </>
}

const Home = () => {
    const [open, toggle] = useState(true);
    const transitions = useTransition(open, null, {
        from: { opacity:0, transform: 'scaleY(0)' },
        enter: { opacity:1, transform: 'scaleY(1)' },
        leave: { opacity:0, transform: 'scaleY(1)' },
    })
    const transition2 = useTransition(open, null, {
        from: { opacity:0, transform: 'translate3d(0,500px,0)' },
        enter: { opacity:1, transform: 'translate3d(0,0,0)' },
        leave: { opacity:0, transform: 'translate3d(0,500px,0)' },
        
    })

    return (
        <>
            <main className='main light'>
                <div onClick={() => toggle(!open)}>
                    {transitions.map(({ item, key, props }) =>
                        item
                            ? <animated.div style={props} key={key}><MainCard /></animated.div>
                            : <animated.div style={props} key={key}>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                            </animated.div>)}
                </div>
            </main>
            <article className='light'>
                {transition2.map(({ item, key, props }) =>
                    <animated.div style={props} key={key}>
                        <button className='my-work-btn light'>
                            my work
                        </button>
                    </animated.div>
                )}
            </article>
            <aside className='secondary'>
               
                {transition2.map(({ item, key, props }) =>
                    <animated.div style={props} key={key}>
                        <h1>education</h1>
                <p>
                    Lorem Ipsum is dummy.
                </p>
                    </animated.div>
                )}
            </aside>
        </>
    )
}


export default Home