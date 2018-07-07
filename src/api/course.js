import axios from 'axios';

export function fetchCourse() {
  return axios.get('/course');
}

export function fetchCourseById(id) {
  return axios.get(`/course/${id}`);
}

export function saveCourse(data) {
  return axios.post('/course', data);
}

export function updateCourse(id, data) {
  return axios.post(`/course/${id}`, data);
}
