import React from "react";
import { DBShape, SecurityShape, ServerShape, StackShape, CodeShape } from './Shapes'

const HeroArea = () => {
  return (
    <>

     
      <div id="hero-title-wrapper" className='primary--text fadeInUpx'>
        <h2 id="pragmatic-dedicated">A Pragmatic and Dedicated</h2>
        <h1 id="web-developer">Web Developer</h1>
        <p id='introduction-paragraph'>
          Hi, my name is Waldo Milanes. I am an enthusiastic and skilled
          professional with substantial technical expertise in designing
          and developing web applications.
        </p>
        <a href="#more-about-me-container">
          <button id='hear-more-btn' type="button" className="my-work-btn my-work-btn-wide primary--text">
            hear more
          </button>
        </a>
      </div>
   
        
      <div className="main-shape-wrapper flex-row fadeInUpx">
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