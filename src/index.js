import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import './components/Notifications.css'
import {ThemeProvider} from './styles/StyleProvider.js'



const style = document.createElement('style')
let css = 'body{background-color:  '+ThemeProvider.getDefaultColor().backgroundColor+'  }'
style.innerText = css
document.head.appendChild(style);


ReactDOM.render(<App />, document.getElementById("root"));