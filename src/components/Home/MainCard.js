import React, { useEffect } from "react";
import { DBShape, SecurityShape, ServerShape, ShipShape, StackShape, CodeShape } from './Shapes'

const MainCard = () => {
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

      <div className="home-banner">
        <div className="title-wrapper">
          <div className="qualities">
            <h1>A Pragmatic Dedicated</h1>
          </div>
          <small className="job-title">Web Developer</small>
        </div>
      </div>
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
    </>
  );
};
export default MainCard