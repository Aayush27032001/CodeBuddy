module.exports = function (arr) {
  return arr.reduce((accu, e) => {
    return accu + e;
  }, 0);
};
