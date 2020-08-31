import React, { useState, useContext, useEffect } from 'react';
import './Dashboard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faLanguage } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { Context } from '../../store/store';


const Settings = () => {
  const [selectedOption, setSelect] = useState(null);
  const [state, dispatch] = useContext(Context);
  const languages = [
    { value: "EN", label: "EN" },
    { value: "ES", label: "ES" },
    { value: "FR", label: "FR" }
  ];
  useEffect(() => {
    if (state.darkTheme) {
      const darkThemeSwich = document.getElementById('dark-theme');
      darkThemeSwich.setAttribute('checked', state.darkTheme);
    }
  }, [state.darkTheme])
  const handleChange = (selection) => {
    setSelect({ selection });
    console.log(`Option selected:`, selectedOption);
  };
  const inputHandler = (event) => {
    localStorage.setItem('darkTheme', event.target.checked);
    dispatch({ type: 'DARK_THEME', payload: event.target.checked });
  };
  return (
    <>
      <div id='settings-container' className='dash-wrapper'>
        <div className='settings light'>
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
                <label htmlFor="dark-theme" className="form-switch">
                  <input onClick={inputHandler} type="checkbox" name="dark-theme" className="mobileToggle" id="dark-theme" />
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
              <div style={{ width: '100px' }}>
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

      </div>
    </>
  )
}

export default Settings