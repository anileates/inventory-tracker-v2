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
