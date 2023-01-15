import axios from 'axios';

const axiosInstance = axios.create({
  //baseURL: 'http://localhost:3000/lab4/api/entries/'
  baseURL: 'http://localhost:8080/api/shots/'
});

const entryAPI = {
  async getEntries(token) {
    return axiosInstance.get('all', {
      headers: {
        Authorization: 'token:' + token
        //Authorization: 'token:' + token
      }
    });
  },

  async checkEntry(x, y, r, token, status) {
    for (let i = 0; i < x.length; i++) {
      const elementX = x[i];
      for (let j = 0; j < r.length; j++) {
        const elementR = r[j];
        axiosInstance.post('', {x, y, r, token, status}, {
          headers: {
            //Authorization: 'Bearer' + token
            Authorization: 'token:' + token
          }
        });
      }

    }
    // return axiosInstance.post('', {x, y, r, token, status}, {
    //   headers: {
    //     Authorization: 'Bearer' + token
    //   }
    // });
  },

  // async clearEntries(token) {
  //   return axiosInstance.delete('', {
  //     headers: {
  //       Authorization: 'Bearer' + token
  //     }
  //   });
  // }
}

export default entryAPI;
