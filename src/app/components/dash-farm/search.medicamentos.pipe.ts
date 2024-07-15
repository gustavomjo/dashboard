import { Pipe,PipeTransform } from '@angular/core';

@Pipe({
  name : 'searchMedicamentos'
})
export class searchMedicamentos implements PipeTransform{
  transform(value: any[], args?: any): any[] {

    if (!args || args.length < 4 || args.trim() === '') {
      return value;
    }

    args = args.trim().toUpperCase();

    return value.filter((item: any) => {
      if (typeof item.nome_sal === 'string') {
        return item.nome_sal.toUpperCase().includes(args);
      }
      return false;
    });
  }

}

