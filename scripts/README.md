check_slugs.js

This small script checks whether the `slug` column exists and how many articles have slugs, then attempts an HTTP GET to the API by slug.

Install prerequisites in the repo root if needed:

npm install mysql2 yargs

Run:

node scripts/check_slugs.js --password=<db_password> --slug=our-story --apiPort=3000

You can also set environment variables: MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, PORT
