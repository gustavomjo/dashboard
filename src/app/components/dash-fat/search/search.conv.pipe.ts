import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name : 'searchConvenio'
})

export class searchConvenio implements PipeTransform{
  transform(value: any[], args?: any): any[] {
    if(!args || args.length < 3 || args.trim()==='')
      return value;

    args = args.trim().toUpperCase();
    return value.filter((dados:any)=>{
      if(typeof dados.convenio ==='string')
        return dados.convenio.toUpperCase().includes(args);
      else
        return false;
    })

  }
}

