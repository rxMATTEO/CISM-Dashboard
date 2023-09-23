import { defineStore } from 'pinia';

export type Document = {
  id: number,
  name: string,
  description: string,
  image: string,
}

enum Status {
  NotFound = 'Ничего не найдено'
}
export const documentsStore = defineStore('documentsStore', {
  state: () => {
    return {
      status: Status
    };
  },
  actions : {
    async searchById(id: number): Promise<Response | Document[]> {
      const response: Response  = await fetch(`${import.meta.env.VITE_API_URL}/user/docs?search=${id}`)
        .catch( (error) => {
          return error;
        } );
      return id ? response.ok ? response.json(): response: await this.documents;
    }
  },
  getters: {
    async documents(): Promise<Document[]> {
      return (await fetch(`${import.meta.env.VITE_API_URL}/user/docs`)).json();
    }
  }
});