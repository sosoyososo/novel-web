import React from 'react';
import NovelList from './novelList';
import ChapterList from './chapterList';
import ChapterDetail from './chapterDetail';
import {reqChapterList} from './novelRequest';
import './global.css';
import { Button } from 'antd';

var observers = {}
/**
 * routeItems :
 *  记录每个读过的小说，每个小说最后一次读过的章节也都会记录。
 * back: 详情 -> 章节列表 -> 小说列表
 * back desc : 第一章读起，第一张在章节列表的第一页，读到第三页返回时候，显示第三页，所有读过的列表都高亮
 * forward desc: 小说点击提示接着上一次读和重新开始
*/
let currentNovel = null;
let currentChapter = null;
let currentPageChapterList = null;
let currentNovelListPage = 0

function notifyRouteChange() { 
  Object.keys(observers).forEach(key => {
    let f = observers[key];
    if (f) {
      f()
    }
  })  
}


function routeBackToHomePage() {  
  currentNovel = null
  currentPageChapterList = null
  currentChapter = null
  notifyRouteChange()
}

export function routeSetCurrentNovelListPage(page) {  
  currentNovelListPage = page;
}

export function routeGetCurrentNovelListPage() {
  return currentNovelListPage ;
}

export function routeToPageInChapterList(page) {
  if (!currentNovel) {
    return
  }
  reqChapterList(currentNovel.id, page, 100).then(res => {
    currentChapter = null
    currentPageChapterList = res.list
    currentNovel.page = page
    currentNovel.total = res.total
    notifyRouteChange()
  })
}

export function routeInsertNovel(novel) {
  currentNovel = novel;
  notifyRouteChange()
}

export function routeInsertChapter(chapter) {
  currentChapter = chapter  
  notifyRouteChange()
}

export function routeToPreviousChapters() {    
  if (!currentChapter || !currentPageChapterList || !currentNovel) {
    return
  }
  if (!currentNovel.page) {
    currentNovel.page = 0
  }

  let index = currentPageChapterList.findIndex(item => item.id == currentChapter.id);
  if (index > 0) {
    currentChapter = currentPageChapterList[index-1]
    notifyRouteChange()
    return
  }
  if (currentNovel.page <= 0) {
    currentChapter = null
    currentPageChapterList = null
    currentNovel.page = 0
    notifyRouteChange()
    return    
  }
  let page = currentNovel.page-1;
  reqChapterList(currentNovel.id, page, 100).then(res => {
    currentPageChapterList = res.list;
    if (!currentPageChapterList || currentPageChapterList.length <= 0) {
      currentChapter = null
      currentPageChapterList = null
      currentNovel.page = 0
      notifyRouteChange()
      return    
    }
    currentChapter = currentPageChapterList[currentPageChapterList.length-1]
    currentNovel.total = res.total;
    currentNovel.page = page;
    notifyRouteChange()
  })  
}

export function routeToNextChapters() {  
  if (!currentChapter || !currentPageChapterList || !currentNovel) {
    return
  }
  if (!currentNovel.page) {
    currentNovel.page = 0
  }
  let index = currentPageChapterList.findIndex(item => item.id == currentChapter.id);
  if (index < currentPageChapterList.length - 1) {
    currentChapter = currentPageChapterList[index+1]
    notifyRouteChange()
    return
  }
  let totalPage = Math.floor(currentNovel.total/20) + (currentNovel.total%20 > 0 ? 1 : 0);
  if (currentNovel.page >= totalPage-1) {    
    currentChapter = null
    currentPageChapterList = null
    currentNovel.page = 0
    notifyRouteChange()
    return
  }
  let page = currentNovel.page+1
  reqChapterList(currentNovel.id, page, 100).then(res => {
    currentPageChapterList = res.list;
    if (!currentPageChapterList || currentPageChapterList.length <= 0) {
      currentChapter = null
      currentPageChapterList = null
      currentNovel.page = 0
      notifyRouteChange()
      return    
    }
    currentChapter = currentPageChapterList[0]
    currentNovel.total = res.total
    currentNovel.page = page
    notifyRouteChange()
  })  
}

export function routeBackToChapterList() {
  currentChapter = null
  currentPageChapterList = null
  currentNovel.page = 0
  notifyRouteChange()
}

export function routeToChapterList(novel) {
  currentChapter = null
  currentPageChapterList = null
  currentNovel = novel
  currentNovel.page = 0
  reqChapterList(novel.id, 0, 100).then(res => {
    currentPageChapterList = res.list
    currentNovel.total = res.total
    notifyRouteChange()
    return
  })
  notifyRouteChange()
  return
}

export function registerRouteChage(key, callBack) {
  observers[key] = callBack
}

export function unregisterRouteChage(key) {
  observers.delete(key)
}

export function currentContent() {
  if (currentChapter) {
    return <ChapterDetail chapter={currentChapter} />
  } 
  if (currentNovel) {    
    if (!currentPageChapterList) {
      reqChapterList(currentNovel.id, 0, 100).then(res => {
        currentPageChapterList = res.list
        currentNovel.total = res.total
        currentChapter = null
        notifyRouteChange()
      })
    }    
    return <ChapterList novel={currentNovel} page={currentNovel.page ? currentNovel.page + 1 : 1} list={currentPageChapterList} total={currentNovel.total} />
  }  
  return <NovelList />
}

export function currentRouteItem() {
  let items = []
  if (currentChapter) {
    items.push(<Button className="margin10" onClick={() => {
      routeToPreviousChapters()
    }}>上一页</Button>)
    items.push(<Button className="margin10" onClick={() => {
      routeToPageInChapterList(currentNovel.page)
    }}>目录</Button>)
  }    
  if (currentNovel) {
    items.push(<Button className="margin10" className="margin10" onClick={() => {
      routeBackToHomePage()
    }}>首页</Button>)
  }
  if (currentChapter) {
    items.push(<Button className="margin10" onClick={() => {
      routeToNextChapters()
    }}>下一页</Button>)
  }
  return <div className="flex-h">{items}</div>    
}