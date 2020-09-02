import React from "react";
import "./Banner.css";
import img from "../../static/banner.png";

const Banner = () => (
  <>
    <article className="title primary shadow">
      <div>
        <img src={img} alt="WM robot" className="mw-robot" />
      </div>
      <h1 className="secondary--text double-w">W</h1>
      <h3 className="programming">PROGRAMMING</h3>
    </article>
  </>
);

export default Banner;
 