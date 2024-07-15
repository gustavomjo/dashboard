import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCurvaABC'
})
export class searchCurvaABC implements PipeTransform {

  transform(value: any[], args?: any): any[] {

    if (!args || args.length < 4 || args.trim() === '') {
      return value;
    }

    args = args.trim().toUpperCase();

    return value.filter((item: any) => {
      if (typeof item.nome_com === 'string') {
        return item.nome_com.toUpperCase().includes(args);
      }
      return false;
    });
  }

}
