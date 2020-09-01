import React, { createContext, useReducer } from "react";
import PropTypes from 'prop-types'
import Reducer from './Reducer'
const initialLang = localStorage.getItem('language');
const initialState = {
    posts: ['newpost'],
    isLoggedIn:false,
    profile: {},
    error: null,
    darkTheme: false,
    language: (initialLang)?initialLang: 'EN'
};

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
      <Context.Provider value={[state, dispatch]}>
        {children}
      </Context.Provider>
    )
};
Store.propTypes= {
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ]).isRequired
}
export const Context = createContext(initialState);
export default Store;
