import React, { useState, useEffect } from 'react'
import './Home.css'
import { useTransition, useSpring, animated } from 'react-spring'

const Home = () => {
    const [open, toggle] = useState(false);
    const transitions = useTransition(null, null, {
        from: { opacity: 0, transform: 'scaleY(0)' },
        enter: { opacity: 1, transform: 'scaleY(1)' },
        leave: { opacity: 0, transform: 'scaleY(1)' },
    })
    const transition2 = useTransition(null, null, {
        from: { opacity: 0, transform: 'translate3d(0,500px,0)' },
        enter: { opacity: 1, transform: 'translate3d(0,0,0)' },
        leave: { opacity: 0, transform: 'translate3d(0,500px,0)' },
    })

    return (
        <>
         {transition2.map(({ item, key, props }) =>
                    <animated.div style={props} key={key}>
            <main className='main light'>
                <MainCard  toggle={toggle} open={open}/>
                <div id='description'>
                {open
                    ?<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                    : null
                }
                </div>
            </main>
            </animated.div>
                )}
                <svg width="0" height="0">
  <defs>
    <clipPath id="my-shape">
    <path fill="#0099ff" fill-opacity="1" d="M0,64L80,80C160,96,320,128,480,122.7C640,117,800,75,960,53.3C1120,32,1280,32,1360,32L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>  
       </clipPath>
  </defs>
</svg>
            <article className='primary' id='my-work'>
                {transition2.map(({ item, key, props }) =>
                    <animated.div style={props} key={key}>
                        <button className='my-work-btn'>
                            my work
                        </button>
                    </animated.div>
                )}
            </article>
            <aside className='' id='education'>
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

const MainCard = ({toggle, open}) => {
    useEffect(() => {
        const wmImg = document.querySelector(".wm-img");
        const description = document.querySelector("#description");
        const education = document.querySelector(".my-work-btn");
        const options = { rootMargin: "-250px 0px 0px 0px" };
        const options2 = { 
        rootMargin: '110px',
        threshold: 1.0 }; 

        const descriptionObserver = new IntersectionObserver((entries, descriptionObserver) => {
            entries.forEach(entry => (entry.isIntersecting && document.body.clientWidth >= 900)
                ? wmImg.classList.add("img-scrolled")
                : wmImg.classList.remove("img-scrolled"));
        }, options);
        descriptionObserver.observe(description);

        const educationObserver = new IntersectionObserver((entries, educationObserver) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    wmImg.classList.add("img-out");
                  if(!open)  toggle({open:true})
                    description.classList.add("description-in");
                   
                } else {
                    wmImg.classList.remove("img-out");
                    // description.classList.remove("description-in");
                }
            } );
        }, options2);
        educationObserver.observe(education);
    });

    return <>
        <div className='wm-img'></div>
        <div className='img-wrapper'>
            <h4 className='name'>Waldo Milanes</h4>
            <small className='job-title'>Full-stack developer</small>
        </div>
    </>
}


export default Home