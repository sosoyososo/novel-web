export function GetRequest(url, parameter) {
  let bodyStr = ""
  if (parameter) {
    bodyStr = JSON.stringify(parameter)
  }
  return fetch("http://localhost:8020/" + url, {
    body: bodyStr,
    method: 'POST',
  })
    .then(res => res.json())
    .then(res => res.data)    
}