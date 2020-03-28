import React from 'react';
import {GetRequest} from './novelRequest';
// import "./NovelList.css";

export class NovelList extends React.Component {  
  constructor(props) {
    super(props)
    this.setState(props)
  }

  componentDidMount() {   
    let that = this;
    GetRequest("novel/list").then(list => {
      that.setState({list})
    })
  }

  showDetail(id) {   
    if (this.props.showPage)  {
      this.props.showPage("NovelSummary", id)
    }
  }

  render() {
    let items = <div />
    if (this.state && this.state.list) {
      items = this.state.list.map(item => {
        return (   
          <div onClick={() => {
            this.showDetail(item.id) 
          }}>
            <img className="coverImg"  src={item.coverURL} />
            <span>{item.title}</span>
            <span>{item.author}</span>
            <p>{item.summary}</p>
          </div>
        )        
      })
    }

    return (
      <div>      
        {items}  
      </div>
    )
  }
}