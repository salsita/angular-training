import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { apiCall } from '../core/api/api.decorators';
import { CrudId } from '../core/crud/crud.interfaces';
import { User } from './users.interfaces';

@Injectable()
export class UsersApi {
  constructor(private http: HttpClient) {}

  @apiCall()
  getUsers() {
    return this.http.get(`/users`);
  }

  @apiCall()
  getUser(id: CrudId) {
    return this.http.get(`/users/${id}`);
  }

  @apiCall()
  deleteUser(id: CrudId) {
    return this.http.delete(`/users/${id}`);
  }

  @apiCall()
  saveUser({ id, ...data }: User) {
    return id ? this.http.patch(`/users/${id}`, data) : this.http.post('/users', data);
  }

  @apiCall()
  getSkills() {
    return this.http.get(`/skills`);
  }
}
