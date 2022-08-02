module.exports = function(arr) {
  while (true) {
    console.log("hi");
  }
  return arr.reduce((accu,e)=>{
    return accu+e
  },0);
}