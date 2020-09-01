import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";
import Store from './store/store'
import './i18n';
import Loading from "./components/Loading/Loading";

ReactDOM.render(
  <React.StrictMode>
    <Store>
      <Suspense fallback={<Loading />}>
        <App /> 

      </Suspense>
    </Store>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
