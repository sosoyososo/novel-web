import React from 'react';
import { Pagination } from 'antd';
import {routeInsertChapter, routeToPageInChapterList} from './routeManager';
import './global.css';


class ChapterList extends React.Component {
  componentDidUpdate() {
    window.scrollTo(0, 0)
  }

  render() {
    let chapters = <div />
    if (this.props.list) {
      chapters = this.props.list.map(item => {
        return <div className="chapter-item"  onClick={() => {
          routeInsertChapter(item)
        }}>
          {item.title}
        </div>
      })
    }
    
    return <div>
      <div className="margin10 flex-h flex-wraper">{chapters}</div>
      <Pagination  className="margin10"
        total={this.props.total}
        pageSize={100}
        current={this.props.page ? this.props.page - 1 : 0}
        onChange={(page) => {
          routeToPageInChapterList(page-1)
        }} />
    </div>
  }
}
export default ChapterList;