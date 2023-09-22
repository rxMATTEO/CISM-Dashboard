import {defineStore} from 'pinia';

export const documentsStore = defineStore('documentsStore', {
  state: () => {
    return {};
  },
  actions : {

  },
  getters: {
    async documents() {
      return (await fetch(import.meta.env.VITE_API_URL + '/user/docs')).json();
    }
  }
});