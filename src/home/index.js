import React, { Component } from "react";
import { TabBar } from "antd-mobile";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import My from "../my";
import Index from "../index/index";
import Found from "../found";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "redTab",
    };
  }
  renderContent(pageText) {
    return <div></div>;
  }
  render() {
    return (
      <div style={{ position: "fixed", height: "100%", width: "100%", top: 0 }}>
        <Route to="/home">
          <Redirect to="/home/index"></Redirect>
        </Route>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
        >
          <TabBar.Item
            title="首页"
            key="Index"
            icon={<i className="iconfont icon-ind" />}
            selectedIcon={<i className="iconfont icon-ind" />}
            selected={this.props.location.pathname === "/home/index"}
            onPress={() => {
              this.props.history.push("/home/index");
            }}
            data-seed="logId"
          >
            <Route path="/home/index" component={Index}></Route>
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-findHouse" />}
            selectedIcon={<i className="iconfont icon-findHouse" />}
            title="找房"
            key="Found"
            selected={this.props.location.pathname === "/home/found"}
            onPress={() => {
              this.props.history.push("/home/found");
            }}
            data-seed="logId1"
          >
            <Route path="/home/found" component={Found}></Route>
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-my" />}
            selectedIcon={<i className="iconfont icon-my" />}
            title="我的"
            key="My"
            selected={this.props.location.pathname === "/home/my"}
            onPress={() => {
              this.props.history.push("/home/my");
            }}
          >
            <Route path="/home/my" component={My}></Route>
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
export default Home;
