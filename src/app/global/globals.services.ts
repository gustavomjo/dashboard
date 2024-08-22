import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, retryWhen, take, tap, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ConfigService } from '../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class Busca {
  private url!: string;
  private token: string | null = localStorage.getItem('token');
  private header!: HttpHeaders;

  constructor(private httpClient: HttpClient, private configService: ConfigService) {
    this.updateHeader();
    this.loadConfig();
  }

  private loadConfig() {
    this.configService.getConfig().subscribe(config => {
      this.url = config.servidor;
    }, error => {
      console.error('Erro ao carregar a configuração', error);
    });
  }

  getHtml<T>(request: string): Observable<HttpResponse<T>>{
    //utilizado o this.configService.getConfig para garantir que a config seja carregada antes de fazer a requisicao
    return this.configService.getConfig().pipe(
      switchMap(config => {
        this.url = config.servidor;
        return this.httpClient.get<T>(this.url + request, { headers: this.header, observe: 'response' }).pipe(
          tap(response => {
            this.token = localStorage.getItem('token');
          }),
          catchError(error => {
            console.error('Erro ao subscrever:', error);
            this.updateToken();
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
      })
    );
  }

  deleteRequest(request: string): void {
    // Utiliza this.configService.getConfig para garantir que a configuração seja carregada antes de fazer a requisição
    this.configService.getConfig().pipe(
      switchMap(config => {
        this.url = config.servidor;
        return this.httpClient.delete(this.url + request, { headers: this.header }).pipe(
          tap(() => {
            this.token = localStorage.getItem('token');
          }),
          catchError(error => {
            console.error('Erro ao subscrever:', error);
            this.updateToken();
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
      })
    ).subscribe();
  }

  postComponent(request: string, params : string): void {
    // Utiliza this.configService.getConfig para garantir que a configuração seja carregada antes de fazer a requisição
    this.configService.getConfig().pipe(
      switchMap(config => {
        this.url = config.servidor;
        console.log(this.header.getAll('Authorization'))

        return this.httpClient.post(this.url+request, params,  { headers: this.header }).pipe(
          tap(() => {
            this.token = localStorage.getItem('token');
          }),
          catchError(error => {
            console.error('Erro ao subscrever:', error);
            this.updateToken();
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
      })
    ).subscribe();
  }

  private updateToken() {
    this.token = localStorage.getItem('token');
    this.updateHeader(this.token);
  }

  private updateHeader(token: string | null = this.token) {
    this.header = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'

    });
  }
}
