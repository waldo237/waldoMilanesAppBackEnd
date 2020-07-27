import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Tecnologies from './Technologies'
import {FishFlock, FishFlock2} from "./FishFlock";

const Home = () => {
  const [open, toggle] = useState(false);
  const educationPoints = [
    {
      id: "2331",
      career: "Bachelors of Arts in Modern Languages",
      duration: new Date(2011, 11, 15).getFullYear(),
      university: "Santiago University of Technology (UTESA)",
      place: "Dominican Republic",
      description:
        "The ability to communicate clearly in two foreign languages (English and French), both verbally and in writing; professional communication, spoken and written; sensitivity to different cultural contexts; the ability to work independently; general research skills; self-reflection and critical judgment; self-management, including planning and meeting deadlines; analyzing written and visual sources; adaptability and flexibility.",
    },
    {
      id: "2332",
      career: "Computer Programming",
      duration: new Date(2017, 11, 15).getFullYear(),
      university: "Technological Institute of the Americas (ITLA)",
      place: "Dominican Republic",
      description:
        "The fundamentals of programming; algorithms and data structures; software testing and debugging; a solid foundation of object-oriented software development; design patterns, the essentials of networking; design and management of relational databases; project requirements gathering and prototyping.",
    },
    {
      id: "232336",
      career: "Intermediate Java Programming",
      duration: new Date(2018, 11, 15).getFullYear(),
      university: "Technological Institute of the Americas (ITLA)",
      place: "Dominican Republic",
      description:
        "Basic concepts, logic and syntax of the Java programming language, event-driven programming, sequential and associative data structures, classic data structures, sorting and searching, exception handling, database programming with JDBC, networking programming, GUI development using Swing, multithreading, Java Applets, web applications (Servlets), advanced I/O classes, regular expressions, Java graphics, introduction to Spring using Spring Boot.",
    },
    {
      id: "2335",
      career: "Database Design and SQL",
      duration: new Date(2018, 11, 15).getFullYear(),
      university: "Technological Institute of the Americas (ITLA)",
      place: "Dominican Republic",
      description:
        "The foundation of database programming: planning a database, relational databases, records, data types, adding validation rules, normalization and denormalization, referential integrity, ACID transactions, SQL queries, CRUD operations, sorting results, and joining tables.",
    },
    {
      id: "2332326",
      career: "Become a web developer & JavaScript",
      duration: new Date(2018, 11, 15).getFullYear(),
      university: "LinkedIn Learning",
      place: "Online",
      description:
        "The basics of HTML, CSS fundamental concepts; CSS box model, Flexbox and Grid. JavaScript core principles like variables, data types, conditionals, loops, and DOM scripting; higher-order functions, IIFE functions, scopes, and closure; partial application and recursion; prototypes and classes; callbacks and promises, JS module system. Version control software; the use of Git.",
    },
    {
      id: "2323236",
      career: "Become a NodeJs Developer",
      duration: new Date(2019, 11, 15).getFullYear(),
      university: "LinkedIn Learning",
      place: "Online",
      description:
        "The global object, Importing the core modules, creating custom events with the EventEmitter, reading; writing; and removing files, working with file streams, creating child processes with the exec and spawn functions, managing third-party packages with npm, REST APIs, Node.js frameworks, creating a basic Express.js application, managing data to MongoDB with Mongoose, error handling and debugging, consulting OWASP resources and handling security threats, adding two-factor and read-only tokens, encrypting user data and session management, adding HTTPS protocol to an application, using cookie attributes, continuous deployment systems.",
    },
    {
      id: "2345545",
      career: "Become a Vue Developer",
      duration: new Date(2019, 11, 15).getFullYear(),
      university: "LinkedIn Learning",
      place: "Online",
      description:
        "Basics of Vue.js, working with templates, binding classes with objects and arrays, creating transitions and animations, building routes and creating route links, loading modules, importing and looping through data, using props; methods; and events, Vue Router, and Vuex.",
    },
    {
      id: "235656536",
      career: "Become a MERN Stack JavaScript Developer",
      duration: new Date(2020, 11, 15).getFullYear(),
      university: "LinkedIn Learning",
      place: "Online",
      description:
        "React.js fundamentals, creating and rendering React elements, introducing JSX, creating a React component, managing state with hooks, using multi-state variables, fetching data, using React-Router links, Redux essentials.",
    },

    {
      id: "2337",
      career: "Effective Assessment Practices Certification",
      duration: new Date(2019, 11, 15).getFullYear(),
      university: "University of Oregon",
      place: "Eugene, Oregon, USA",
      description:
        "Up-to-date information about current methodologies associated with assessment practices in the language-learning classroom. It includes: learning outcomes, aligning instructional practices with assessments, writing good test items / informal test analysis, formative assessment, performance-based assessments, rubrics.",
    },
    {
      id: "2334",
      career: "Master of Arts in Applied Linguistics",
      duration: new Date(2020, 11, 15).getFullYear(),
      university: "Autonomous University of Santo Domingo (UASD)",
      place: "Dominican Republic",
      description:
        "Knowledge of the disciplines and subdisciplines of the field in English linguistics; familiarization with ICT for the teaching and learning of the English language. Consciousness-raising for intercultural aspects which have an impact on communication, translation, and mediation. Understanding and integration of mass and complex information coming from different sources. The ability to carry out theoretical and/or empirical research, expressing the outcome in articles, essays.  Ability to present the outcome of one’s research publicly. Attitude for teamwork, with the consequent skills, that it entails: negotiating, make oneself understood, provide and/or accept constructive criticism. Attitude for independent work, development of the initiative to organize one’s time and effort effectively.",
    },
  ];
  const fishType1 = {id:'fish3', d:"M96.806,50.581c-0.775,0.021-1.511,0.322-2.283,0.202c-0.016-0.053-0.03-0.151-0.038-0.202  c0.666-0.302,1.403-0.49,2.011-0.925c0.325-0.316,0.792-0.691,0.573-1.209c-0.242-1.068-1.218-1.729-2.06-2.307  c-1.007-0.707-2.14-1.173-3.214-1.735c-1.18-0.504-2.771-2.356-18.807-5.387c-5.913-1.133-11.902-1.648-12.152-1.836  c-5.526,0.102-11.099-6.188-12.797-6.691C47.776,30.317,47.581,31,47.452,31h0.002c-0.16,1-0.614,8.46,0.302,8.738  c-1.03,0.308-2.109,0.271-3.156,0.497c-1.72,0.33-10.451,2.965-14.923,3.992c-1.585,0.294-3.21,0.235-4.815,0.242  c-1.549-0.029-3.073-0.372-4.561-0.761c-1.817-0.518-16.438-6.635-16.537-6.133c0.038,4.065,2.203,6.819,3.75,10.432  c0.052,0.526,0.269,1.035,0.196,1.576c-0.858,2.793-4.111,5.208-4.913,8.098c0.006,0.556-0.234,1.051-0.438,1.554  c0.67,0.044,1.339,0.083,2.013,0.067c1.466-0.172,10.055-2.336,11.376-2.645c1.292-0.299,2.501-0.85,3.777-1.164  c0.725-0.173,1.377-0.548,2.104-0.669c1.443-0.188,2.901-0.367,4.359-0.225c1.016,0.104,2.027,0.203,3.029,0.42  c0.757,0.166,6.36,1.226,9.716,2.373c2.207,0.173,10.578,3.585,11.368,3.751c-1.289,2.099-1.147,3.252-1.48,5.746  c-0.216,0.879-0.254,1.888,0.359,2.614c0.278,0.264,0.731,0.277,1.044,0.069c4.525-4.812,9.603-6.665,9.82-7.348  c2.756,0.329,5.53,0.044,8.294,0.059c15.207-0.16,25.758-8.233,26.728-8.767c0.812-0.413,1.678-0.872,2.166-1.675  C97.422,51.488,97.287,50.769,96.806,50.581z M87.604,50.102c-0.896,0-1.621-0.727-1.621-1.623c0-0.896,0.725-1.623,1.621-1.623  c0.897,0,1.624,0.727,1.624,1.623C89.229,49.375,88.502,50.102,87.604,50.102z"}
  const fishType2 = {id:'fish6', d:"M99.991,30.078c0.072-0.639-0.325-1.315-1.484-2.07c-1.074-0.69-2.181-1.367-3.255-2.044  c-2.344-1.498-4.83-2.878-7.174-4.505C81.216,16.706,73.091,15,64.96,13.906c-3.333-0.43-7.063-0.248-9.856-2.305  C52.941,10,49.172,4.505,45.048,2.123C44.335,1.693,40.982,0,40.982,0s1.917,5.208,2.36,6.25c1.022,2.422-0.56,4.492-1.221,6.797  c-0.43,1.523,3.135,1.185,3.317,2.604c0.264,2.109-6.083,2.838-9.664,3.555c-5.368,1.055-11.615,3.06-16.966,1.302  C12.493,18.477,7.992,14.453,3.457,9.896c2.109,9.87,7.975,15.546,8.232,16.745c0.273,1.328-0.674,1.602-1.53,2.461  C8.271,30.963,0.026,40.455,0,43.45c2.367-0.352,5.218-2.436,7.301-3.646c2.318-1.328,11.156-7.864,13.626-8.893  c0.563-0.234,7.412-2.239,7.471-1.367c0.098,1.367-0.453,1.667-0.27,2.239c0.335,1.094,2.116,2.161,2.965,2.903  c2.21,1.914,4.704,3.581,6.266,6.107c2.188,3.528,2.289,7.33,2.907,11.263c1.458-0.17,2.946-3.19,3.75-4.388  c0.752-1.133,3.5-5.977,4.538-6.289c0.99-0.3,4.043,1.406,5.13,1.731c4.199,1.237,8.275,1.979,12.559,1.979  c5.144,0.013,18.652,0.377,28.671-7.031c1.107-0.82,3.75-3.984,3.75-3.984s-0.553-0.847-1.549-1.159  C98.442,32.044,99.874,31.133,99.991,30.078z M90.891,30.547c-1.25,0-2.266-1.016-2.266-2.266c0-1.264,1.016-2.266,2.266-2.266  c1.256,0,2.266,1.002,2.266,2.266C93.156,29.531,92.146,30.547,90.891,30.547z"}
  return (
    <>
      <main className="main light">
        <MainCard toggle={toggle} open={open} />
        <div id="description">
          {open ? (
            <div id="synthesis" className="description-in">
              <p>
                Hi, my name is Waldo Milanes. I am an enthusiastic and skilled
                professional with substantial technical expertise in designing
                and developing web applications. I know how to efficiently
                create elegant and user-friendly interfaces, setup back-end
                databases that serve different business needs, and connect these
                two ends in a way that is secured and optimized.{" "}
              </p>
              <p>
                {" "}
                Working as a manager in the educational field for several years
                has given me the experience to help small teams foster
                cooperation and motivation to deliver accurate results. I excel
                at communicating my ideas respectfully and negotiating
                differences with my colleagues.{" "}
              </p>
            </div>
          ) : null}
        </div>
      </main>
      <svg width="0" height="0">
        <defs>
          <clipPath
            id="my-shape"
            clipPathUnits="objectBoundingBox"
            transform="scale(0.00104, 0.00344)"
          >
            <path
             
              d="M0,64L120,96C240,128,480,192,720,186.7C960,181,1200,107,1320,69.3L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            

            />
          </clipPath>
          <clipPath
            id="my-shape2"
            clipPathUnits="objectBoundingBox"
            transform="scale(0.00104, 0.00344)"
          >
    
            <path 
              d="
              M0 67
              C 273,183
                822,-40
                1920.00,106 
              
              V 359 
              H 0 
              V 67
              Z"
            >
              <animate 
                repeatCount="indefinite" 
                attributeName="d" 
                dur="20s"
                attributeType="XML"
                values="
              M0 77 
              C 473,283
                822,-40
                1920,116 
              
              V 389 
              H 0 
              V 67 
              Z; 

              M0 77 
              C 373,-40
                1222,283
                1920,136 
              
              V 359 
              H 0 
              V 67 
              Z; 

              M0 77 
              C 973,260
                1722,-53
                1920,120 
              
              V 459 
              H 0 
              V 67 
              Z; 

              M0 77 
              C 573,283
                822,-40
                1920,116 
              
              V 359 
              H 0 
              V 67 
              Z
              "
              />
            </path>
    
          </clipPath>
        </defs>
      </svg>

      <article className="light">
        <div id="my-work">
          <Link to="/portfolio">
            <button type="button" className="my-work-btn">
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
        <div id="credentials">
          <div className="education-title">
            <h1 className="title-font primary--text title-2 ">Education</h1>

          </div>
          {educationPoints.map((item) => (
            <div key={item.id} className="certificate  ">
              <div className='date-place '> 
                <h5> 
                  {item.duration}
                </h5>
                <h5>
                  {item.place}
                </h5>
              </div>
              <div className="institution-description shadow ">
                <h2>{item.career}</h2>
                <h4>{item.university}</h4>
                <p> {item.description} </p>
              </div>
             
            </div>
          ))}
        </div>
        <div className="aside-img" />
      </aside>
    </>
  );
};

const MainCard = ({ toggle, open }) => {
  useEffect(() => {
    document.title = "Waldo Milanes' professional profile";
    const wmImg = document.querySelector(".wm-img");
    const description = document.querySelector("#description");
    const myWork = document.querySelector("#my-work");
    const education = document.querySelector("#education");

    const descriptionObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting && document.body.clientWidth >= 900) {
            wmImg.classList.add("img-scrolled-1");
          } else {
            wmImg.classList.remove("img-scrolled-1");
          }
        }),
      document.body.clientWidth < 1500
        ? { rootMargin: "0px" }
        : { rootMargin: "-150px" }
    );

    const descriptionObserver2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0 && !open) toggle({ open: true });
          if (entry.isIntersecting) {
            wmImg.classList.add("img-out");
          } else {
            wmImg.classList.remove("img-out");
          }
        });
      },
      document.body.clientWidth < 1500
        ? { rootMargin: "-150px" }
        : { rootMargin: "-250px" }
    );

    const myWorkObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) =>
        entry.isIntersecting
          ? myWork.classList.add("my-work-scrolled")
          : myWork.classList.remove("my-work-scrolled")
      );
    });

    const educObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) =>
        entry.isIntersecting
          ? education.classList.add("edu-scrolled")
          : education.classList.remove("edu-scrolled")
      );
    });
    descriptionObserver.observe(description);
    descriptionObserver2.observe(description);
    myWorkObserver.observe(myWork);
    educObserver.observe(education);
  }, [toggle, open]);

  return (
    <>
      <div className="wm-img shadow" />
      <div className="home-banner">
        <div className="title-wrapper">
          <div className="qualities">
            <h4>A Pragmatic </h4>
            <h4>&nbsp;&amp;&nbsp;</h4>
            <h4>Dedicated</h4>
          </div>
          <small className="job-title">Web Developer</small>
        </div>
      </div>
    </>
  );
};
MainCard.propTypes = {
  toggle: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  open: PropTypes.any.isRequired,
};
export default Home;
