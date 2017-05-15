import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TopRoutes from "./TopRoutes";
import RouteSearch from "./RouteSearch";
import './index.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

ReactDOM.render((
     <Router>
         <div>
             <App>
                <Route exact path="/" component={TopRoutes}/>
                <Route path="/route/:routeid" component={RouteSearch}/>
             </App>
         </div>
     </Router>
     ),
     document.getElementById('root')
);
