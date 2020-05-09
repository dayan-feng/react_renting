import React, { Component, lazy, Suspense } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { connect } from "react-redux";
import { actionInitCity } from "./store/actionCreator";
// import Details from "./details";
const Home = lazy(() => import("./home"));
const Details = lazy(() => import("./details"));
const MapFound = lazy(() => import("./mapFound"));
const CitySelect = lazy(() => import("./citySelect"));
const Login = lazy(() => import("./login"));
const Send = lazy(() => import("./send"));
const Dome = lazy(() => import("./dome"));
const Search = lazy(() => import("./search"));
const RentOut = lazy(() => import("./rentOut"));
class App extends Component {
  componentDidMount() {
    this.props.handleInitCity();
  }
  render() {
    return (
      this.props.city && (
        <div>
          <Router>
            <Switch>
              <Suspense fallback={<div>Loading...</div>}>
                <Route exact path="/">
                  <Redirect to="/home"></Redirect>
                </Route>
                <Route path="/dome" component={Dome}></Route>
                <Route path="/home" component={Home}></Route>
                <Route path="/citySelect" component={CitySelect}></Route>
                <Route path="/mapFound" component={MapFound}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/details" component={Details}></Route>
                <Route path="/Send" component={Send}></Route>
                <Route path="/Search/:id" component={Search}></Route>
                <Route path="/RentOut" component={RentOut}></Route>
              </Suspense>
            </Switch>
          </Router>
        </div>
      )
    );
  }
}
const mapStateToProps = (state) => ({
  city: state.cityReducer.city,
});
const mapDispatchToProps = (dispatch) => {
  return {
    handleInitCity() {
      dispatch(actionInitCity());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
