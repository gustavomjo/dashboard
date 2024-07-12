import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cardatend } from '../../models/dash/cardatend.model';
import {Busca} from '../../globals.services';


@Injectable({
  providedIn : 'root'
})

export class CardAtendService{

  constructor( private Busca : Busca){}

  async getCardAtend(){
    return await this.Busca.getHtml<cardatend[]>('/cardatend');
  }
}
