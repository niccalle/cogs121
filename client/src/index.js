import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Landing from "./Landing"
import './index.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'

ReactDOM.render((
     <Router>
         <div>
             <Route exact path="/" component={Landing}/>
             <Route path="/home" component={App}/>
         </div>
     </Router>
     ),
     document.getElementById('root')
);
