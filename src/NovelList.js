import React from 'react';
import {GetRequest} from './novelRequest';
import "./NovelList.css";
import "./global.css";

export class NovelList extends React.Component {  
  constructor(props) {
    super(props)
    this.setState({...props})
    this.loadPage(0)
  }

  loadPage(page) {
    let that = this;
    GetRequest("novel/list", {page}).then(res => {
      that.setState({...res, page})
    })
  }

  showDetail(id) {   
    if (this.props.showPage)  {
      this.props.showPage("NovelSummary", id)
    }
  }

  render() {
    let items = <div />
    let pageItems = [];
    if (this.state && this.state.total) {
      let pagesCount = this.state.total/50;
      if (this.state.total%50 > 0) {
        pagesCount += 1;        
      }
      for (var i = 0; i < pagesCount; i ++) {
        let pageStr = `${i+1}`;
        let itemClassName = i == this.state.page ? 'page-item page-item-highligh' : 'page-item'
        pageItems.push(<span className={itemClassName} onClick={() => {
          this.loadPage(i)
        }}>{pageStr}</span>)
      }
    }
    if (this.state && this.state.list) {
      items = this.state.list.map(item => {
        return (   
          <div className="flex-h margin10 bottom-sep" onClick={() => {
            this.showDetail(item.id) 
          }}>
            <img className="margin10 coverImg"  src={item.coverURL} />
            <div>
              <div>
                <span className="margin10">{item.title}</span>
                <span className="margin10">{item.author}</span>
              </div>
              <p className="margin10">{item.summary}</p>
            </div>            
          </div>
        )        
      })
    }

    return (
      <div className="flex-v">      
        {items}  
        <div className="page-container">{pageItems}</div>
      </div>
    )
  }
}