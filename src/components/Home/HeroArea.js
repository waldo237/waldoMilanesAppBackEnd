import React from "react";
import {useTranslation } from 'react-i18next'
import { DBShape, SecurityShape, ServerShape, StackShape, CodeShape } from './Shapes'

const HeroArea = () => {
  const {t} =useTranslation();
  return (
    <>
     
      <div id="hero-title-wrapper" className='primary--text fadeInUpx'>
        <h2 id="pragmatic-dedicated">{t("home.aPracmatic")}</h2>
        <h1 id="web-developer">{t('home.developer')}</h1>
        <p id='introduction-paragraph'>
          {t('home.introductionParagraph')}
        </p>
        <a href="#more-about-me-container">
          <button id='hear-more-btn' type="button" className="my-work-btn my-work-btn-wide primary--text">
          {t('home.hearMore')}
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