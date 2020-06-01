import React from 'react';
import {reqNovelList, reqChapterList, reqChapterDetail} from './novelRequest';
class App extends React.Component {  
  constructor(props) {
    super(props)        
    reqNovelList(0, 10).then(res => {
      console.log(res.total)
      console.log(res.list)
      if (res.list && res.list.length > 0) {        
        let novel = res.list[0];
        reqChapterList(novel.id, 0, 10).then(res => {
          console.log(res.total)
          console.log(res.list)
          if (res.list && res.list.length > 0) {
            let chapter = res.list[0];
            reqChapterDetail(chapter.id).then(res => {
              console.log(res);
            })
          }          
        })
      }      
    })
  }
  render() {
    return (
      <div></div>
    )
  }
}

export default App;
