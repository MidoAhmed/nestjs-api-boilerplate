#here is usage of npm script commands to use typeorm migrations

1. $_> npm run migration:show

EXP: Show all migrations and whether they've been run or not
NB: This command also returns an error code if there are unapplied(has not been executed yet) migrations.


2. $_> npm run migration:generate ${MIGRATION_NAME}

EXP: Automatic migration generation creates a new migration file and writes all sql queries that must be executed to update the database.

3. $_> npm run migration:run

EXP: Execute all pending migrations and run them in a sequence ordered by their timestamps.


4. $_> npm run migration:revert

EXP: Execute down in the latest executed migration.



General NB: If you need to pass parameter with dash to npm script, you will need to add them after "--".
