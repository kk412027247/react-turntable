> 做前端免不了要做活动转盘， 以下是个react的转盘动画例子

![demo](https://upload-images.jianshu.io/upload_images/7505289-365974135a3124cb.gif?imageMogr2/auto-orient/strip)
- 线上demo地址：https://www.wangluoguimi.com/turntable/

- 项目代码地址： https://github.com/kk412027247/react-turntable

### 指针旋转
- 让针转起来，这个操作比较简单，直接给指针设置一个新的角度，配合css 的 transition 属性设置过度时间即可。

```
// App.js
const startStyle = {transform:`rotate(${this.state.rotate}deg)`};

....

<img
  src={require('./images/start.png')}
  alt="pointer"
  className={'start'}
  style={startStyle}
  onClick={this.handleClick}
/>
```
```
// App.css
.App .start{
    transition:1000ms;
}
```
> 这种直接设置属性的方式，比较适合一直存在页面的元素。

### 组件加/卸载时的动画
- 在组件经历mount，和unmount生命周期的时候也可以设置动画，这里设置了`开奖号码:##`加载和卸载时候的动画。
- 这里使用了react官方建议的组件[react-transition-group](https://reactcommunity.org/react-transition-group/)
```
//App.js
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
```
```
// App.css

/*组件入场前的状态*/
.animation-enter{
    transform:translateY(-20px);
    opacity:0;
}

/*组件正在入场时候的动画, all 指的是所有属性一起变化，ease-in-out 先快后慢的一种时间线*/
.animation-enter-active{
    transform:translateY(0);
    opacity:1;
    transition:all 300ms ease-in-out;
}

/*组件出场前的动画*/
.animation-exit {
    opacity: 1;
}

/*组件正在出场的动画*/
.animation-exit-active {
    opacity:0;
    transform:translateY(20px);
    transition:all 300ms ease-out;
}
```
> 这种方式比较适合某些动态展示组件的过渡动画。

### 列表信息变化动画
- 列表信息动画，也是使用[react-transition-group](https://reactcommunity.org/react-transition-group/)
- 这里设置了列表新增元素和移除元素时的动画。
```
// App.js

{/*TransitionGroup组件可以管理一套CSSTransition，会动态给每个组件设置in属性*/}
<TransitionGroup className={'list'}>
  {
    this.state.list.map(({item, id})=>(
      <CSSTransition
        key={id}
        timeout={500}
        classNames={'item-animated'}
        // 点击元素卸载元素
        onClick={this.handleRemove.bind(null,id)}
      >
        <p className={'item'}>{item}</p>
      </CSSTransition>
    ))
  }
</TransitionGroup>
```
```
// App.css

.item-animated-enter{
    height: 0;
    opacity: 0;
    transform: translateX(-20%);
}

/*transition属性可以单独设置多个属性的动画状态，构成一个组合动画，第一个属性是 变化的属性名称，
有两个时间的话，第一个时间是动画的延时，第二个时间是动画持续时间。最后一个是时间线参数，
以下动画就组合成先200ms改变高度，再300ms发生右边位移*/
.item-animated-enter-active {
    opacity: 1;
    height: 30px;
    transform: translateX(0);
    transition:height 200ms, opacity 200ms 300ms, transform 200ms 300ms ease-in-out;
}

.item-animated-exit{
    opacity: 1;
    height: 30px;
    transform: translateX(0);
}

.item-animated-exit-active{
    opacity:0;
    height:0;
    transform: translateX(20%);
    transition: opacity 300ms, transform 300ms ease-in-out, height 300ms 200ms;
}

```

### 参考文档
- https://reactcommunity.org/react-transition-group/
- https://www.w3schools.com/css/css3_transitions.asp

### 兼容低端浏览器
- 不兼容，爱咋咋地吧。

[项目代码地址](https://github.com/kk412027247/react-turntable) 
