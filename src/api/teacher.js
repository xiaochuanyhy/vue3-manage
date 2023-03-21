import request from '../utils/request.js'



export function getTeacher(data) {
  return request({
      url:"/my/teacher/list",
      method: 'get',
  });
}

export function changeinfo(data) {
  return request({
      url:"/my/teacher/changeinfo",
      method: 'post',
      data:data
  });
}

export function deleteTeacher(id) {
  return request({
      url:"/my/teacher/deleteteacher",
      method: 'post',
      data:{
        id
      }
  });
}

export function addTeacher(data) {
  return request({
      url:"/my/teacher/addteacher",
      method: 'post',
      data:data
  });
}

