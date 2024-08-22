export function moneyReduct(val:number){
  /*Função desenvolvida para reduzir os numeros Ex: 41.000,50 o resultado será 41k */
    let cont =0;
    let arr : any[]=['', 'K', 'M', 'B', 'T', 'q', 'Q'];
    let n = val > 0? true:false;
    if(!n){
      val = val * -1;
    }

    while( val >= 1000){
      val = val / 1000;
      cont++;
    }

    if(!n){
      val = val * -1;
    }
    return val.toFixed(2)+arr[cont];
  }
