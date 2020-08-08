import React, { useEffect } from "react";
import { DBShape, SecurityShape, ServerShape, StackShape, CodeShape } from './Shapes'

const HeroArea = () => {
  useEffect(() => {

    // const wmImg = document.querySelector(".wm-img");
    // const description = document.querySelector("#description");
    // const education = document.querySelector("#education");

    // const descriptionObserver = new IntersectionObserver(
    //   (entries) =>
    //     entries.forEach((entry) => {
    //       if (entry.isIntersecting && document.body.clientWidth >= 900) {
    //         wmImg.classList.add("img-scrolled-1");
    //       } else {
    //         wmImg.classList.remove("img-scrolled-1");
    //       }
    //     }),
    //   document.body.clientWidth < 1500
    //     ? { rootMargin: "0px" }
    //     : { rootMargin: "-150px" }
    // );

    // const descriptionObserver2 = new IntersectionObserver(
    //   (entries) => {
    //     entries.forEach((entry) => {
    //       if (entry.intersectionRatio > 0 && !open) toggle({ open: true });
    //       if (entry.isIntersecting) {
    //         wmImg.classList.add("img-out");
    //       } else {
    //         wmImg.classList.remove("img-out");
    //       }
    //     });
    //   },
    //   document.body.clientWidth < 1500
    //     ? { rootMargin: "-150px" }
    //     : { rootMargin: "-250px" }
    // );


    // const educObserver = new IntersectionObserver((entries) => {
    //   entries.forEach((entry) =>
    //     entry.isIntersecting
    //       ? education.classList.add("edu-scrolled")
    //       : education.classList.remove("edu-scrolled")
    //   );
    // });
    // descriptionObserver.observe(description);
    // descriptionObserver2.observe(description);
    // educObserver.observe(education);
  });

  return (
    <>

      <div id="hero-title-wrapper" className='primary--text'>
        <h2 id="pragmatic-dedicated">A Pragmatic and Dedicated</h2>
        <h1 id="web-developer">Web Developer</h1>
        <p id='introduction-paragraph'>
          Hi, my name is Waldo Milanes. I am an enthusiastic and skilled
          professional with substantial technical expertise in designing
          and developing web applications.
        </p>
        <button id='hear-more-btn' type="button" className="my-work-btn my-work-btn-wide primary--text">
          hear more
        </button>
      </div>
   
      <div className="main-shape-wrapper flex-row">
        <div className='shapes flex-row'>
          <div className='shapes-lower-left '>
            <SecurityShape />
            <CodeShape />
          </div>
          <div className='stacks flex-column'>

            <div className="wm-img shadow" />
            <StackShape  />
          </div>
          <div className='shapes-upper-right'>
            <DBShape />
            <ServerShape />
          </div>
        </div>
      </div>
    </>
  );
};
export default HeroArea