import { Injectable } from '@angular/core';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

declare var gapi: any;

@Injectable()
export class GlobalEventsService {

  // Observable string sources
  private userLoggedInSource = new BehaviorSubject<any>("");

  // Observable string streams
  userLoggedInEvent$ = this.userLoggedInSource.asObservable();

  constructor() { }

  // Service message commands
  eventUserLogin(user: string) {
    this.userLoggedInSource.next(user);
  }


}
