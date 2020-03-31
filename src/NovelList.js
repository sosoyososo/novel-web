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
    GetRequest("novel/list", {page, size: 50}).then(res => {
      that.setState({...res, page})
    })
  }

  search() {
    if (this.state && this.state.searchKey) {
      GetRequest('novel/search/' + this.state.searchKey)
      .then(res => {
        this.setState({searchList: res})
      })
    }
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
        let page = i;
        let pageStr = `${page+1}`;
        let itemClassName = i == this.state.page ? 'page-item page-item-highligh' : 'page-item'
        pageItems.push(<span className={itemClassName} onClick={() => {
          this.loadPage(page)
        }}>{pageStr}</span>)
      }
    }

    let novelItemViewGenerator = (item) => {      
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
    }
    if (this.state && this.state.list) {
      items = this.state.list.map(item => {
        return novelItemViewGenerator(item) 
      })
    }

    let searchResultView = <div />
    if (this.state && this.state.searchList) {      
      let resultList = this.state.searchList.map(item => {
        return novelItemViewGenerator(item) 
      })
      searchResultView = (
        <div>  
          {resultList}             
        </div>
      )
    }

    let that = this;
    return (
      <div className="flex-v maxw100">      
        {/* <div className="search-container">
          <input placeholder="输入内容进行搜索" onChange={(e) => {  
            that.setState({searchKey: e.target.value}) 
          }} />
          <span onClick={() => {
            that.search()
          }}>搜索</span>
        </div>         */}
        {items}  
        <div className="page-container">{pageItems}</div>
      </div>
    )
  }
}