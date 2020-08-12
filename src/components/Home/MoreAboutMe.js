import React, { useEffect } from 'react';
import {Ability, Management, Communication} from './Shapes'

const MoreAboutMe = ()=>{
    const paragraphs = [
        {title: 'technical skills', icon: Ability, content: "I know how to efficiently create elegant and user-friendly interfaces and setup back-end databases that serve different business needs."},
        {title: 'managerial skills', content: "  Working as a manager in the educational field for several years has given me the ability to help small teams foster cooperation to deliver accurate results."},
        {title: 'professional attitude', content: " I excel at communicating my ideas respectfully and negotiating differences with my colleagues."},
    
    ]
    useEffect(()=>{
        const moreAboutMe = document.querySelectorAll(".lazy-effect");
        moreAboutMe.forEach((item)=>{
            const observer = new IntersectionObserver((entries) => {
              entries.forEach((entry) =>
               (entry.isIntersecting && !item.classList.contains('fadeInUpx')) ? item.classList.add("fadeInUpx"): ''
                  
              );
            }, );
            observer.observe(item);
        }, {  rootMargin: "100px" })

    })
    return (      
      <article id="more-about-me-container" className="light primary--text">
        <div id="more-about-me-wrapper">
          { paragraphs.map((paragraph)=>(
            <div className="more-about-me-card " key={paragraph.title}>
              {/* eslint-disable-next-line no-nested-ternary */}
              { (paragraph.title === 'technical skills')? <Ability /> 
            : (paragraph.title ==='managerial skills')? <Management />
            : <Communication />}
              <h2 className='lazy-effect'>{paragraph.title}</h2>
              <p className='lazy-effect'>
                {paragraph.content}
              </p>
            </div>
) )}
        </div>
      </article>
)
}

export default MoreAboutMe