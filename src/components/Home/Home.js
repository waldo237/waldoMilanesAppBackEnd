import React, { useEffect } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import Tecnologies from './Technologies';
import {FishFlock, FishFlock2} from "./FishFlock";
import Education from "./Education";
import HeroArea from "./HeroArea";
// import Banner from "../Banner/Banner";
import MoreAboutMe from "./MoreAboutMe";

const Home = () => {
  useEffect(() => {
    document.title = "Waldo Milanes' professional profile";
  });
  // const [open, toggle] = useState(false);

  return (
    <>
      <main className="hero-area-wrapper light">
        <div className='elipsis-shape' />
        <HeroArea  />
      </main>
      {/* <Banner  /> */}
      <MoreAboutMe />
      <article className="light">
        <div id="my-work-container">
          <Link to="/portfolio">
            <button type="button" className="my-work-btn light--text">
              my work
            </button>
          </Link>
        
          <Tecnologies />
         
          <div className='fish-animation'>
            <FishFlock  />
            <FishFlock2 />

          </div>
        </div>
      </article>
      <aside id="education">
        <Education />
      </aside>
    </>
  );
};



export default Home;
