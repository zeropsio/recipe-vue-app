import type { Todo } from "@zerops/zestrat-models";
import axios from "axios";

export default class TodosService {
  private _endpoint: string;

  constructor(private _apiEndpoint: string) {
    this._endpoint = `${this._apiEndpoint}/todos`;
  }

  findAll() {
    return axios.get<Todo[]>(this._endpoint);
  }

  update(id: number | string, data: Partial<Todo>) {
    return axios.patch<Todo>(`${this._endpoint}/${id}`, data);
  }

  delete(id: number | string) {
    return axios.delete<number | string>(`${this._endpoint}/${id}`);
  }

  add(data: Partial<Todo>) {
    return axios.post<Todo>(this._endpoint, data);
  }
}
