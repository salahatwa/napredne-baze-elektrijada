import { IPaginationResponse } from './../models/IPaginationResponse';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  url = environment.API_ENDPOINT + 'groups';

  constructor(private httpClient: HttpClient) {}

  fetchGroups() {
    return this.httpClient.get<IPaginationResponse<Group>>(this.url);
  }

  createGroup(group: Group) {
    return this.httpClient.post<Group>(this.url, group);
  }

  updateGroup(group: Partial<Group>) {
    return this.httpClient.put<Group>(`${this.url}/${group._id}`, group);
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
