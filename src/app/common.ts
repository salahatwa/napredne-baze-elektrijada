import { HttpErrorResponse } from '@angular/common/http'
import { throwError } from 'rxjs'

export function transformError(error: HttpErrorResponse | string) {
  let errorMessage = 'An unknow error has occured'
  if (typeof error === 'string') {
    errorMessage = error
  } else if (error.error instanceof ErrorEvent) {
    errorMessage = `Error! ${error.error.message}`
  } else if (error.status) {
    errorMessage = `Request faied with ${error.status} ${error.statusText}`
  }
  return throwError(errorMessage)
}

export const transformDateNumber = (date: number) => {
  return date < 10 ? `${0}date` : `${date}`
}
