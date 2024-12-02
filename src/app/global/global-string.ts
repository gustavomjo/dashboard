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

export function removeSpecialCharacters(str: string): string {
  return str
    // .replace(/º/g, 'ro')                       // Troca "º" por "ro"
    .normalize("NFD")                          // Decompor caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "")           // Remover marcas de acentuação
    .replace(/[^\w\sº]/gi, '');                 // Remover outros caracteres especiais, mantendo letras, números, espaços e "º"
}

export function BoolToString(b : boolean){
  return b==true?'S':'N';
}

export function formatSQL(query: string): string {
  // Definir os termos que devem ser seguidos de uma quebra de linha
  const keywords = [
    "SELECT",
    "FROM",
    "INNER JOIN",
    "LEFT JOIN",
    "RIGHT JOIN",
    "WHERE",
    " AND",
    "GROUP BY",
    "CREATE",
    "ORDER BY",
    "WHEN",
    "ELSE",
    ";",
    // ",",
  ];


  // Evitar quebra na expressão "YEAR FROM"
  let formattedQuery = query.replace(/YEAR FROM/gi, "YEAR_PARA");
  // formattedQuery = query.replace(/JOIN/gi, "INNER JOIN");

  // Adicionar quebras de linha antes das palavras-chave SQL
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\s*${keyword}\\s*`, "gi");
    if ([';', ',',' AND'].includes(keyword)) {
      formattedQuery = formattedQuery.replace(regex, ` ${keyword}\n`);
    } else {
        formattedQuery = formattedQuery.replace(regex, `\n${keyword} `);
    }

  });

  // Restaurar a expressão "YEAR FROM"
  formattedQuery = formattedQuery.replace(/YEAR_PARA/gi, "YEAR FROM");

  // Remover quebras de linha extras e espaços em branco em cada linha
  formattedQuery = formattedQuery
    .split("\n")
    .map(line => line.trim())
    .join("\n");

  return formattedQuery;
}

