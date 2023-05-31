## Getting Started

First, get a provisioned postgre server on [https://railway.app](Railway).
then add the DATABASE_URL to your .env file

## install dependencies

```
npm install
```

## Migrate the database schema

```
npx prisma migrate dev
```

## Add assets and subscription

Use postman or insomia to register assets that users can subscribe to.
Endpoints are in src/pages/api folder

```
/api/add-asset
/api/add-subscriber
```

## enable contract event listner

```
node tracker/listener.js
```
