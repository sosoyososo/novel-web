import React from 'react';
import Router from './router';
import {currentContent} from './routeManager';

import {
  registerRouteChage, 
  unregisterRouteChage, 
  routeCurrentItems} from './routeManager';

class App extends React.Component {  
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    registerRouteChage("app_route_change", () => {
      this.setState({content: currentContent()})
    })
  }
  
  componentWillUnmount() {
    unregisterRouteChage("app_route_change")
  }

  render() {
    let content = this.state.content ? this.state.content : <div />
    return (
      <view>
        <Router />
        {content}
      </view>
    )
  }
}

export default App;
