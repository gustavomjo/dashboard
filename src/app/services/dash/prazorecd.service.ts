
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { prazorecd } from '../../models/dash/prazorecd.model';
import {Busca} from '../../globals.services';

@Injectable({
  providedIn : 'root'
})

export class PrazoRecDService{
  private url = environment.api;
  constructor( private Busca : Busca){}

  async getPrazoRecD(){
    return await this.Busca.getHtml<prazorecd[]>('/prazoreceb')
  }
}
