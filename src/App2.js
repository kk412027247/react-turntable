import React from 'react';
import Transition from 'react-transition-group/Transition';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
  exiting: {opacity: 1},
  exited: {opacity: 0}
};

const Fade = ({ inProp,number }) =>(
  <Transition in={inProp} timeout={300} number={number}>
    {(state) => (
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
        I'm a fade Transition! {number}
      </div>
    )}
  </Transition>
);

const delay = ms => new Promise(r=>setTimeout(r,ms));

export  default class App2 extends React.Component{
  state= {
    in: true ,
    number:0,
  };

  toggleEnterState = () => {
    this.setState({ in: !this.state.in });
  };

  handleIncrease = async () => {
    this.toggleEnterState();
    await delay(600);
    this.setState({number: this.state.number+1});
    this.toggleEnterState();
  };

  render() {
    const style= {paddingLeft: '40%' , paddingTop:'40%' };
    return (
      <div  style={style}>
        <Fade inProp={this.state.in} number={this.state.number}/>
        <button onClick={this.handleIncrease}>Click to Enter</button>
      </div>
    );
  }
}
