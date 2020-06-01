import React from 'react';
import { reqChapterDetail } from './novelRequest';

class ChapterDetail extends React.Component {
  componentDidMount() {
    reqChapterDetail(this.props.chapter.id).then(res => {
      this.setState({...res})
    })
  }
  render() {
    let content = this.state && this.state.content ? <div>{this.state.content}</div>: <div/>
    return <div>            
      {content}
    </div>
  }  
}
export default ChapterDetail;