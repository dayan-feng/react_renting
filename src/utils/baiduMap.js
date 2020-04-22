export const getLocationCity = () => {
  return new Promise((resolve, reject) => {
    const myCity = new window.BMap.LocalCity();
    myCity.get(resolve);
  });
};
// export const getCityPoint = (city) => {
//   var myGeo = new window.BMap.Geocoder();
//   // 将地址解析结果显示在地图上,并调整地图视野
//   return new Promise((resolve, reject) => {
//     myGeo.getPoint(
//       city,
//       (point) => {
//         resolve(point);
//       },
//       city
//     );
//   });
// };
