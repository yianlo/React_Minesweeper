var React = require('react'),
    Minesweeper = require('../minesweeper'),
    Board = require('./Board'),
    FlagCounter = require('./flag_counter'),
    Timer = require('./Timer'),
    ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Game = React.createClass({

  getInitialState: function(){
    return {
      new: true,
      flagCount: this.props.initBombCount,
      board: new Minesweeper.Board(20, this.props.initBombCount),
      buttonFace: "\uD83D\uDE38",
      running: false
    };
  },

  updateFlagCount: function(tile){
    if (tile.flagged) {
      this.setState( { flagCount: this.state.flagCount - 1 } );
    } else {
      this.setState( { flagCount: this.state.flagCount + 1 } );
    }
  },

  checkGameOver: function(){
    if (this.gameOver()) {
      this.setEndGameStates()
    } else {
      this.changeFace();
    }
  },

  gameOver: function(){
    return (this.state.board.lost() || this.state.board.won() || this.state.seconds === 999)
  },

  setEndGameStates: function(){
    this.setState({running: false});

    if (this.state.board.won()) {
      this.setState({
        flagCount: 0,
        buttonFace: "\uD83D\uDE3B"
      });
    } else if (this.state.board.lost()) {
      this.setState( { buttonFace: "\uD83D\uDE40" } );
    }
  },

  updateGame: function(tile, flagging){
    if (this.state.new) { this.setState({running: true, new: false }); }

    if (flagging){
      tile.toggleFlag();
      this.updateFlagCount(tile);
    } else {
      tile.toggleClick();
      tile.bombed ? this.state.board.exposeBombs() : tile.explore();
    }

    this.checkGameOver();
    this.setState( { board: this.state.board } );
  },

  changeFace: function(){
    this.setState({buttonFace: "\uD83D\uDE39"});

    setTimeout(function(){this.setState({buttonFace: "\uD83D\uDE38"});}.bind(this), 80);
  },

  resetGame: function(){
    this.setState({
      new: true,
      flagCount: this.props.initBombCount,
      board: new Minesweeper.Board(20, this.props.initBombCount),
      buttonFace: "\uD83D\uDE38",
      running: false,
    })
  },

  render: function(){
    return (
      <div className="game">
        <nav >
          <FlagCounter flagCount={this.state.flagCount}/>
          <div className="reset-button" onClick={this.resetGame}>{this.state.buttonFace}</div>
          <Timer running={this.state.running} new={this.state.new}/>
        </nav>

        <Board
          boardState={this.state.board}
          updateGame={this.updateGame}/>
      </div>
    );
  }
});


module.exports = Game;
