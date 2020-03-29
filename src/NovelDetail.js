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
      this.setState({detail: res, id})
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
    let id = this.props.otherInfo.list[index-1].id;
    this.loadDetail(id)    
  }

  showCatelogs() {
    this.setState({showCatelogsList: true})
  }

  hideCatelogs() {    
    this.setState({showCatelogsList: false})
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
        let catelogItems = list.map(item => {
          let highlightCls = item.id == this.state.id ? 'catelog-highlight' : '';
          return (
            <div className="catelog-item {highlightCls}" onClick={() => {
              this.loadDetail(item.id)
            }}>
              {item.title}
            </div>
          )
        });
        catelogListView = (
          <div className="catelog-container">     
            {catelogItems}               
          </div>
        )
      }                  
    } 
    return (
      <div className="chapter-content">
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