import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  state={
    rotate:'202.5',
    number:0,
    list:[],
    enable:true,
  };
  // 八个格子，分别对应

  random = () => Math.floor(Math.random() * 8);


  handleClick = () => {
    const {enable, number, rotate, list} =this.state;
    if(!enable){
      return;
    }
    const randomNumber =  this.random();
    const deg = randomNumber > number ? randomNumber - number  : 8 - number + randomNumber ;
    this.setState({
      rotate: Number(rotate) + 720 + deg * 45  + '',
      number:  '...',
      enable: false,
    });
    this.timmer = setTimeout(()=>{this.setState({
      number: randomNumber,
      list:[...list, {item:randomNumber, time: Date.now()+''}],
      enable: true,
    })},1100)
  };

  componentWillUnmount(){
    !!this.timmer && clearTimeout(this.timmer)
  }

  render() {
    const startStyle = {transform:`rotate(${this.state.rotate}deg)`};
    return (
      <div className="App">
        <div className={'turntable'}>
          <img
            src={require('./images/start.png')}
            alt="pointer"
            className={'start'}
            style={startStyle}
            onClick={this.handleClick}
          />
        </div>
        <div className={'result'}>
          {this.state.number}
        </div>
        <div className={'list'}>
          {
            this.state.list.slice().reverse().map(({item, time})=> <p key={time}>{item}</p>)
          }
        </div>
      </div>
    );
  }
}


export default App;
