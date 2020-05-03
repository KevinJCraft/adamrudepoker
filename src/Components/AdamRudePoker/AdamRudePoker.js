import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MenuContext } from "../../Context/MenuContext";

import "./AdamRudePoker.css";

import Home from "../Home";
import ContactMe from "../ContactMe";
import Footer from "../Footer";
import HeroSection from "../HeroSection/HeroSection";
import OddsCalculator from "../OddsCalculator";
import NoPath from "../NoPath";
import Vlogs from "../Vlogs";
import Nav from "../Nav";
import MenuButton from "../MenuButton";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const AdamRudePoker = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="vertical-containter">
      <Router>
        <MenuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
          <Nav />
          <MenuButton />
          <HeroSection />
          <Container style={{ flex: 1 }} className="">
            {" "}
            {/* flex is for sticky footer */}
            <Row>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route
                  path="/oddscalculator"
                  exact
                  component={OddsCalculator}
                />
                <Route path="/Vlogs" component={Vlogs} />
                <Route path="*" component={NoPath} />
              </Switch>
            </Row>
            <Row>
              <ContactMe />
            </Row>
          </Container>
          <Footer />
        </MenuContext.Provider>
      </Router>
    </div>
  );
};

export default AdamRudePoker;
