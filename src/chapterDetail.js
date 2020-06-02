import React from 'react';
import { reqChapterDetail } from './novelRequest';

class ChapterDetail extends React.Component {
  componentDidMount() {
    reqChapterDetail(this.props.chapter.id).then(res => {
      this.setState({...res}, () => {
        window.scrollTo(0, 0)
      })
    })
  }
  componentWillUpdate() {
    if (this.state && this.state.chapterID != this.props.chapter.id) {
      reqChapterDetail(this.props.chapter.id).then(res => {
        this.setState({...res}, () => {
          window.scrollTo(0, 0)
        })
      })
    }
  }
  render() {
    let content = this.state && this.state.content ? <div>{this.state.content}</div>: <div/>
    return <div style={{fontSize: '20px', lineHeight: '35px'}}>            
      {content}
    </div>
  }  
}
export default ChapterDetail;