import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Tecnologies from './Technologies';
import {FishFlock, FishFlock2} from "./FishFlock";
import Education from "./Education";
import HeroArea from "./HeroArea";
import Banner from "../Banner/Banner";

const Home = () => {
  useEffect(() => {
    document.title = "Waldo Milanes' professional profile";
  });
  // const [open, toggle] = useState(false);

  const fishType1 = {id:'fish3', d:"M96.806,50.581c-0.775,0.021-1.511,0.322-2.283,0.202c-0.016-0.053-0.03-0.151-0.038-0.202  c0.666-0.302,1.403-0.49,2.011-0.925c0.325-0.316,0.792-0.691,0.573-1.209c-0.242-1.068-1.218-1.729-2.06-2.307  c-1.007-0.707-2.14-1.173-3.214-1.735c-1.18-0.504-2.771-2.356-18.807-5.387c-5.913-1.133-11.902-1.648-12.152-1.836  c-5.526,0.102-11.099-6.188-12.797-6.691C47.776,30.317,47.581,31,47.452,31h0.002c-0.16,1-0.614,8.46,0.302,8.738  c-1.03,0.308-2.109,0.271-3.156,0.497c-1.72,0.33-10.451,2.965-14.923,3.992c-1.585,0.294-3.21,0.235-4.815,0.242  c-1.549-0.029-3.073-0.372-4.561-0.761c-1.817-0.518-16.438-6.635-16.537-6.133c0.038,4.065,2.203,6.819,3.75,10.432  c0.052,0.526,0.269,1.035,0.196,1.576c-0.858,2.793-4.111,5.208-4.913,8.098c0.006,0.556-0.234,1.051-0.438,1.554  c0.67,0.044,1.339,0.083,2.013,0.067c1.466-0.172,10.055-2.336,11.376-2.645c1.292-0.299,2.501-0.85,3.777-1.164  c0.725-0.173,1.377-0.548,2.104-0.669c1.443-0.188,2.901-0.367,4.359-0.225c1.016,0.104,2.027,0.203,3.029,0.42  c0.757,0.166,6.36,1.226,9.716,2.373c2.207,0.173,10.578,3.585,11.368,3.751c-1.289,2.099-1.147,3.252-1.48,5.746  c-0.216,0.879-0.254,1.888,0.359,2.614c0.278,0.264,0.731,0.277,1.044,0.069c4.525-4.812,9.603-6.665,9.82-7.348  c2.756,0.329,5.53,0.044,8.294,0.059c15.207-0.16,25.758-8.233,26.728-8.767c0.812-0.413,1.678-0.872,2.166-1.675  C97.422,51.488,97.287,50.769,96.806,50.581z M87.604,50.102c-0.896,0-1.621-0.727-1.621-1.623c0-0.896,0.725-1.623,1.621-1.623  c0.897,0,1.624,0.727,1.624,1.623C89.229,49.375,88.502,50.102,87.604,50.102z"}
  const fishType2 = {id:'fish6', d:"M99.991,30.078c0.072-0.639-0.325-1.315-1.484-2.07c-1.074-0.69-2.181-1.367-3.255-2.044  c-2.344-1.498-4.83-2.878-7.174-4.505C81.216,16.706,73.091,15,64.96,13.906c-3.333-0.43-7.063-0.248-9.856-2.305  C52.941,10,49.172,4.505,45.048,2.123C44.335,1.693,40.982,0,40.982,0s1.917,5.208,2.36,6.25c1.022,2.422-0.56,4.492-1.221,6.797  c-0.43,1.523,3.135,1.185,3.317,2.604c0.264,2.109-6.083,2.838-9.664,3.555c-5.368,1.055-11.615,3.06-16.966,1.302  C12.493,18.477,7.992,14.453,3.457,9.896c2.109,9.87,7.975,15.546,8.232,16.745c0.273,1.328-0.674,1.602-1.53,2.461  C8.271,30.963,0.026,40.455,0,43.45c2.367-0.352,5.218-2.436,7.301-3.646c2.318-1.328,11.156-7.864,13.626-8.893  c0.563-0.234,7.412-2.239,7.471-1.367c0.098,1.367-0.453,1.667-0.27,2.239c0.335,1.094,2.116,2.161,2.965,2.903  c2.21,1.914,4.704,3.581,6.266,6.107c2.188,3.528,2.289,7.33,2.907,11.263c1.458-0.17,2.946-3.19,3.75-4.388  c0.752-1.133,3.5-5.977,4.538-6.289c0.99-0.3,4.043,1.406,5.13,1.731c4.199,1.237,8.275,1.979,12.559,1.979  c5.144,0.013,18.652,0.377,28.671-7.031c1.107-0.82,3.75-3.984,3.75-3.984s-0.553-0.847-1.549-1.159  C98.442,32.044,99.874,31.133,99.991,30.078z M90.891,30.547c-1.25,0-2.266-1.016-2.266-2.266c0-1.264,1.016-2.266,2.266-2.266  c1.256,0,2.266,1.002,2.266,2.266C93.156,29.531,92.146,30.547,90.891,30.547z"}
  return (
    <>
      <main className="hero-area-wrapper light">
      <div className='elipsis-shape'/>
        <HeroArea  />
      </main>
      {/* <Banner  /> */}
      <article id="more-about-me-container" className="primary--text">
        <div id="more-about-me-wrapper" >
          <div className="more-about-me-card">
            <p>
              I know how to efficiently create elegant and user-friendly interfaces, setup back-end
              databases that serve different business needs, and connect these
              two ends in a way that is secured and optimized.{" "}
            </p>
          </div>
          <div className="more-about-me-card">
            <p>
              {" "}
              Working as a manager in the educational field for several years
              has given me the ability to help small teams foster
              cooperation to deliver accurate results. 
            </p>
          </div>
          <div className="more-about-me-card">
            <p>I excel
              at communicating my ideas respectfully and negotiating
              differences with my colleagues.{" "}
            </p>
          </div>
        </div>
      </article>
      <svg width="0" height="0"> <defs> <clipPath id="my-shape" clipPathUnits="objectBoundingBox" transform="scale(0.00104, 0.00344)"> <path d="M0,64L120,96C240,128,480,192,720,186.7C960,181,1200,107,1320,69.3L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z" /> </clipPath> <clipPath id="my-shape2" clipPathUnits="objectBoundingBox" transform="scale(0.00104, 0.00344)"> <path d=" M0 67 C 273,183 822,-40 1920.00,106 V 359 H 0 V 67 Z"> <animate repeatCount="indefinite" attributeName="d" dur="20s" attributeType="XML" values=" M0 77 C 473,283 822,-40 1920,116 V 389 H 0 V 67 Z; M0 77 C 373,-40 1222,283 1920,136 V 359 H 0 V 67 Z; M0 77 C 973,260 1722,-53 1920,120 V 459 H 0 V 67 Z; M0 77 C 573,283 822,-40 1920,116 V 359 H 0 V 67 Z " /> </path> </clipPath> </defs> </svg>
      <article className="light">
        <div id="my-work">
          <Link to="/portfolio">
            <button type="button" className="my-work-btn my-work-btn-wide light--text">
              my work
            </button>
          </Link>
          <Tecnologies />
          <div style={{width:'100%', marginBottom: '250px', marginRight:'40px', position:"absolute"}}><FishFlock2 fishType={fishType2}  /></div>
          <FishFlock2 fishType={fishType1}  />
          
          <FishFlock />
        </div>
      </article>
      <aside id="education">
        <Education />
      </aside>
    </>
  );
};



export default Home;
