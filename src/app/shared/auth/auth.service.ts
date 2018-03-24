import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './auth.model';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {
  private authUserUrl = 'api/users';  // URL to web api
  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) { }

  isAuthenticated() {
    return false;
  }

  /** GET heusersroes from the server */
  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.authUserUrl)
      .pipe(
        tap(users => this.logger.log(`fetched users`)),
        catchError(this.handleError('getUsers', []))
      );
  }

  /** GET user by id. */
  getUser(username: string): Observable<User> {
    const url = `${this.authUserUrl}/${username}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.logger.log(`fetched user id=${username}`)),
      catchError(this.handleError<User>(`getUser id=${username}`))
    );
  }

  /** POST: add a new user to the server */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.authUserUrl, user, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((user: User) => {
        this.logger.log(`added user w/ id=${user.username}`);
      }),
      catchError(this.handleError<User>('addUser'))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.logger.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
