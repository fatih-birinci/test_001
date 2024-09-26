
## Prisma Commands

Here is some useful commands for using prisma to generate migrations and apply it to database.

1. Create a Migration
```bash
npx prisma migrate dev --name <migration_name>
```

2. Apply Migrations to the Database
```bash
npx prisma migrate deploy
```

3. Check the Status of Migrations
```bash
npx prisma migrate status
```

4. If you encounter any issues during migration, you can reset the migration history and start over by running
```bash
npx prisma migrate reset
```

## Jest Commands

Below are some useful commands for running tests, generating coverage reports, and more.

1. **Run All Tests**: This command runs all the tests in your project. Jest will automatically find and run any test files that match the pattern `*.test.js`, `*.test.ts`, or `*.spec.js/ts`.
   ```bash
   npx jest
   ```


2. **Run Tests in Watch Mode**: This command runs Jest in watch mode. It reruns the tests when you make changes to your files, which is useful during development.
   ```bash
   npx jest --watch
   ```

3. **Run a Single Test File**: Replace `<path_to_test_file>` with the path to the specific test file you want to run. This is useful when you want to focus on a particular test file.
   ```bash
   npx jest <path_to_test_file>
   ```
  

4. **Generate a Code Coverage Report**: This command runs all your tests and generates a code coverage report. The report shows how much of your code is covered by tests, which helps ensure your tests are thorough.
   ```bash
   npx jest --coverage
   ```


5. **Run Tests with a Specific Pattern**: Replace `<pattern>` with a regex pattern to match specific test files. For example, `npx jest --testPathPattern=".*user.*"` will run tests that have "user" in their filename.
   ```bash
   npx jest --testPathPattern="<pattern>"
   ```


6. **Run Tests in Silent Mode**: This command runs tests without displaying the console output from the tests, which can be useful if you want to focus only on test results.
   ```bash
   npx jest --silent
   ```


7. **Clear Jest Cache**: This command clears Jest's cache, which can sometimes help resolve issues related to outdated cache files.
   ```bash
   npx jest --clearCache
   ```

8. **Run Tests in Parallel (with multiple cores)**: Replace `<num>` with the number of CPU cores you want Jest to use. Jest runs tests in parallel by default, but you can control the number of workers with this option.
   ```bash
   npx jest --maxWorkers=<num>
   ```
