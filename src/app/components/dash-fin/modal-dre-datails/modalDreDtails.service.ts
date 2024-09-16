import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable
({
  providedIn:'root'
})

export class ModalDreDetailsService{

  private descricao = new BehaviorSubject<string>(''); // Dados iniciais
  private tipo = new BehaviorSubject<string>(''); // Dados iniciais
  private cod_grupo = new BehaviorSubject<string>(''); // Dados iniciais
  private cod_subgrupo = new BehaviorSubject<string>(''); // Dados iniciais
  private cod_cc = new BehaviorSubject<string>(''); // Dados iniciais

  currentdescricao = this.descricao.asObservable();
  currenttipo = this.tipo.asObservable();
  currentcod_grupo = this.cod_grupo.asObservable();
  currentcod_subgrupo = this.cod_subgrupo.asObservable();
  currentcod_cc = this.cod_cc.asObservable();
  constructor() { }

  change(descricao:string,tipo:string,cod_grupo: string, cod_subgrupo: string,cod_cc : string) {
    this.descricao.next(descricao)
    this.tipo.next(tipo)
    this.cod_grupo.next(cod_grupo);
    this.cod_subgrupo.next(cod_subgrupo);
    this.cod_cc.next(cod_cc);
  }

}
