import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface IEmailStats {
  emailsPending: number;
  emailsSent: number;
  emailsFailed: number;
}

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  url = environment.API_ENDPOINT + 'statistics/';

  constructor(private httpClient: HttpClient) {}

  getEmailStatistics() {
    return this.httpClient.get<IEmailStats>(`${this.url}emails`);
  }
}
