FROM node:21

COPY package.json .

RUN npm i

COPY . . 

EXPOSE 5173

CMD ["npm", "run", "build"]