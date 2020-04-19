import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./home";
import CitySelect from "./citySelect";
import MapFound from "./mapFound";
import { connect } from "react-redux";
import { actionInitCity } from "./store/actionCreator";
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
              <Route exact path="/">
                <Redirect to="/home"></Redirect>
              </Route>
              <Route path="/home" component={Home}></Route>
              <Route path="/citySelect" component={CitySelect}></Route>
              <Route path="/mapFound" component={MapFound}></Route>
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
