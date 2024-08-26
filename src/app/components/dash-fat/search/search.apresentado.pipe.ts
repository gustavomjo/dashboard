import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name : 'searchApresentado'
})

export class searchApresentado implements PipeTransform{
  transform(value: any[], args?: boolean): any[] {
    if ( args === false) {
      return value;
    }
    return value.filter((dados: any) => {
      return dados.apresentado === !args;
    });
  }
}

