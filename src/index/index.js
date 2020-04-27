import React from "react";
import { Carousel, WhiteSpace } from "antd-mobile";
import { request, baseURL } from "../utils/axios";
import "./index.scss";
import nav1 from "../assets/images/nav-1.png";
import nav2 from "../assets/images/nav-2.png";
import nav3 from "../assets/images/nav-3.png";
import nav4 from "../assets/images/nav-4.png";
import IndexSearch from "../components/IndexSearch";
class Index extends React.Component {
  state = {
    carouselList: [],
    imgHeight: 190,
    navList: [
      { id: 1, img: nav1, text: "整租" },
      { id: 2, img: nav2, text: "合租" },
      { id: 3, img: nav3, text: "地图找房" },
      { id: 4, img: nav4, text: "去出租" },
    ],
    groupsList: [],
    newsList: [],
  };
  componentDidMount() {
    this.getCarouselList();
    this.getGroupsList();
    this.getNewsList();
  }
  // 获取轮播图数据
  getCarouselList = () => {
    request.get("/home/swiper").then((res) => {
      this.setState({
        carouselList: res.data.body,
      });
    });
  };
  // 获取租房小组数据
  getGroupsList = () => {
    request.get("/home/groups").then((res) => {
      this.setState({
        groupsList: res.data.body,
      });
    });
  };
  // 获取最新资讯数据
  getNewsList = () => {
    request.get("/home/news").then((res) => {
      this.setState({
        newsList: res.data.body,
      });
    });
  };
  render() {
    const { carouselList, navList, groupsList, newsList } = this.state;
    return (
      <div className="index">
        <div className="index_search">
          <IndexSearch></IndexSearch>
        </div>
        {/* 1.首页轮播图开始 */}
        {carouselList.length !== 0 && (
          <Carousel autoplay infinite style={{ background: "#fff" }}>
            {carouselList.map((val) => (
              <a
                key={val.id}
                href="#"
                style={{
                  display: "inline-block",
                  width: "100%",
                  height: this.state.imgHeight,
                }}
              >
                <img
                  src={baseURL + val.imgSrc}
                  alt=""
                  style={{
                    width: "100%",
                    verticalAlign: "top",
                  }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event("resize"));
                    this.setState({ imgHeight: "auto" });
                  }}
                />
              </a>
            ))}
          </Carousel>
        )}
        {/* 1.首页轮播图结束 */}
        {/* 2.首页nav开始 */}
        <div className="index_nav">
          {navList.map((v) => (
            <div className="index_nav_item" key={v.id}>
              <img src={v.img} alt="" />
              <p>{v.text}</p>
            </div>
          ))}
        </div>
        {/* 2.首页nav结束 */}
        {/* 3.租房小组开始 */}
        <div className="index_groups">
          <div className="groups_title">
            <span>租房小组</span>
            <span>更多</span>
          </div>
          <div className="groups_main">
            {groupsList.map((v) => (
              <div className="groups_item" key={v.id}>
                <div className="groups_item_left">
                  <span className="groups_item_left_title">{v.title}</span>
                  <span className="groups_item_left_desc">{v.desc}</span>
                </div>
                <div className="groups_item_right">
                  <img src={baseURL + v.imgSrc} alt="" />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* 3.租房小组结束 */}
        {/* 4.首页最新资讯开始 */}
        <div className="index_news">
          <div className="news_title">最新资讯</div>
          {newsList.map((v) => (
            <div className="news_item" key={v.id}>
              <div className="news_item_left">
                <img src={baseURL + v.imgSrc} alt="" />
              </div>
              <div className="news_item_right">
                <div className="news_item_right_title">{v.title}</div>
                <div className="news_item_right_info">
                  <span>{v.from}</span>
                  <span>{v.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* 4.首页最新资讯结束 */}
      </div>
    );
  }
}
export default Index;
