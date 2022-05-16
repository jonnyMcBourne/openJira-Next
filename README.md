# Next.js OpenJira
### To install node modules and run next
```
yarn install
yarn dev or npm run dev
```
To run it locally, it's needed a databade
```
docker-compose up -d
```
## configure environment variables
rename the file __.env.template__ to __.env__ 
###         Configure Database 
environment variable for development
```
 MONGO_URL=mongodb://localhost:27017/entriesdb
```
## to seed database
you have to hit the following endpoint:
```
http://localhost:3000/api/seed 
```