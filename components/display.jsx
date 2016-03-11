var display = {
  numDisplay: function(countNum){
    var countStr = (countNum).toString();
    while (countStr.length < 3){
      if (countNum >= 0) { countStr = "0" + countStr;}
    }

    return countStr;
  }
}


module.exports = display;
