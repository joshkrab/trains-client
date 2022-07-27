import axios from 'axios';

export default class PostService {
   static async getAll(limit, page) {
      const response = await axios.get(
         'https://jsonplaceholder.typicode.com/posts',
         {
            // Ці папаметри додадуться до нашого адресу url:
            params: {
               _limit: limit,
               _page: page,
            },
         }
      );
      return response;
   }

   static async getById(id) {
      const response = await axios.get(
         'https://jsonplaceholder.typicode.com/posts/' + id
      );
      return response;
   }

   static async getComment(id) {
      const response = await axios.get(
         'https://jsonplaceholder.typicode.com/posts/' + id + '/comments'
      );
      return response;
   }
}
