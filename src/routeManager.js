import NovelList from './novelList';
import ChapterList from './chapterList';
import ChapterDetail from './chapterDetail';
import {reqChapterList} from './novelRequest';

var observers = {}
/**
 * routeItems :
 *  记录每个读过的小说，每个小说最后一次读过的章节也都会记录。
 * back: 详情 -> 章节列表 -> 小说列表
 * back desc : 第一章读起，第一张在章节列表的第一页，读到第三页返回时候，显示第三页，所有读过的列表都高亮
 * forward desc: 小说点击提示接着上一次读和重新开始
*/
let currentNovel = null;
let currentChapter = nul;
let currentPageChapterList = null;

function notifyRouteChange() {  
  Object.keys(observers).forEach(key => {
    let f = observers[key];
    if (f) {
      f()
    }
  })
}

export function routeCurrentItems() {
  return routeItems;
}

export function routeInsertNovel(novel) {
  currentNovel = novel;
  notifyRouteChange()
}

export function routeSetCurrentPageChapters(list) {
  currentPageChapterList = list
}

export function routeInsertChapter(chapter) {
  currentChapter = chapter
  notifyRouteChange()
}

export function routeToPreviousChapters() {
  if (!novel) {
    return
  }

  if (currentChapter && currentPageChapterList) {    
    let index = currentPageChapterList.findIndex(item => item.id == currentChapter.id);
    if (index > 0) {
      index -= 1
      reqChapterList(novel.id, index, 20).then(res => {
        currentPageChapterList = res.list
        notifyRouteChange()        
      })
      return
    } else {
      currentChapter = null      
      currentPageChapterList = null
    }    
  }
  
  notifyRouteChange()
}

export function routeToNextChapters() {
  notifyRouteChange()
}

export function routeBackToChapterList() {
  chapters = []
  notifyRouteChange()
}

export function registerRouteChage(key, callBack) {
  observers[key] = callBack
}

export function unregisterRouteChage(key) {
  observers.delete(key)
}

export function currentContent() {  
  if (!currentNovel) {
    return <NovelList />
  } else if (!chapters) {
    return <ChapterList novel={currentNovel} page={0} />    
  } else {
    return <ChapterDetail chapter={chapters[chapters.length-1]} />
  }
}

export function currentRouteItem() {
  let items = [<div onClick={() => {
    routeBackToHomePage()
  }}>首页</div>]
  if (novel) {
    items.push(<div onClick={() => {
      routeBackToChapterList()
    }}>目录</div>)
  } 
  if (currentChapter) {
    items.push(<div onClick={() => {
      routeToPreviousChapters()
    }}>上一页</div>)
    items.push(<div onClick={() => {
      routeToNextChapters()
    }}>下一页</div>)
  }
  return <div>{items}</div>    
}