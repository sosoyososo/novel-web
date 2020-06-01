import React from 'react';
import {reqNovelList} from './novelRequest';
import { Pagination } from 'antd';
import {routeInsertNovel} from './routeManager';
import 'antd/dist/antd.css';
import './global.css';

class NovelList extends React.Component {  
  constructor(props) {
    super(props)   
    this.loadPage(0)
  }

  showDetail(novel) {
    routeInsertNovel(novel)
  }

  loadPage(page) {
    reqNovelList(page, 20).then(res => {
      this.setState({...res})
    })
  }

  render() {
    let novelItems = <div />    
    let pagination = <div />
    if (this.state && this.state.total && this.state.list) {
      novelItems = this.state.list.map(item => {
        return <div className="flex-h margin10" onClick={() => {      
          this.showDetail(item)
        }}>    
          <img className="cover-img margin10" src={item.coverURL} />
          <div className="flex-v margin10">
            <div className="margin10">{item.title}</div>
            <div className="margin10">{item.author}</div>
            <div className="margin10">简介： {item.summary}</div>
          </div>
        </div>                
      })
      pagination = <Pagination 
        className="margin10"
        total={this.state.total}
        pageSize={20}
        onChange={(page) => {
          this.loadPage(page)
        }}
      />
    }
    return (
      <div className="margin10">
        {novelItems}
        {pagination}
      </div>
    )
  }
}

export default NovelList;
