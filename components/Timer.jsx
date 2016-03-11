var React = require('react'),
    display = require('./display');

var Timer = React.createClass({
  mixins: [display],

  getInitialState: function(){
    return {seconds: 0}
  },

  componentDidMount: function () {
    setInterval(this.tick, 1000);
  },

  tick: function(){
    if (this.props.running){
      this.setState({seconds: this.state.seconds + 1});
    }
  },

  render: function(){
    var secToDisplay = this.props.new ? 0 : this.state.seconds;
    return (<section className="timer">{ this.numDisplay(secToDisplay) }</section>);
  }
})


module.exports = Timer;
