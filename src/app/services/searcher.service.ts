import { BehaviorSubject, Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api';

export type SelectOption<T = string> = {
  value: T;
  text: string;
  template: string;
};

export abstract class SearcherService<T> {
  private take = 10;
  private skip = 0;
  private total = Number.MAX_SAFE_INTEGER;

  lastTerm: string;

  private data$ = new BehaviorSubject<T[]>(null);

  protected headers: HttpHeaders;

  private cachedData = new Map<
    string,
    {
      data: T[];
      skip: number;
    }
  >();

  all$ = this.data$.asObservable();

  dataOptions$?: Observable<SelectOption<string>[]>;

  protected http: HttpClient;
  protected abstract endpoint: string;

  constructor(protected injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  get currentCount() {
    return (this.data$.getValue() || []).length;
  }

  getData(term: string = '', endpoint?: string) {
    const termIsDifferent = term !== this.lastTerm;
    if (termIsDifferent) {
      this.skip = 0;
      this.lastTerm = term;
      this.total = Number.MAX_SAFE_INTEGER;
    }

    if (
      this.cachedData.has(term) &&
      this.cachedData.get(term).skip >= this.skip
    ) {
      this.data$.next(this.cachedData.get(term).data);
      this.skip = this.cachedData.get(term).skip;
    } else if (this.currentCount < this.total) {
      const { headers } = this;
      this.http
        .get<ApiResponse<T[]>>(
          `${environment.API_ENDPOINT}${endpoint || this.endpoint}`,
          {
            params: {
              name: term,
              take: this.take.toString(),
              skip: this.skip.toString(),
            },
            headers,
          }
        )
        .subscribe((res) => {
          const currData = this.data$.getValue() || [];
          const data = !termIsDifferent ? [...currData, ...res.docs] : res.docs;

          this.skip += res.docs.length;
          this.cachedData.set(term, {
            data,
            skip: this.skip,
          });

          this.data$.next(data);
        });
    }
  }
}
