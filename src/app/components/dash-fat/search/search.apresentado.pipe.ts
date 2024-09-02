import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name : 'searchApresentado'
})

export class searchApresentado implements PipeTransform{
  transform(value: any[], args?: string): any[] {
    // console.log(args)
    if ( args === 'N') {
      return value;
    }
    return value.filter((dados: any) => {
      return dados.apresentado === args;
    });
  }
}

