export interface IApi {
  getUsers: () => string[];
  getUser: (id: number) => string;
}

const api: IApi = {
  getUsers: () => ['Jeremy', 'Tucker'],
  getUser: id => id.toString(),
};

export default api;
