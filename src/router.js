import React from 'react';
import './global.css';
import { 
  registerRouteChage, 
  unregisterRouteChage, 
  currentRouteItem } from './routeManager';

class Router extends React.Component {
  componentDidMount() {
    registerRouteChage("router_content_change", () => { 
      this.setState({items: currentRouteItem()})             
    })
  }

  componentWillUnmount() {
    unregisterRouteChage("router_content_change")
  }

  render() {    
    let items = this.state && this.state.items ? this.state.items : <div />;
    return <div className="flex-h">          
      {items}
    </div>
  }
}

export default  Router;