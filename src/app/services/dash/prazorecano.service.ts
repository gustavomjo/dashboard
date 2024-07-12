
import { Injectable } from '@angular/core';
import { prazorecano } from '../../models/dash/prazorecano.model';
import {Busca} from '../../globals.services';

@Injectable({
  providedIn : 'root'
})

export class PrazoRecAnoService{

  constructor( private Busca : Busca){}

  async getPrazoRecAno(){
    return await this.Busca.getHtml<prazorecano[]>('/prazorecebano')
  }
}
