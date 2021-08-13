export interface IApi {
  getUser(id: number): string;
  getUsers: () => string[];
}

const api: IApi = {
  getUsers: () => ['Jeremy', 'Tucker'],
  getUser: id => 'Jeremy',
};

export default api;
