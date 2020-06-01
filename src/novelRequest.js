const envs = {  
  normal : {
    baseUrl: 'http://47.103.193.221/novel-api/',
  },
  dev : {
    baseUrl: 'http://localhost:8020/',
  }
}

const env = envs.dev;

function getRequest(url, parameter) {
  let bodyStr = ""
  if (parameter) {
    bodyStr = JSON.stringify(parameter)
  }
  return fetch(env.baseUrl + url, {
    body: bodyStr,
    method: 'POST',
  })
    .then(res => res.json())
    .then(res => res.data)    
}

export function reqNovelList(page, size) {
  return getRequest("novel/list", {page, size})
}

export function reqChapterList(novelId, page, size) {
  return getRequest("novel/chapters/"+novelId, {page, size})
}

export function reqChapterDetail(chapterId) {
  return getRequest('chapter/detail/' + chapterId)
}



