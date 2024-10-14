import { Pipe,PipeTransform } from '@angular/core';

@Pipe({
  name : 'searchUsuario'
})
export class searchUsuario implements PipeTransform{
  transform(value: any[], args?: any): any[] {

    if (!args || args.length < 4 || args.trim() === ''  ) {
      return value;
    }

    args = args.trim().toUpperCase();

    return value.filter((item: any) => {
      if (typeof item.nome === 'string') {
        return item.nome.toUpperCase().includes(args);
      }
      return false;
    });
  }

}

