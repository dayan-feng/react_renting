export const getLocationCity = () => {
  return new Promise((resolve, reject) => {
    const myCity = new window.BMap.LocalCity();
    myCity.get(resolve);
  });
};
