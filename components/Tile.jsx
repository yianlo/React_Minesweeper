var React = require('react'),
    Minesweeper = require('../minesweeper');

var Tile = React.createClass({

  getTileState: function(){
    var tileState = {klass: "tile unclicked", text: ""};

    if (this.props.tile.flagged) {
      tileState.klass += " flagged";
      tileState.text = "\u2691";
    } else if ( this.props.tile.explored ){
      tileState.klass = "tile explored";

      if (this.props.tile.bombed) {
        tileState.text = "\u2735";
        if (this.props.tile.clicked) {
          tileState.klass += " clickedBomb";
        }
      } else {
        tileState = this.getBombCount(tileState);
      }
    }

    return tileState;
  },

  getBombCount: function(tileState){
    var NUMS = ["one", "two", "three", "four", "five"]
    var bombCount = this.props.tile.adjacentBombCount();

    if (bombCount > 0 ){
      tileState.text = bombCount;
      tileState.klass = tileState.klass + " number " + NUMS[bombCount - 1];
    }

    return tileState;
  },

  handleClick: function(e){
    e.preventDefault();
    document.oncontextmenu = function(){ return false; }

    var flagging = e.altKey || e.nativeEvent.which === 3;
    this.props.updateGame(this.props.tile, flagging);
  },

  render: function(){
    return (
      <div
        className={this.getTileState().klass}
        onMouseDown={this.handleClick}>
          {this.getTileState().text}
      </div>
    );
  }
});

module.exports = Tile;
