import request from '../utils/request.js'



export function getclass(data) {
  return request({
      url:"/my/class/list",
      method: 'get',
  });
}

export function changeinfo(data) {
  return request({
      url:"/my/class/changeinfo",
      method: 'post',
      data:data
  });
}

export function deleteclass(id) {
  return request({
      url:"/my/class/deleteclass",
      method: 'post',
      data:{
        id
      }
  });
}

export function addclass(data) {
  return request({
      url:"/my/class/addclass",
      method: 'post',
      data:data
  });
}

