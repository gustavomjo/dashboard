import { Pipe,PipeTransform } from '@angular/core';

@Pipe({
  name : 'searchGrupo'
})
export class searchGrupo implements PipeTransform{
  transform(value: any[], args?: any): any[] {

    if (!args || args.length < 4 || args.trim() === ''  ) {
      return value;
    }

    args = args.trim().toUpperCase();

    return value.filter((item: any) => {
      if (typeof item.ds_grupoprod === 'string') {
        return item.ds_grupoprod.toUpperCase().includes(args);
      }
      return false;
    });
  }

}

