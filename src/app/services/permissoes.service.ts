import { Injectable } from '@angular/core';
import {Busca} from '../global/globals.services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})

export class PermissoesService{

  constructor( private Busca : Busca){}

  postPermissoes(
    usuario: string,
    dash: string,
    dash_fin: string,
    dash_receitas: string,
    dash_fat: string,
    dash_farm: string,
    adm: string
  ): Observable<void> { // Alterado para retornar Observable<void>
    return this.Busca.postComponent(
      '/postpermissao',
      'usuario=' + usuario +
      '&dash=' + dash +
      '&dash_fin=' + dash_fin +
      '&dash_receitas=' + dash_receitas +
      '&dash_fat=' + dash_fat +
      '&dash_farm=' + dash_farm +
      '&adm=' + adm
    );
  }



}
