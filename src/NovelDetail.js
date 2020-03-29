import React from 'react';
import {GetRequest} from './novelRequest';
import './global.css';
import "./NovelDetail.css";

export class NovelDetail extends React.Component {    
  componentDidMount() {
    this.loadDetail(this.props.id)
  }

  loadDetail(id) {
    let that = this;
    GetRequest('chapter/detail/' + id).then(res => {
      this.setState({detail: res, id, showCatelogsList: false})
      if (this.topRef) {
        this.topRef.scrollIntoView()
      }
    })
  }

  currentIndex() {
    let list = this.props.otherInfo && this.props.otherInfo.list;
    if (!list || !this.state || !this.state.id) {
      return -1
    }
    for (var i = 0 ; i < list.length; i ++) {
      if (list[i].id == this.state.id) {  
        return i      
      }
    }
    return -1
  }

  jumpNext() {
    let index = this.currentIndex()
    if (index < 0) {
      return 
    }
    let list = this.props.otherInfo && this.props.otherInfo.list;
    if (index >= list.length) {
      return
    }
    let id = this.props.otherInfo.list[index+1].id;
    this.loadDetail(id)
  }

  jumpPrevious() {
    let index = this.currentIndex()
    if (index <= 0) {
      return 
    }
    let list = this.props.otherInfo && this.props.otherInfo.list;    
    let id = list[index-1].id;
    this.loadDetail(id)    
  }

  showCatelogs() {
    this.setState({showCatelogsList: true})
  }

  hideCatelogs() {    
    this.setState({showCatelogsList: false, catelogPage: 0})
  }

  render() {
    let item = <div />
    if (this.state && this.state.detail) {
      let detail = this.state.detail;
      item = <div onClick={() => {        
        this.hideCatelogs()
      }}> 
        <p>{detail.title}</p>
        {detail.content}
      </div>
    }
    let jumper = <div />
    if (this.props.otherInfo && this.props.otherInfo.list && this.state && this.state.id) {            
      jumper = (
        <div>
          <span className="catelog-jumper-item catelog-jumper-previous" onClick={() => {          
          this.jumpPrevious()
        }}>上一页</span>
        <span className="catelog-jumper-item catelog-jumper-next" onClick={() => {          
          this.jumpNext()
        }}>下一页</span>
        <span className="catelog-jumper-item catelog-jumper-catelogs" onClick={() => {          
          this.showCatelogs()
        }}>目录</span>
        </div>
      )
    }   
    let catelogListView = <div />
    if (this.state && this.state.showCatelogsList) {      
      let list = this.props.otherInfo && this.props.otherInfo.list;
      if (list) {
        let page = this.state && this.state.catelogPage;
        if (!page) {
          page = 0
        }
        let catelogItems = list.filter((_, index) => {
          return index >= page * 100 && index < (page + 1) * 100
        })
        .map(item => {
          let itemClassName = item.id == this.state.id ? 'catelog-item catelog-highlight' : 'catelog-item';
          return (
            <div className={itemClassName} onClick={() => {
              this.loadDetail(item.id)
            }}>
              {item.title}
            </div>
          )
        });
        let pageItems = [];
        let pageCount = list.length / 100;
        if (list.length % 100 > 0) {
          pageCount += 1;
        }                
        for (var i = 0; i < pageCount; i ++) {          
          let catelogPage = i;
          let str = `${i * 100}-${(i + 1) * 100}`
          pageItems.push((<span onClick={() => {
            this.setState({catelogPage})
          }} className="page-item">      
            {str}                  
          </span>))
        }
        catelogListView = (
          <div className="catelog-top-container">     
            <div className="catelog-container">{catelogItems}</div>            
            <div className="page-container">{pageItems}</div>
          </div>
        )
      }                  
    } 
    return (
      <div className="chapter-content">
        <div ref={(el) => { this.topRef = el; }} />
        <div className="nav-back" onClick={() => {
          if (this.props.back) {
            this.props.back()
          }
        }}>Back</div>
        {jumper}
        <div>
          {item}          
        </div>   
        {catelogListView}
      </div>
    )
  }
}