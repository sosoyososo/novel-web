import React from 'react';
import {NovelList} from './NovelList';
import  {NovelSummary} from './NovelSummary';
import {NovelDetail} from './NovelDetail';

class App extends React.Component {  
  constructor(props) {
    super(props)    
    let router = JSON.parse(localStorage.getItem("router"));
    if (!router) {
      router = [];
    }
    this.state = {router}
  }
  updateRouter() {
    if (this.state.router) {
      localStorage.setItem("router", JSON.stringify(this.state.router))    
    } else {
      localStorage.setItem("router", JSON.stringify([]))    
    }
    console.log(this.state.router)
  }
  showPage(key, id, otherInfo) {    
    let router = this.state.router;
    router.push({
      key, id, otherInfo
    })
    this.setState({router}, () => {
      this.updateRouter()
    })    
  }

  back() {
    let router = this.state.router;
    if (this.state.router.length > 0) {
      router = router.filter((_, i) => i < this.state.router.length-1)
    }
    this.setState({router}, () => {
      this.updateRouter()
    })    
  }

  scrollToTop() {
    if (this.topRef) {
      this.topRef.scrollIntoView()
    }
  }

  render() {    
    let item = <NovelList scrollToTop={this.scrollToTop.bind(this)} showPage={this.showPage.bind(this)}  />
    if (this.state.router.length > 0) {
      let itemMap =  this.state.router[this.state.router.length-1] ;
      switch (itemMap.key) {
        case 'NovelSummary':
          item = <NovelSummary scrollToTop={this.scrollToTop.bind(this)} showPage={this.showPage.bind(this)} back={() => {
            this.back()
          }} id={itemMap.id} />
          break
        case "NovelDetail":
          item = <NovelDetail scrollToTop={this.scrollToTop.bind(this)} showPage={this.showPage.bind(this)} back={() => {
            this.back()
          }} id={itemMap.id} otherInfo={itemMap.otherInfo} />
          break
        default:
          break
      }      
    }
    return (
      <div>
        <div ref={(el) => { this.topRef = el; }} />
        {item}
      </div>
    )
  }
}

export default App;
