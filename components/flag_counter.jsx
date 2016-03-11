var React = require('react'),
    display = require('./display');


var FlagCounter = React.createClass({
  mixins: [display],

  render: function(){
    return (<section className="timer">{ this.numDisplay(this.props.flagCount) }</section>);
  }
})

module.exports = FlagCounter;
