import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of, Observable } from 'rxjs';

export type Group = {
  name: string;
};

@Injectable()
export class GroupService {
  url = environment.API_ENDPOINT + 'groups';

  constructor(private httpClient: HttpClient) {}

  fetchGroups() {
    return of([] as Group[]);
  }

  createGroup(group: Group) {
    return this.httpClient.post(this.url, group);
  }

  deleteGroup(id: string) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
