import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComboCheckService {
  List : any[]=[];
  ListChecked : any[]=[];
  UpdateList : boolean = false;
  selectedALL : boolean = true;
  selectedOptionsText : string = 'Selecionar opções desejada';

  private updateSubjectSelected = new Subject<void>();
  private updateCallbacksSelected: (() => void)[] = [];

  private updateSubjectLista = new Subject<void>();
  private updateCallbacksLista: (() => void)[] = [];

  constructor(){
    this.updateSubjectSelected.subscribe(()=>{
      this.updateCallbacksSelected.forEach(callback => callback());
    })

    //lista
    this.updateSubjectLista.subscribe(()=>{
      this.updateCallbacksLista.forEach(callback => callback());
    })
  }

  addOnUpdateCallbackSelected(callback: () => void): void {
    this.updateCallbacksSelected.push(callback);
  }

  notifyUpdateSelected(): void {
    this.updateSubjectSelected.next();
  }

  //Lista
  addOnUpdateCallbackLista(callback: () => void): void {
    this.updateCallbacksLista.push(callback);
  }

  notifyUpdateLista(): void {
    if (this.UpdateList){
      this.updateSubjectLista.next();
      this.UpdateList = false;
    }

  }



}
