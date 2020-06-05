import React, { useState, useEffect } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
    const [open, toggle] = useState(false);
    const educationPoints = [
        {
            id: '2331',
            career: 'Bachelors of Arts in Modern Languages',
            duration: new Date(2011, 11, 15).getFullYear(),
            university: 'Santiago University of Technology (UTESA)',
            place: 'Dominican Republic',
            description: 'Gained ability to communicate clearly in a foreign language, both verbally and in writing; professional communication, spoken and written; sensitivity to different cultural contexts; the ability to work independently; general research skills; self-reflection and critical judgment; self-management, including planning and meeting deadlines; analyzing written and visual sources; adaptability and flexibility.'
        },
        {
            id: '2332',  
            career: 'Computer Programming',
            duration: new Date(2017, 11, 15).getFullYear(),
            university: 'Technological Institute of the Americas (ITLA)',
            place: 'Dominican Republic',
            description: 'Gained general knowledge of software development to solve, creatively and innovatively, challenging computer programming problems; awareness of object-oriented software development; the foundations of networking; management of Relational Databases, widely knowing the concepts of data modeling and design taken from the specific requirements.'
        },
        {
            id: '2335',
            career: 'Database Design and SQL',
            duration: new Date(2018, 11, 15).getFullYear(),
            university: 'Technological Institute of the Americas (ITLA)',
            place: 'Dominican Republic',
            description: 'My first major was in languages. I learned how to properly speak French and English as well as the best practices to teach these languages'
        },
        {
            id: '2336',
            career: 'Intermediate Java Programming',
            duration: new Date(2018, 11, 15).getFullYear(),
            university: 'Technological Institute of the Americas (ITLA)',
            place: 'Dominican Republic',
            description: 'My first major was in languages. I learned how to properly speak French and English as well as the best practices to teach these languages'
        },
        {
            id: '2337',
            career: 'Effective Assessment Practices Certification',
            duration: new Date(2019, 11, 15).getFullYear(),
            university: 'University of Oregon',
            place: 'Eugene, Oregon, USA',
            description: 'My first major was in languages. I learned how to properly speak French and English as well as the best practices to teach these languages'
        },
        {
            id: '2334',
            career: 'Master of Arts in Applied Linguistics',
            duration: new Date(2020, 11, 15).getFullYear(),
            university: 'Autonomous University of Santo Domingo (UASD)',
            place: 'Dominican Republic',
            description: 'My first major was in languages. I learned how to properly speak French and English as well as the best practices to teach these languages'
        },
        
    ];

    return (
        <>
            <main className='main light'>
                <MainCard toggle={toggle} open={open} />
                <div id='description'>
                    {open
                        ? <div id='synthesis' className='description-in'>
                            <p>Hi, my name is Waldo Milanes. I am an enthusiastic and skilled professional with substantial technical expertise in designing and developing web applications. I know how to efficiently create elegant and user-friendly interfaces, setup back-end databases that serve different business needs, and connect these two ends in a way that is secured and optimized. </p>
                            <p> Working as a manager in the educational field for several years has given me the experience to help small teams foster cooperation and motivation to deliver accurate results. I excel at communicating my ideas respectfully and negotiating differences with my colleagues. </p>
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

                <div id='my-work'>
                    <Link to='/portfolio'>
                        <button className='my-work-btn' >
                            my work
                        </button>
                    </Link>
                </div>
            </article>
            <aside id='education'>
                <div id='credentials'>
                    <h1 className='title-font primary--text title-2'>Education</h1>
                    {educationPoints.map((item) =>
                        <div key={item.id} className='certificate'>
                            <h2>{item.career}</h2>
                            <h4>{item.university}</h4>
                            <h5>{item.duration}— {item.place}</h5>
                            <p> {item.description} </p>
                        </div>
                    )}
                </div>
                <div className='aside-img'></div>
            </aside>
        </>
    )
}

const MainCard = ({ toggle, open }) => {
    useEffect(() => {
        const wmImg = document.querySelector(".wm-img");
        const description = document.querySelector("#description");
        const myWork = document.querySelector("#my-work");
        const education = document.querySelector("#education");

        const descriptionObserver = new IntersectionObserver((entries, descriptionObserver) =>
            entries.forEach(entry => {
                if (entry.isIntersecting && document.body.clientWidth >= 900) {
                    wmImg.classList.add("img-scrolled-1");
                } else {
                    wmImg.classList.remove("img-scrolled-1");
                }
            }), (document.body.clientWidth < 1500) ? { rootMargin: '0px' } : { rootMargin: '-150px' });

        const descriptionObserver2 = new IntersectionObserver((entries, workObserver) => {
            entries.forEach(entry => {
                if (entry.intersectionRatio > 0 && !open) toggle({ open: true })
                if (entry.isIntersecting) {
                    wmImg.classList.add("img-out");
                } else {
                    wmImg.classList.remove("img-out");
                }
            });
        }, (document.body.clientWidth < 1500) ? { rootMargin: '-150px' } : { rootMargin: '-250px' });

        const myWorkObserver = new IntersectionObserver((entries, myWorkObserver) => {
            entries.forEach(entry => (entry.isIntersecting)
                ? myWork.classList.add("my-work-scrolled")
                : myWork.classList.remove("my-work-scrolled"));
        });

        const educObserver = new IntersectionObserver((entries, educObserver) => {
            entries.forEach(entry => (entry.isIntersecting)
                ? education.classList.add("edu-scrolled")
                : education.classList.remove("edu-scrolled"));
        });
        descriptionObserver.observe(description);
        descriptionObserver2.observe(description);
        myWorkObserver.observe(myWork)
        educObserver.observe(education);
    });

    return <>
        <div className='wm-img shadow'></div>
        <div className='home-banner'>
            <div className='title-wrapper'>
                <h4 className='name' id='name-1'>A Pragmatic &amp; Dedicated</h4>
                <small className='job-title'>Web Developer</small>

            </div>
        </div>
    </>
}


export default Home