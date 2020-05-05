import React, { useState } from "react";
import { SearchBar } from "antd-mobile";
import { request } from "../utils/axios";
import Css from "./index.module.scss";
const Search = (props) => {
  const [searchList, setSearchList] = useState([]);
  // 获取提示地区name
  const writeInpValue = async (e) => {
    const { id } = props.match.params;
    const { body } = (
      await request.get(`/area/community?id=${id}&name=${e}`)
    ).data;
    const searchList = body.map((v) => ({
      community: v.community,
      communityName: v.communityName,
    }));
    setSearchList(searchList);
  };
  return (
    <div>
      <div className={Css.inputBar}>
        <SearchBar placeholder="请输入小区或地址" onChange={writeInpValue} />
      </div>
      <div className={Css.search_list}>
        {searchList.map((v) => (
          <div
            className={Css.item}
            key={v.community}
            onClick={() => props.history.goBack()}
          >
            {v.communityName}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Search;
