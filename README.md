# UniVerse - University Management System

Spring Boot backend with a static HTML/CSS/JS frontend, now configured for MySQL.

## Prerequisites

- Java 17 or newer
- MySQL 8.x running locally or on a reachable host
- No global Maven install required because the project includes the Maven Wrapper (`mvnw` / `mvnw.cmd`)

## Database configuration

The backend now reads MySQL settings from these environment variables:

- `UMS_DB_URL`
- `UMS_DB_USERNAME`
- `UMS_DB_PASSWORD`

You can also put local MySQL settings in `ums/local-db.properties`. That file is ignored by Git and is loaded automatically on startup.

If you do not set `UMS_DB_URL`, the app defaults to:

```text
jdbc:mysql://localhost:3306/ums?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Kolkata
```

The username and password must be provided either through environment variables or `ums/local-db.properties`.

## How to run

1. Open a terminal in the `ums` folder:

```text
cd ums
```

2. Optional: set your MySQL credentials before starting the app.

Windows PowerShell:

```powershell
$env:UMS_DB_URL="jdbc:mysql://localhost:3306/ums?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Kolkata"
$env:UMS_DB_USERNAME="root"
$env:UMS_DB_PASSWORD="your_password"
```

Or edit `ums/local-db.properties` and set:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ums?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Kolkata
spring.datasource.username=ums_app
spring.datasource.password=change_me_ums
```

Recommended one-time MySQL setup:

1. Connect to MySQL using MySQL Workbench or the MySQL command line as an administrator account.
2. Run the script at `ums/mysql/init-ums.sql`.
3. Keep the same username and password in `ums/local-db.properties`.

3. Start the server.

Windows:

```text
.\mvnw.cmd spring-boot:run
```

macOS / Linux:

```text
./mvnw spring-boot:run
```

4. Open the site in your browser:

- `http://localhost:8080/`
- `http://localhost:8080/index.html`

## Fresh database behavior

- Demo data seeding is disabled by default.
- The previous local H2 database has been removed from the project.
- A brand-new MySQL database will start with empty tables and no default users.

To log in for the first time, create an application user in MySQL, start the backend, and then insert the first login row into the `users` table. This project accepts plain-text passwords already stored in the `users` table, so a simple bootstrap insert works:

```sql
INSERT INTO users (username, password, full_name, role)
VALUES ('admin', 'admin123', 'Administrator', 'ADMIN');
```

After that, you can sign in with:

- User ID: `admin`
- Password: `admin123`

## Important notes

- Use `http://localhost:8080/...` when working with the full app.
- Canonical frontend files live under `ums/src/main/resources/static/`.
- Runtime uses MySQL. Tests use an in-memory H2 database so the backend can still be verified locally without a running MySQL server during test execution.

## Optional build

From the `ums` folder:

```text
.\mvnw.cmd clean package
```
