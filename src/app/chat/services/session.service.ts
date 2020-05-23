import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { IChatSession } from 'src/app/models/IChatSession';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as faker from 'faker';

@Injectable()
export class SessionService {
  constructor(private httpClient: HttpClient) {}

  fetchSessions() {
    return of([
      {
        participants: [
          {
            name: 'Stane',
            username: 'schenzo',
            imageURL: faker.image.avatar(),
            _id: '1',
            email: 'stane@mail.com',
          },
          {
            name: 'Velja',
            username: 'velja',
            imageURL: faker.image.avatar(),
            _id: '2',
            email: 'velja@mail.com',
          },
        ],
        type: 'sometype',
        _id: '1',
        messages: [
          {
            sender: '1',
            createdAt: new Date().toDateString(),
            _id: '1',
            session: '1',
            data: 'hello world',
            ref: 'someref',
            text: 'hello',
          },
        ],
      },
    ] as IChatSession[]);
    return this.httpClient.get<IChatSession[]>(
      environment.API_ENDPOINT + 'user/sessions'
    );
  }
}
