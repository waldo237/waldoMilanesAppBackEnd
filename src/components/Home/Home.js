import React, { useState, useEffect } from 'react'
import './Home.css'
import { useTransition, useSpring, animated } from 'react-spring'

const MainCard = () => {
    const [toTheRight, moveMore] = useState(0);
    useEffect(() => {
        const wmImg = document.querySelector(".wm-img");
        const wrapper = document.querySelector("#description");

        const wrapperObserver = new IntersectionObserver( (entries, wrapperObserver) =>{
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    wmImg.classList.add("img-scrolled");
                    wrapper.classList.add('descriptionIn');
                } else {
                    wmImg.classList.remove("img-scrolled");
                }
               
            });
        });
        wrapperObserver.observe(wrapper);
    });


    return <>

        <div className='img-wrapper'>
            <div className='wm-img'></div>
            <h4 className='name'>Waldo Milanes</h4>
            <small className='job-title'>Full-stack developer</small>
        </div>
    </>
}

const Home = () => {
    const [open, toggle] = useState(true);
    const transitions = useTransition(open, null, {
        from: { opacity: 0, transform: 'scaleY(0)' },
        enter: { opacity: 1, transform: 'scaleY(1)' },
        leave: { opacity: 0, transform: 'scaleY(1)' },
    })
    const transition2 = useTransition(open, null, {
        from: { opacity: 0, transform: 'translate3d(0,500px,0)' },
        enter: { opacity: 1, transform: 'translate3d(0,0,0)' },
        leave: { opacity: 0, transform: 'translate3d(0,500px,0)' },

    })

    return (
        <>
            <main className='main light'>
                <div onClick={() => toggle(!open)}>
                    {transitions.map(({ item, key, props }) =>
                        <animated.div style={props} key={key}><MainCard /></animated.div>)}
                </div>
                <div id='description'>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
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