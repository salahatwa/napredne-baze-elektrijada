import { Injectable, Injector } from '@angular/core';
import {
  SearcherService,
  SelectOption,
} from 'src/app/services/searcher.service';
import { IUser } from 'src/app/models/user.interface';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class UserSearchService extends SearcherService<IUser> {
  protected endpoint: string = 'users';

  dataOptions$: Observable<SelectOption<string>[]> = this.all$.pipe(
    filter(Boolean),
    map((users: IUser[]) =>
      users.map(
        ({ _id, username, imageURL }) =>
          ({
            value: _id,
            text: username,
            template: `<img src="${
              imageURL || 'assets/images/avatar.png'
            }"/> ${username}`,
          } as SelectOption<string>)
      )
    )
  );

  constructor(protected injector: Injector) {
    super(injector);
  }
}
