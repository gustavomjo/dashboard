import { parse } from 'date-fns';
import moment from 'moment';

// src/globals.ts
export const globalVars = {
  gbTimerRefresh : 100,
  gbMobile : false,
}

export const globalData = {
  gbMeses: [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ],
  gbData_atual : new Date(),
  gbDataHoje : moment(new Date()).format('DD-MM-YYYY'),
  gbMes_atual : mes_dia_atual(new Date(),'M'),
  gbDia_atual : mes_dia_atual(new Date(),'D'),
  gbAno : new Date().getFullYear(),
  convertToDate(dateString: string): Date {
    return parse(dateString, 'dd-MM-yyyy', new Date());
  }

};

export const globalCores = {
  gbCores : ['#00ce77','#ff6384','#36a2eb','#cc65fe','#ffce56',
             '#f0ee07','#ee5700','#54f410','#107ef4','#8972fa',
             '#fa72d1','#a43537','#ebf68c','#4dc9f6','#8549ba',
             '#f67019','#f53794','#537bc4','#acc236','#166a8f',
             '#00a950','#58595c'

          ],


  gbCoresTransp : ['#00ce7790','#ff638490','#36a2eb90','#cc65fe90','#ffce5690',
                   '#f0ee0790','#ee570090','#54f41090','#107ef490','#8972fa90',
                   '#fa72d190','#a4353790','#ebf68c90','#4dc9f690','#8549ba90',
                   '#f6701990','#f5379490','#537bc490','#acc23690','#166a8f90',
                   '#00a95090','#58595b90'

    ],
}

export const globalCoresNome = {
  colorBlue : globalCores.gbCores[2],
  colorGray : globalCores.gbCores[21],
  colorRed : globalCores.gbCores[1],
  colorGreen : globalCores.gbCores[0],
  colorYellow : globalCores.gbCores[4],
}

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

export function cleanStringUnicode(input: string): string {
  // Remove caracteres de controle e caracteres Unicode indesejados
  return input.replace(/[\u0000-\u001F\u007F-\u009F\u0100-\u017F\u0180-\u1FFF\u2000-\u206F\u2C00-\u2FEF\u3000-\u303F\u3400-\u4DBF\u4E00-\uAFFF\uB000-\uBFFF\uC000-\uD7FF\uE000-\uF8FF\uF900-\uFAFF\uFB00-\uFBFF\uFC00-\uFFFF\u2000-\u206F]/g, '');
}
export function lpad(str: string, length: number, padChar: string = ' '): string {
  // Calcula quantos caracteres de preenchimento são necessários
  let padding = '';
  let padLength = length - str.length;

  // Concatena o caractere de preenchimento até alcançar o comprimento desejado
  while (padding.length < padLength) {
    padding += padChar;
  }

  // Adiciona o padding à esquerda da string original
  return padding.slice(0, padLength) + str;
}

function mes_dia_atual(dt: Date,dia_mes :string): string {
  let str = '';
  switch(dia_mes){
    case 'D' :
      str = String(dt.getDate());
      break;
    case 'M' :
      str = String(dt.getMonth()+1);
      break;
  }
  let length = 2;
  let padding = '';
  let padLength = length - str.length;


  // Concatena o caractere de preenchimento até alcançar o comprimento desejado
  while (padding.length < padLength) {
    padding += '0';
  }

  // Adiciona o padding à esquerda da string original
  return padding.slice(0, padLength) + str;
}



