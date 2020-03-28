import React from 'react';
import {NovelList} from './NovelList';
import  {NovelSummary} from './NovelSummary';
import {NovelDetail} from './NovelDetail';

class App extends React.Component {  
  constructor(props) {
    super(props)
    this.state = {
      router: []
    }
  }

  showPage(key, id) {    
    let router = this.state.router;
    router.push({
      key, id
    })
    console.log("show page" + key)
    this.setState({router})
  }

  back() {
    let router = this.state.router;
    if (this.state.router.length > 0) {
      router = router.filter((_, i) => i < this.state.router.length-1)
    }
    this.setState({router})
  }

  render() {    
    let item = <NovelList showPage={this.showPage.bind(this)}  />
    if (this.state.router.length > 0) {
      let itemMap =  this.state.router[this.state.router.length-1] ;
      switch (itemMap.key) {
        case 'NovelSummary':
          item = <NovelSummary showPage={this.showPage.bind(this)} back={() => {
            this.back()
          }} id={itemMap.id} />
          break
        case "NovelDetail":
          item = <NovelDetail showPage={this.showPage.bind(this)} back={() => {
            this.back()
          }} id={itemMap.id} />
          break
        default:
          break
      }      
    }
    return item
  }
}

export default App;
