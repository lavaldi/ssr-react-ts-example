import axios from 'axios';

export const servicePosts = {
  async getData() {
    try {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}