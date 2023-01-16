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

   checkEntry(x, y, r, token, status) { // Для тестирования в вызовах - бредовые данные
    let promises = [];
    for (let i = 0; i < x.length; i++) {
      for (let j = 0; j < r.length; j++) {
        promises = [...promises, axiosInstance.post('add', {owner:"ashgdkajshdkahshk", x:x[i], y:y, r:r[j], status:status}, {
          headers: {
            Authorization: 'token:' + token
          }
        })];
      }

    }
    console.log(promises);
    Promise.all(promises).catch();
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
