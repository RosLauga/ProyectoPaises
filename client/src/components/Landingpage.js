import React from 'react';
import { Link } from 'react-router-dom';
import './landingpage.css';
// import { connect } from "react-redux";


// import { Route, Switch, HashRouter as Router} from "react-router-dom";
// import { render } from "react-dom";


function LandingPage() {
return (
    <section>
        <div className="Container">
          <div className="introlanding">
            <h1>Bienvenido</h1>
            <p>Para navegar por los paises, por favor usar la brujula</p>
            <div className="Container">
            <Link to="/countries"><div className="buttonhome"></div></Link>
            </div>  
          </div>
        </div> 
    </section>
    );
  }
  
  export default LandingPage;