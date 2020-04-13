import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./AdamRudePoker.css";
import Home from "../Home";
import OddsCalculator from "../OddsCalculator";
import ContactMe from "../ContactMe";
import Vlogs from "../Vlogs";
import Nav from "../Nav";
import Footer from "../Footer";
import Container from "react-bootstrap/Container";

import { MenuContext } from "../../Context/MenuContext";

const AdamRudePoker = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="vertical-containter">
      <Router>
        <MenuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
          <Nav />
          <Container style={{ flex: 1 }}>
            <div className="AR-main-content">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route
                  path="/oddscalculator"
                  exact
                  component={OddsCalculator}
                />
                <Route path="/Vlogs" exact component={Vlogs} />
                <Route path="/ContactMe" exact component={ContactMe} />
              </Switch>
            </div>
          </Container>
          <Footer />
        </MenuContext.Provider>
      </Router>
    </div>
  );
};

export default AdamRudePoker;
