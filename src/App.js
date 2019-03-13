import React, { Component } from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import './App.css';

class App extends Component {

  state={
    rotate:'202.5',
    number:0,
    list:[],
    // enable 属性，表示按钮可用。
    // 当按钮不可用的时候，表示正在抽奖，同时隐藏抽奖结果
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
      // number:  '...',
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
          <CSSTransition
            // 组件名，提供css选择器使用，必填参数，如果缺少了，程序会崩溃报错，注意这个参数带's'
            classNames='animation'
            // 组件是否展示,true为显示
            in={this.state.enable}
            // 动画持续时间，需要和css的设置保持一致
            timeout={300}
            // 当in的属性变为false之后，卸载组件，过程可设置动画
            unmountOnExit
          >
            {/*CSSTransition的子组件，必须是个函数，或者组件*/}
            <div className={'result-content'}>
              开奖号码: {this.state.number}
            </div>
          </CSSTransition>

        </div>


          {/*TransitionGroup组件可以管理一套CSSTransition，会动态给每个组件设置in属性*/}
          <TransitionGroup className={'list'}>
            {
              this.state.list.slice().reverse().map(({item, time})=>(
                <CSSTransition
                  id={time}
                  timeout={500}
                  classNames={'item'}
                  className={'item'}
                >
                  <p>{item}</p>
                </CSSTransition>
              ))
            }
          </TransitionGroup>


      </div>
    );
  }
}


export default App;
