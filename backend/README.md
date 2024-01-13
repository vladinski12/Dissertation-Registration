# Backend

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Step 1: Install dependencies

```yarn install```

### Step 2: Ensure that you have a .env file in the root directory with the following variables:

```NODE_ENV=development```
```PORT=3000```
```JWT_ACCESS_SECRET="secret"```
```DATABASE_URL="file:./database.sqlite"```
```MAX_FILE_SIZE=1000000```

### Step 3: Generate database and seed data

```yarn setup-db```

### Step 4: Start the development server

```yarn dev```



## Migrations

- Generate migrations + prisma client `yarn prisma migrate dev --name NAME`
- Generate prisma client `yarn prisma generate`
- Run pending migrations `yarn prisma migrate deploy`
- Show migration status `yarn prisma migrate status`
- Open Studio `yarn prisma studio`