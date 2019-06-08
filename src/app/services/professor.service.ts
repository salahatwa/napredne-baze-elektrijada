import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { makePagination } from '../common'
import { IPaginationResponse } from '../models/IPaginationResponse'
import { IUser } from '../models/user.interface'

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  public route = 'professor/'
  constructor(private http: HttpClient) {}

  getProfessors(skip?: number, take?: number) {
    const params = makePagination(skip, take)
    return this.http.get<IPaginationResponse<IUser>>(
      environment.API_ENDPOINT + this.route,
      {
        params,
      }
    )
  }

  createProfessor(professor: IUser) {
    return this.http.post<IUser>(environment.API_ENDPOINT + this.route, professor)
  }

  updateProfessor(professor: IUser) {
    return this.http.put<IUser>(
      environment.API_ENDPOINT + this.route + professor._id,
      professor
    )
  }

  deleteProfessor(professorId: string) {
    return this.http.delete<IUser>(environment.API_ENDPOINT + this.route + professorId)
  }
}
