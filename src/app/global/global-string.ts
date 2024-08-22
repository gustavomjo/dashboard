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

