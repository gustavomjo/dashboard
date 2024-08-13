#Estagio de copilação
FROM node:20-alpine as build-stage

#definir o diretorio de trabalho dentro do container
WORKDIR /app

#copiar arquivos de conf
COPY package*.json /app/

#instalar dependencias
RUN npm install

#copiar o restante dos arquivos do projeto
COPY . /app

#Copila para producao
RUN npm run build

#Estagio de publicacao
from nginx:alpine as publish-stage

#Copia os arquivos copilados do estagio de copilacao para o diretorio
COPY --from=build-stage /app/dist/dashboard-app/browser /usr/share/nginx/html

#Expondo porta
EXPOSE 80

#inicia o nginx e mantem o processo em primeiro plano
CMD ["nginx", "-g", "daemon off;"]
