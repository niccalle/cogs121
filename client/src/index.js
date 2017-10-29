import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TopRoutes from "./TopRoutes";
import RouteSearch from "./RouteSearch";
import SavedRoutes from "./SavedRoutes";
import LandingPage from "./LandingPage";
import './index.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

ReactDOM.render((
     <Router>
         <div>
             <App>
                <Route exact path="/" component={TopRoutes}/>
                <Route path="/toproutes" component={TopRoutes}/>
                <Route path="/route/:routeid" component={RouteSearch}/>
                <Route path="/saved" component={SavedRoutes}/>
             </App>
         </div>
     </Router>
     ),
     document.getElementById('root')
);
