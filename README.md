# Market Inventory Tracker

> I've built this basic inventory tracker application to comprehend Prisma ORM and Vue.js.

## How to run

``` bash
# configure .env file in the server folder and paste your MySQL url

# locate server folder
cd server

# install dependencies
npm install

# Generate prisma client 👇
npx prisma generate

# use Prisma Migrate to create the tables in your database. 
npx prisma migrate dev --name init 

# run server
npm run serve
```

### And then follow the instructions in the client folder's README to serve Vue.js App
---
<br />

### Screenshots 👇
![new product added](https://user-images.githubusercontent.com/49078844/129269345-b6b01bb8-fb23-4fd7-95a8-2b766ea501d2.png)

![Buy product already exists](https://user-images.githubusercontent.com/49078844/129269214-ec544441-896d-483f-8ee5-2c1b28eaec68.png)

![Kategoriler](https://user-images.githubusercontent.com/49078844/129269580-45ab391f-f838-43bf-bab2-c50687e94cf2.png)

![Edit Page](https://user-images.githubusercontent.com/49078844/129269656-84495e65-2729-48ec-81f8-5171d4904ae9.png)

