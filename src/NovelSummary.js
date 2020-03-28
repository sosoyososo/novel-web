import React from 'react';
import {GetRequest} from './novelRequest';

export class NovelSummary extends React.Component {  
  constructor(props) {
    super(props)
    this.setState(props)
  }
  componentDidMount() {
    let that = this;
    GetRequest("novel/chapters/"+this.props.id).then(catelogs => {      
      that.setState({catelogs})
    })    
  }
  showDetail(id) {   
    if (this.props.showPage)  {
      this.props.showPage("NovelDetail", id)
    }
  }
  render() {
    let items = <div />
    if (this.state && this.state.catelogs) {
      items = this.state.catelogs.map(item => {
        return (                    
          <div onClick={() => { 
            this.showDetail(item.id)
          }}>
            {item.title}
          </div>
        )
      })
    }
    return (
      <div>
      <div onClick={() => {
        if (this.props.back) {
          this.props.back()
        }
      }}>Back</div>
      {items}
    </div>
    )
  }
}