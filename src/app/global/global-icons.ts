import { removeSpecialCharacters } from './global-string';

// Função para buscar ícone e cor com base no título
export function searchIco(title: string): { icon: string; color: string } {
  const normalizedTitle = removeSpecialCharacters(title.toUpperCase().trim());
  const iconMap: { [key: string]: { icon: string; color: string } } = {
    'ALA CENTRAL': { icon: 'fa fa-hospital', color: '#ee5700' },
    'ANDAR 2': { icon: 'fa fa-building', color: '#17a2b8' },
    'ANDAR 3': { icon: 'fa fa-building', color: '#17a2b8' },
    'ANDAR 4': { icon: 'fa fa-building', color: '#17a2b8' },
    'MATERNIDADE': { icon: 'fa fa-baby', color: '#ff69b4' },
    'REPOUSO': { icon: 'fa fa-bed', color: '#ffc107' },
    'UTI': { icon: 'fa fa-heartbeat', color: '#007bff' },
    'UTI NEONATAL': { icon: 'fa fa-baby-carriage', color: '#28a745' },
    'AGUARDANDO LEITO': { icon: 'fa fa-clock', color: '#6c757d' }, // Exemplo de ícone para "Aguardando Leito"
    '1º ANDAR': { icon: 'fa fa-building', color: '#17a2b8' },
    '2º ANDAR': { icon: 'fa fa-building', color: '#17a2b8' },
    '3º A': { icon: 'fa fa-building', color: '#17a2b8' }, // Exemplo de ícone
    '3º B': { icon: 'fa fa-building', color: '#17a2b8' }, // Exemplo de ícone
    '3º C': { icon: 'fa fa-building', color: '#17a2b8' }, // Exemplo de ícone
    '3º D': { icon: 'fa fa-building', color: '#17a2b8' }, // Exemplo de ícone
    'DAY HOSPITAL': { icon: 'fa fa-clock', color: '#6c757d' }, // Exemplo de ícone
  };

  return iconMap[normalizedTitle] || { icon: 'fa fa-question-circle', color: '#6c757d' }; // ícone padrão
}

