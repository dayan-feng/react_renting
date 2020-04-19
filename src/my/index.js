import React, { Component } from "react";
import { HashRouter as Router, Link, Route } from "react-router-dom";
class My extends Component {
  render() {
    return (
      <div>
        <Link to="/home/my/1">1234567</Link>
        <Route path="/home/my/1"></Route>
      </div>
    );
  }
}
const we = () => <div></div>;
const po = () => <div>12345</div>;
export default My;
