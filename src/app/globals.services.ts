/***
 * Esta Global sera somente para conexoes e requests
*/
import { catchError, delay, map, retryWhen, take, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class Busca{
  public url = environment.api;
  public token: string | null =  localStorage.getItem('token');
  private header!: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.headerJWT();
  }

  getHtml<T>(request: string): Observable<HttpResponse<T>> {
    return this.httpClient.get<T>(this.url+request, { headers: this.header, observe: 'response' }).pipe(
      tap(response => {
        this.token = localStorage.getItem('token');
      }),
      catchError(error => {
        console.error('Erro ao subscrever:', error);
        this.upToken();
        return throwError(error);
      }),
      retryWhen(errors =>
        errors.pipe(
          tap(() => {
            console.log('Tentando novamente com novo token:', this.token);
          }),
          delay(5000),
          take(10)
        )
      )
    );
  }

  //neste falta realizar o update token, ainda nao consegui fazer com que o token seja alterado

  private upToken() {
    this.token = localStorage.getItem('token');
    this.headerJWT(this.token);
  }

  private headerJWT(token: string | null = this.token) {
    this.header = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
}


