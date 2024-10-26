# Knowledge and Facts

Instead of using `npx prisma migrate dev --name init` to apply and track database schema changes, `prisma db push` can also be used to sync the schema. However, `prisma migrate` is generally preferred because it automatically creates migration files that maintain a version history of changes, allowing for easier rollbacks and better collaboration on schema modifications.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Explanation of the prisma.ts code that is used to setup the database 

1. **Imports**:
   ```javascript
   import { PrismaClient } from "@prisma/client";
   ```
   This line imports the `PrismaClient` from the Prisma client package, which is the main interface for interacting with your database.

2. **Singleton Function**:
   ```javascript
   const prismaClientSingelton = () => {
       return new PrismaClient();
   }
   ```
   This function creates and returns a new instance of `PrismaClient`. The purpose of using a singleton is to ensure that only one instance of `PrismaClient` is created in your application, which helps to manage database connections efficiently.

3. **Global Variable for Prisma**:
   ```javascript
   const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
   ```
   This line defines a variable `globalForPrisma` that uses TypeScript's type assertion to indicate that it can contain an optional `prisma` property of type `PrismaClient`. `globalThis` allows access to the global context (like `global` in Node.js or `window` in browsers).

4. **Initialize Prisma Instance**:
   ```javascript
   const prisma = globalForPrisma.prisma || prismaClientSingelton();
   ```
   Here, it checks if `globalForPrisma.prisma` already exists. If it does, it uses that instance; if not, it creates a new one using the `prismaClientSingelton` function. This ensures that during development, when the code may run multiple times (e.g., with hot reloading), it doesn't create multiple instances of `PrismaClient`.

5. **Exporting the Prisma Instance**:
   ```javascript
   export default prisma;
   ```
   This exports the `prisma` instance, allowing other parts of your application to use it for database operations.

6. **Development Environment Check**:
   ```javascript
   if (process.env.NODE_ENV !== "production") {
       globalForPrisma.prisma = prisma;
   }
   ```
   This condition checks if the application is not in production mode. If it's in development mode, it assigns the `prisma` instance to `globalForPrisma.prisma`, making it available globally for reuse.

### Using `??` vs. `||`

The `??` operator is called the **nullish coalescing operator**. It behaves differently than the `||` (logical OR) operator:

- **`||` (Logical OR)**: 
  - It returns the right-hand side value if the left-hand side value is falsy. This includes `0`, `""` (empty string), `null`, `undefined`, and `NaN`.
  - Example:
    ```javascript
    const value = undefined || "default"; // value is "default"
    const value2 = "" || "default"; // value2 is "default"
    ```

- **`??` (Nullish Coalescing)**:
  - It returns the right-hand side value only if the left-hand side value is `null` or `undefined`.
  - Example:
    ```javascript
    const value = undefined ?? "default"; // value is "default"
    const value2 = "" ?? "default"; // value2 is ""
    ```
  
### Why Use `??` Instead of `||`?

Using `??` is preferred when you want to provide a fallback value specifically for `null` or `undefined`, but still want to accept other falsy values like `0` or `""`. This can be especially useful in scenarios where those values are valid inputs.

### Conclusion

In my code, if I were to replace `||` with `??`, the behavior would change such that `prismaClientSingelton()` would only be called if `globalForPrisma.prisma` is strictly `null` or `undefined`. This can help avoid unintentionally creating a new instance when `globalForPrisma.prisma` might hold a valid, falsy value like `0` or an empty string.
