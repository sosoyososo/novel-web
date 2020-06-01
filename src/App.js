import React from 'react';
import Router from './router';
import {currentContent} from './routeManager';

import {
  registerRouteChage, 
  unregisterRouteChage} from './routeManager';

class App extends React.Component {    
  componentDidMount() {
    this.setState({content: currentContent()})
    registerRouteChage("app_route_change", () => {
      this.setState({content: currentContent()})
    })
  }
  
  componentWillUnmount() {
    unregisterRouteChage("app_route_change")
  }

  render() {
    let content = this.state && this.state.content ? this.state.content : <div />
    return (
      <div style={{padding: '20px'}}>
        <Router />
        {content}
      </div>
    )
  }
}

export default App;
