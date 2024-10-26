# Knowledge and Facts

Instead of using `npx prisma migrate dev --name init` to apply and track database schema changes, `prisma db push` can also be used to sync the schema. However, `prisma migrate` is generally preferred because it automatically creates migration files that maintain a version history of changes, allowing for easier rollbacks and better collaboration on schema modifications.

--

# Phases of Development

**Phase 1:**

Using Neon.tech as a serverless PostgreSQL database, we’ll use Prisma to visualize it (though a more modern alternative is Drizzle).

1. **Initialize Prisma**: Start by creating a Prisma schema and pushing it to the database.
2. **Define a Model**: Create your database model.
3. **Push the Model to the Database**: Use Prisma as an ORM.

## Steps of Set-up :

   1. **Install Prisma as a Development Dependency**:
      ```bash
      npm install prisma --save-dev
      ```

   2. **Initialize Prisma**: Specify the data source provider (in this case, PostgreSQL):
      ```bash
      npx prisma init --datasource-provider postgresql
      ```

   3. **Generate Necessary Files**:
      ```bash
      npx prisma generate
      ```

   4. **Create and Apply the Migration**:
      ```bash
      npx prisma migrate dev --name init
      ```

   5. **Format the Model File**:
      ```bash
      npx prisma format
      ```