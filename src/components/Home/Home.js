import React, { useState, useEffect } from 'react'
import './Home.css'
import { useTransition, animated } from 'react-spring'

const Home = () => {
    const [open, toggle] = useState(false);
    const transition2 = useTransition(null, null, {
        from: { opacity: 0, transform: 'translate3d(0,500px,0)' },
        enter: { opacity: 1, transform: 'translate3d(0,0,0)' },
        leave: { opacity: 0, transform: 'translate3d(0,500px,0)' },
    })

    return (
        <>
            <main className='main light'>
                <MainCard toggle={toggle} open={open} />
                <div id='description'>
                    {open
                        ? <div id='synthesis'>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.  </p>
                            <p> It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                        </div>
                        : null
                    }
                </div>
            </main>
            <svg width="0" height="0">
                <defs>
                    <clipPath id="my-shape" clipPathUnits="objectBoundingBox" transform="scale(0.00104, 0.00344)">
                        <path fill="#0099ff" d="M0,32L48,48C96,64,192,96,288,101.3C384,107,480,85,576,69.3C672,53,768,43,864,37.3C960,32,1056,32,1152,42.7C1248,53,1344,75,1392,85.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>                                                    </clipPath>
                </defs>
            </svg>
            <article className='light'>
                {transition2.map(({ item, key, props }) =>
                    <animated.div id='my-work' style={props} key={key}>
                        <button className='my-work-btn'>
                            my work
                        </button>
                    </animated.div>
                )}
            </article>
            <aside className='' id='education'>
                {transition2.map(({ item, key, props }) =>
                    <animated.div id='credentials' style={props} key={key}>
                        <h1>education</h1>
                        <p>Doggo ipsum long bois lotsa pats blep. What a nice floof ruff super chub very good spot, the neighborhood pupper lotsa pats. Borkdrive shibe shoober what a nice floof, borking doggo.</p>
                        <p>Shoober shooberino adorable doggo many pats, heckin good boys many pats pupper wrinkler, corgo maximum borkdrive. A frighten puggo wow very biscit.</p>
                        <p>Big ol h*ck adorable doggo vvv smol borking doggo with a long snoot for pats big ol, he made many woofs doing me a frighten puggo wow very biscit, ruff fat boi ruff long doggo. </p>
                        <p>Long bois mlem I am bekom fat wrinkler puggo maximum borkdrive big ol pupper I am bekom fat, fluffer vvv adorable doggo lotsa pats snoot. I am bekom fat ur givin me a spook length boy wow very biscit very good spot.</p>
                        <p>Doggo ipsum long bois lotsa pats blep. What a nice floof ruff super chub very good spot, the neighborhood pupper lotsa pats. Borkdrive shibe shoober what a nice floof, borking doggo.</p>
                    </animated.div>
                )}
                <div className='aside-img'></div>
            </aside>
        </>
    )
}

const MainCard = ({ toggle, open }) => {
    useEffect(() => {
        const wmImg = document.querySelector(".wm-img");
        const description = document.querySelector("#description");
        const work = document.querySelector(".my-work-btn");
        const myWork = document.querySelector("#my-work");
        const education = document.querySelector("#education");
        const options = { rootMargin: "-250px 0px 0px 0px" };
        const options2 = {
            rootMargin: '325px',
            threshold: 1.0
        };
        const descriptionObserver = new IntersectionObserver((entries, descriptionObserver) => {
            entries.forEach(entry => (entry.isIntersecting && document.body.clientWidth >= 900)
                ? wmImg.classList.add("img-scrolled")
                : wmImg.classList.remove("img-scrolled"));
        }, options);

        const myWorkObserver = new IntersectionObserver((entries, myWorkObserver) => {
            entries.forEach(entry => (entry.isIntersecting)
                ? myWork.classList.add("my-work-scrolled")
                : myWork.classList.remove("my-work-scrolled"));
        }, options);

        const educObserver = new IntersectionObserver((entries, educObserver) => {
            entries.forEach(entry => (entry.isIntersecting)
                ? education.classList.add("edu-scrolled")
                : education.classList.remove("edu-scrolled"));
        }, options);

        const workObserver = new IntersectionObserver((entries, workObserver) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    wmImg.classList.add("img-out");
                    if (!open) toggle({ open: true })
                    description.classList.add("description-in");
                } else {
                    wmImg.classList.remove("img-out");
                }
            });
        }, options2);
        descriptionObserver.observe(description);
        myWorkObserver.observe(myWork);
        workObserver.observe(work);
        educObserver.observe(education);
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