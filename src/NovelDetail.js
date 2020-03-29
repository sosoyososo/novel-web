import React from 'react';
import {GetRequest} from './novelRequest';
import './global.css';

export class NovelDetail extends React.Component {    
  componentDidMount() {
    let that = this;
    GetRequest('chapter/detail/' + this.props.id).then(res => {
      this.setState({detail: res})
    })
  }
  render() {
    let item = <div />
    if (this.state && this.state.detail) {
      let detail = this.state.detail;
      item = <div> 
        <p>{detail.title}</p>
        {detail.content}
      </div>
    }
    return (
      <div>
        <div className="nav-back" onClick={() => {
          if (this.props.back) {
            this.props.back()
          }
        }}>Back</div>
      <div className="chapter-content">
        {item}
      </div>      
    </div>
    )
  }
}