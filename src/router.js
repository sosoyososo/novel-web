import React from 'react';
import './global';
import { registerRouteChage, unregisterRouteChage } from './routeManager';

class Router extends React.Component {
  componentDidMount() {
    registerRouteChage("router_content_change", () => {              
    })
  }

  componentWillUnmount() {
    unregisterRouteChage("router_content_change")
  }

  render() {    
    return <div className="flex-h">      
    </div>
  }
}

export default  Router;