import React from 'react';
import {GetRequest} from './novelRequest';
import "./NovelList.css";
import "./global.css";

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
      </div>
    )
  }
}