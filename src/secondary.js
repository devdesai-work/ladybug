import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Work, Issue, ProjectShow, Roadmap, Teams, Notifications } from "./components";

const Secondary = () => {
    return (
        <>
        <Router>
        <Navigation />
        <Switch >
          <Route path="/roadmap" exact component={() => <Roadmap />} />
          <Route path="/issue" exact component={() => <Issue />} />
          <Route path='/notifications' exact component={() => <Notifications />} />
          <Route path="/your_work" exact component={() => <Work />} />
          <Route path='/project' exact component={() => <ProjectShow />} />
          <Route path='/teams' exact component={() => <Teams />} />
        </Switch>
        {/* <Footer /> */}
      </Router>
      </>
    );
}
 export default Secondary;