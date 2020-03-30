export function GetRequest(url, parameter) {
  let bodyStr = ""
  if (parameter) {
    bodyStr = JSON.stringify(parameter)
  }
  return fetch("http://47.103.193.221/novel-api/" + url, {
    body: bodyStr,
    method: 'POST',
  })
    .then(res => res.json())
    .then(res => res.data)    
}