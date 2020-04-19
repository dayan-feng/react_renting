import React from "react";
import { HashRouter as Router, NavLink, Link, Route } from "react-router-dom";
import "./index.scss";
import CitySelect from "../citySelect";
class Found extends React.Component {
  render() {
    return (
      <div>
        <div>1122334455</div>
        <Link to="/home/found">123</Link>
        <div></div>
        <Route path="/home/found" component={Asd}></Route>
        <div></div>
      </div>
    );
  }
}
const We = () => <div>大幅度</div>;
const Asd = () => (
  <div>
    <Link to="/home/found/1">1</Link>
    <Link to="/home/found/2">2</Link>
    <div></div>
    <Route path="/home/found/:id" component={ff}></Route>
  </div>
);
const ff = () => <div>对方答复的</div>;
export default Found;
