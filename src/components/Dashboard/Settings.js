import React, { useState } from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faLanguage } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
 

const Settings = () => {
    const [selectedOption,setSelect] = useState(null);
    const languages = [
        { value: "EN", label:"EN"},
        { value: "ES", label:"ES" },
        { value: "FR", label:"FR" }
    ];
   const handleChange = (selection) => {
        setSelect({ selection });
        console.log(`Option selected:`, selectedOption);
      };
    return (
      <>
        <div className='dashboard light'>
          <div className='dash-title-wrapper bold flex-row'>

            <div id='title-img' />
            <div className='dash-title'> Settings</div>

          </div>
          <div className='dashboard-content'>

            <div className='dash-action flex-row-justified-aligned-c dash-animation'>
              <div className=" dash-icon">
                <FontAwesomeIcon
                  icon={faMoon}
                />
              </div>
              <h1 className='dash-action-text primary--text Lato'>Dark mode &nbsp;</h1>
              <div className="toggleWrapper">
                <label htmlFor="toggle1" className="form-switch">
                  <input type="checkbox" name="toggle1" className="mobileToggle" id="toggle1" />
                  <i />
                </label>
              </div>
            </div>

            <div className='dash-action flex-row-justified-aligned-c dash-animation'>
              <div className=" dash-icon">
                <FontAwesomeIcon
                  icon={faLanguage}
                />
              </div>
              {/* <h1 className='dash-action-text primary--text Lato'>Languages &nbsp;</h1> */}
              <div style={{width: '100px'}}>
                <Select
                  onChange={handleChange}
                  options={languages}
                />
                {/* <select
                  id="selectbox"
                  data-selected=""
                  className="translator btn"
                >
                  {languages.map((lang) =>  (
                    <option
                      className="primary"
                      key={lang.title}
                      value={lang.title}
                    >
                      {lang.title}
                    </option>
)
                 )}
                </select> */}
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default Settings