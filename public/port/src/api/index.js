import axios from 'axios';


// const API_BASE_URL = 'http://localhost:3535';
const API_BASE_URL = 'https://wooyongpark.com';
// https://localhost:27017'   //bc localhost doesn't need https
//change this to https://wooyongpark.com when deploying

// axios.create takes in an object with baseURL and headers
const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export function fetchProjects() {
  return client.get('/portfolio/db');
}

export function createComment(params) {
  console.log(params,'before axios posts')

  return axios({
    method: 'post',
    url: `${API_BASE_URL}/portfolio/db/comment`,
    params: {
      projectId: params.projectId,
      comment: params.comment,
      author: params.author
    }
});
}

export function pressButton(addCountPost) {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/portfolio/db`,
    params: addCountPost
  })
}
