FROM node
WORKDIR /home/ditsdev199/Desktop/nest-task
COPY . .
RUN npm install
EXPOSE 3001
CMD [ "npm", "run","start:dev"]