import React, { useEffect, useContext } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import Tecnologies from './Technologies';
import {FishFlock, FishFlock2} from "./FishFlock";
import Education from "./Education";
import HeroArea from "./HeroArea";
import MoreAboutMe from "./MoreAboutMe";
import { Context } from "../../store/store";

const Home = () => {
 const [state]= useContext(Context);
 const {Trans} = state;
  useEffect(() => {
    document.title = "Waldo Milanes' professional profile";
  });
  return (
    <>
      <main className="hero-area-wrapper light">
        <div className='elipsis-shape' />
        <HeroArea  />
      </main>
      <MoreAboutMe />
      <article className="light">
        <div id="my-work-container">
          <Link to="/portfolio">
            <button type="button" className="my-work-btn light--text">
              <Trans i18nKey="home.myWorkBtn">my work</Trans>
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
