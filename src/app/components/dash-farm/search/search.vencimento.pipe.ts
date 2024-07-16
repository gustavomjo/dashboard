import { Pipe,PipeTransform } from '@angular/core';

@Pipe({
  name : 'searchVencimento'
})
export class searchVencimento implements PipeTransform{
  transform(value: any[], args?: any): any[] {

    if (!args || args == -2 ) {
      return value;
    }

    // args = args.trim().toUpperCase();
    // console.log(value)
    return value.filter((item: any) => {
      if (typeof item.dias_search === 'string') {
        // console.log(args)

        return item.dias_search.toUpperCase().includes(args);
      }
      return false;
    });
  }

}
