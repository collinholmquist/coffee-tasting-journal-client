import axios from 'axios';
import authHeader from './auth.header'

const API_URL = 'http://localhost:8080';

class UserService {
  getPublic() {
    return axios.get(API_URL + '/home');
  }

  getUserPosts(id) {
    return axios.get(API_URL + `/posts/${id}`, {headers: authHeader() });
  }

  createPosts(data) {
    return axios.post(API_URL + `/posts`, data, {headers: authHeader() })
  }

  findOnePost(post_id, user_id) {
    return axios.get(API_URL +`/posts/${user_id}/${post_id}`,{headers: authHeader() })
  }

  updatePost(data, post_id, user_id) {
    return axios.put(API_URL + `/posts/${user_id}/${post_id}`, data, {headers: authHeader() })
  }

  deletePost(post_id, user_id) {
    return axios.delete(API_URL + `/posts/${user_id}/${post_id}`, {headers: authHeader() })
  }
}

export default new UserService()