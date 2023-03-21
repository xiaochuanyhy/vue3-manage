import request from '../utils/request.js'


export function loginApi(data) {
  return request({
      url:"api/login",
      method: 'post',
      data:data
  });
}

export function getStudent(data) {
  return request({
      url:"/my/list/student",
      method: 'get',
  });
}

export function changeinfo(data) {
  return request({
      url:"/my/list/changeinfo",
      method: 'post',
      data:data
  });
}

export function deleteStudent(id) {
  return request({
      url:"/my/list/deletestudent",
      method: 'post',
      data:{
        id
      }
  });
}

export function addchstudent(data) {
  return request({
      url:"/my/list/addchstudent",
      method: 'post',
      data:data
  });
}

export function searchuser(id) {
  return request({
      url:"/my/user/info",
      method: 'post',
      data:{
        id
      }
  });
}
