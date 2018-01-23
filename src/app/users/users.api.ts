import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { apiErrorHandling } from '../core/api/api.decorators';
import { CrudId } from '../core/crud/crud.interfaces';
import { User } from './users.interfaces';

@Injectable()
export class UsersApi {
  constructor(private http: HttpClient) {}

  @apiErrorHandling()
  getUsers() {
    return this.http.get(`/users`);
  }

  @apiErrorHandling()
  getUser(id: CrudId) {
    return this.http.get(`/users/${id}`);
  }

  @apiErrorHandling()
  deleteUser(id: CrudId) {
    return this.http.delete(`/users/${id}`);
  }

  @apiErrorHandling()
  saveUser({ id, ...data }: User) {
    return id ? this.http.patch(`/users/${id}`, data) : this.http.post('/users', data);
  }

  @apiErrorHandling()
  getSkills() {
    return this.http.get(`/skills`);
  }
}
