# Dashboard Hospitalar 🏥

Este projeto é um **dashboard hospitalar** desenvolvido em Angular e TypeScript, com backend em Delphi, para auxiliar na gestão e monitoramento de informações críticas de um hospital. O sistema oferece uma visão geral de diversos setores e facilita a tomada de decisões por meio de gráficos, relatórios e métricas detalhadas.

---

## 🛠 Tecnologias Utilizadas

- **Frontend**: Angular 9, TypeScript, HTML5, CSS3
- **Backend**: Delphi
- **Banco de Dados**: Relacional com alto volume de dados
- **Outras Ferramentas**: Docker, Nginx, FontAwesome

---

## 🎯 Funcionalidades

- **Gestão de Setores**: Visualização e controle de setores como farmácia, faturamento, financeiro e recepção.
- **Relatórios e Gráficos**: Exibição de dados em gráficos interativos, com possibilidade de exportação em PDF.
- **Monitoramento em Tempo Real**: Atualizações automáticas para informações críticas.
- **Filtro Avançado**: Busca eficiente por dados utilizando filtros específicos.
- **Configuração Dinâmica**: Integração com `configService` para carregar configurações antes de realizar requisições.

---

## 📦 Estrutura do Projeto

```plaintext
├── src
│   ├── app
│   │   ├── components
│   │   ├── services
│   │   ├── pipes
│   │   ├── models
│   │   └── modules
│   ├── assets
│   └── environments
├── Dockerfile
├── angular.json
├── package.json
└── README.md
```

## 🚀 Como Rodar o Projeto
Pré-requisitos:

Node.js
Angular CLI
Docker (opcional)
Instalação: Clone o repositório e instale as dependências:

```
git clone https://github.com/seuprojeto/dashboard-hospitalar.git
cd dashboard-hospitalar
npm install
```
## Executar o Frontend:

```
ng serve
Acesse o aplicativo em http://localhost:4200.
```

## Executar com Docker (opcional):

```
docker build -t dashboard-hospitalar .
docker run -p 8080:80 dashboard-hospitalar
```
## 🧩 Personalização

- **Configurações:** Altere as configurações em src/environments/environment.ts.
- **Estilos:** Personalize os estilos em src/styles.css.
##📝 Contribuição
Sinta-se à vontade para contribuir! Para começar:

## Faça um fork do projeto.
Crie uma nova branch:
```
git checkout -b minha-nova-feature
```
Envie suas alterações:
```
git push origin minha-nova-feature
```

## 📄 Licença
Este projeto está sob a licença da Lucedata Ltda. Consulte o arquivo LICENSE para mais informações.

## 💬 Contato
Se você tiver dúvidas ou sugestões, entre em contato:

**Email:** mikizo.jo@gmail.com

**LinkedIn:** https://www.linkedin.com/in/gustavojo/
