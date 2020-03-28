export function GetRequest(url) {
  return fetch("http://localhost:8020/" + url)
    .then(res => res.json())
    .then(res => res.data)    
}