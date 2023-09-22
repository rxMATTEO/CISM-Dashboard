import {defineStore} from 'pinia';

export type Document = {
  id: number,
  name: string,
  description: string,
  image: string,
}
export const documentsStore = defineStore('documentsStore', {
  state: () => {
    enum Status {
      NotFound = 'Ничего не найдено'
    }
    return {
      status: Status
    };
  },
  actions : {

  },
  getters: {
    async documents(): Promise<Document[]> {
      return (await fetch(import.meta.env.VITE_API_URL + '/user/docs')).json();
    }
  }
});