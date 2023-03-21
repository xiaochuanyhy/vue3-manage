import request from '../utils/request.js'



export function getuser(data) {
  return request({
      url:"/my/user/list",
      method: 'get',
  });
}

export function changeinfo(data) {
  return request({
      url:"/my/user/changeinfo",
      method: 'post',
      data:data
  });
}

export function deleteuser(id) {
  return request({
      url:"/my/user/deleteuser",
      method: 'post',
      data:{
        id
      }
  });
}

export function adduser(data) {
  return request({
      url:"/api/reguser",
      method: 'post',
      data:data
  });
}

