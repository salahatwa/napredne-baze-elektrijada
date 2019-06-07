import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { makePagination } from '../common'
import { IPaginationResponse } from '../models/IPaginationResponse'
import { IReportTicket } from '../models/IReportTicket'

@Injectable({
  providedIn: 'root',
})
export class ReportTicketService {
  public route = 'report/'
  constructor(private http: HttpClient) {}

  getReportTickets(skip?: number, take?: number) {
    const params = makePagination(skip, take)
    return this.http.get<IPaginationResponse<IReportTicket>>(
      environment.API_ENDPOINT + this.route,
      { params }
    )
  }

  submitReportTicket(reportTicket: IReportTicket) {
    return this.http.post<IReportTicket>(
      environment.API_ENDPOINT + this.route,
      reportTicket
    )
  }

  deleteTicket(ticketId: string) {
    return this.http.delete<IReportTicket>(
      environment.API_ENDPOINT + this.route + ticketId
    )
  }
}
