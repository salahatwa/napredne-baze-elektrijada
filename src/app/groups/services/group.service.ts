import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponse } from 'src/app/models/api';
import { IUser } from 'src/app/models/user.interface';

export type GroupParticipant = {
  participant: IUser;
  participantId: string;
  type: 'Owner' | 'User';
};

export type Group = {
  _id: string;
  name: string;
  chatSessionId: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  participants: GroupParticipant[];
};

@Injectable()
export class GroupService {
  url = environment.API_ENDPOINT + 'groups';

  constructor(private httpClient: HttpClient) {}

  fetchGroups() {
    return this.httpClient.get<ApiResponse<Group[]>>(this.url);
  }

  createGroup(group: Group) {
    return this.httpClient.post(this.url, group);
  }

  deleteGroup(id: string) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  sendInvitations(groupId: string, participantIds: string[]) {
    return this.httpClient.post(`${this.url}/${groupId}/participants`, {
      participantIds,
    });
  }

  removeParticipant(groupId: string, participantId: string) {
    return this.httpClient.delete(
      `${this.url}/${groupId}/participants/${participantId}`
    );
  }
}
