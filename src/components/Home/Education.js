import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye} from '@fortawesome/free-solid-svg-icons'
import lmo from "../../static/certificates/lmo.pdf";
import softDev from "../../static/certificates/softwareDev.pdf";
import java from "../../static/certificates/java.pdf";
import SQL from "../../static/certificates/SQL.pdf";
import webDev from "../../static/certificates/webDev.pdf";
import node from "../../static/certificates/node.pdf";
import vue from "../../static/certificates/vue.pdf";
import MERN from "../../static/certificates/MERN.pdf";
import oregon from "../../static/certificates/oregon.pdf";
import ma from "../../static/certificates/ma.pdf";

const educationPoints = [
    {
      id: "2331",
      career: "Bachelors of Arts in Modern Languages",
      duration: new Date(2011, 11, 15).getFullYear(),
      university: "Santiago University of Technology (UTESA)",
      place: "Dominican Republic",
      url: lmo,
      description:
        "The ability to communicate clearly in two foreign languages (English and French), both verbally and in writing; professional communication, spoken and written; sensitivity to different cultural contexts; the ability to work independently; general research skills; self-reflection and critical judgment; self-management, including planning and meeting deadlines; analyzing written and visual sources; adaptability and flexibility.",
    },
    {
      id: "2332",
      career: "Computer Programming",
      duration: new Date(2017, 11, 15).getFullYear(),
      university: "Technological Institute of the Americas (ITLA)",
      place: "Dominican Republic",
      url: softDev,
      description:
        "The fundamentals of programming; algorithms and data structures; software testing and debugging; a solid foundation of object-oriented software development; design patterns, the essentials of networking; design and management of relational databases; project requirements gathering and prototyping.",
    },
    {
      id: "232336",
      career: "Intermediate Java Programming",
      duration: new Date(2018, 11, 15).getFullYear(),
      university: "Technological Institute of the Americas (ITLA)",
      place: "Dominican Republic",
      url: java,
      description:
        "Basic concepts, logic and syntax of the Java programming language, event-driven programming, sequential and associative data structures, classic data structures, sorting and searching, exception handling, database programming with JDBC, networking programming, GUI development using Swing, multithreading, Java Applets, web applications (Servlets), advanced I/O classes, regular expressions, Java graphics, introduction to Spring using Spring Boot.",
    },
    {
      id: "2335",
      career: "Database Design and SQL",
      duration: new Date(2018, 11, 15).getFullYear(),
      university: "Technological Institute of the Americas (ITLA)",
      place: "Dominican Republic",
      url: SQL,
      description:
        "The foundation of database programming: planning a database, relational databases, records, data types, adding validation rules, normalization and denormalization, referential integrity, ACID transactions, SQL queries, CRUD operations, sorting results, and joining tables.",
    },
    {
      id: "2332326",
      career: "Become a web developer & JavaScript",
      duration: new Date(2018, 11, 15).getFullYear(),
      university: "LinkedIn Learning",
      place: "Online",
      url: webDev,
      description:
        "The basics of HTML, CSS fundamental concepts; CSS box model, Flexbox and Grid. JavaScript core principles like variables, data types, conditionals, loops, and DOM scripting; higher-order functions, IIFE functions, scopes, and closure; partial application and recursion; prototypes and classes; callbacks and promises, JS module system. Version control software; the use of Git.",
    },
    {
      id: "2323236",
      career: "Become a NodeJs Developer",
      duration: new Date(2019, 11, 15).getFullYear(),
      university: "LinkedIn Learning",
      place: "Online",
      url: node,
      description:
        "The global object, Importing the core modules, creating custom events with the EventEmitter, reading; writing; and removing files, working with file streams, creating child processes with the exec and spawn functions, managing third-party packages with npm, REST APIs, Node.js frameworks, creating a basic Express.js application, managing data to MongoDB with Mongoose, error handling and debugging, consulting OWASP resources and handling security threats, adding two-factor and read-only tokens, encrypting user data and session management, adding HTTPS protocol to an application, using cookie attributes, continuous deployment systems.",
    },
    {
      id: "2345545",
      career: "Become a Vue Developer",
      duration: new Date(2019, 11, 15).getFullYear(),
      university: "LinkedIn Learning",
      place: "Online",
      url:vue,
      description:
        "Basics of Vue.js, working with templates, binding classes with objects and arrays, creating transitions and animations, building routes and creating route links, loading modules, importing and looping through data, using props; methods; and events, Vue Router, and Vuex.",
    },
    {
      id: "235656536",
      career: "Become a MERN Stack JavaScript Developer",
      duration: new Date(2020, 11, 15).getFullYear(),
      university: "LinkedIn Learning",
      place: "Online",
      url: MERN,
      description:
        "React.js fundamentals, creating and rendering React elements, introducing JSX, creating a React component, managing state with hooks, using multi-state variables, fetching data, using React-Router links, Redux essentials.",
    },

    {
      id: "2337",
      career: "Effective Assessment Practices Certification",
      duration: new Date(2019, 11, 15).getFullYear(),
      university: "University of Oregon",
      place: "Eugene, Oregon, USA",
      url: oregon,
      description:
        "Up-to-date information about current methodologies associated with assessment practices in the language-learning classroom. It includes: learning outcomes, aligning instructional practices with assessments, writing good test items / informal test analysis, formative assessment, performance-based assessments, rubrics.",
    },
    {
      id: "2334",
      career: "Master of Arts in Applied Linguistics",
      duration: new Date(2020, 11, 15).getFullYear(),
      university: "Autonomous University of Santo Domingo (UASD)",
      place: "Dominican Republic",
      url:ma,
      description:
        "Knowledge of the disciplines and subdisciplines of the field in English linguistics; familiarization with ICT for the teaching and learning of the English language. Consciousness-raising for intercultural aspects which have an impact on communication, translation, and mediation. Understanding and integration of mass and complex information coming from different sources. The ability to carry out theoretical and/or empirical research, expressing the outcome in articles, essays.  Ability to present the outcome of one’s research publicly. Attitude for teamwork, with the consequent skills, that it entails: negotiating, make oneself understood, provide and/or accept constructive criticism. Attitude for independent work, development of the initiative to organize one’s time and effort effectively.",
    },
  ];

  const Education = () =>{
      return (
        <>
          <div id="education-container">
            <div className="education-title">
              <h1 className=" primary--text ">Education</h1>

            </div>
            {educationPoints.map((item) => (
              <div key={item.id} className="education-card lazy-effect">
                <div className='education-date-and-place'> 
                  <h5> 
                    {item.duration}
                  </h5>
                  <h5>
                    {item.place}
                  </h5>
                </div>
                <div className="education-description-card shadow hoverable-card">
                  <h4>{item.university}</h4> 
                  <div className='education-institution'>
                    <h2>{item.career}  &nbsp;</h2>
                  </div>  
                  <p> {item.description} </p>
                  <div>
                    <a href={item.url} target='_blank' rel="noopener noreferrer">

                      <button type='button' className="brown diploma-btn"><FontAwesomeIcon icon={faEye} /> &nbsp;view credentials</button>
                    </a>
                  </div>
                </div>
             
              </div>
          ))}
          </div>
        </>
      )
  }

  export default Education