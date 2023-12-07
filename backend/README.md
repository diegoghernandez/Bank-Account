# Bank account backend

## Table of Contents

- [Technologies](#technologies)
- [Environment variables](#environment-variables)
- [Installation](#installation)
  - [Database configuration](#database-configuration)
  - [Initialization](#initialization)
- [Test](#test)
- [Docker](#docker)
  - [Extra](#extra)
- [User admin](#user-admin)
- [Swagger](#swagger)

## Technologies

- Java 17
- Spring 2.7
- Gradle 
- PostgresSQL
- Docker
- JUnit
- Javadoc

## Environment variables
> [!IMPORTANT]
> Before run the project, you must create and configure your **env.yml** following
> the [**env.example.yml**](/backend/src/main/resources/env.example.yml) configuration.

## Installation

> [!IMPORTANT]
> To run this project, you need:
> - Java 17
> - A postgres installation 
>   
> Or [docker](#docker)

### Database configuration

> [!NOTE]
> If you don't want to install and configure postgres, you can create a docker
> container with the [following command](#extra)

According to your postgres configuration, you must change some values in the 
[**application.yml**](/backend/src/main/resources/application.yml)

Here is an example of what values you must change.
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/bankaccount?createDatabaseIfNotExist=true
    username: postgres
    password: root
```

Once you have your configuration, create the database with the 
following command:
```bash
  CREATE DATABASE bankaccount;
```

### Initialization

Having the prerequisites, you can run the following commands to initialize it.
```bash
    cd backend/
    
    ./gradlew bootrun or gradlew bootrun
```
> [!TIP]
> If you are having the following error: `-bash: ./gradlew: Permission denied`
> 
> You can run the following command: `chmod +x gradlew`

## Test

To run the tests, run the following command:
```bash
    ./gradlew test or gradlew test
```
 
## Docker

The project includes a docker compose file, so you just need to run the following 
commands in the project root to initialize it.
```bash
    cd backend/
    
    docker compose build
    
    docker compose up
```

> [!IMPORTANT]
> Disclaimer, you need to pass a gmail email and the host password to have 
> the email functionality, you have two options:
> - Hardcode it in the [Dockerfile](Dockerfile) in the args: `ARG EMAIL, ARG PASSWORD`
> - Or write them in the docker compose command: `docker compose build --build-arg EMAIL=Your email --build-arg PASSWORD=Your password`

### Extra
> [!TIP]
> If you don't want to install postgres, you can run the following command to have 
> a functional container for the application.
>
> ```bash
>   docker run --name db --mount src=dbdata,dst=/data/db -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres
> ```

## User admin and demo

The admin and demo role have a special case, you can't create them from endpoints;
you must create them from the database, and for that, you must use the following 
commands, changing whatever you want.

> [!NOTE]
> This is only an example.
> 
> ```sql
>   INSERT INTO account VALUES 
>   (1, 'admin', 1.00, 'admin@example.names.com', TRUE, '$2y$10$Un4HCQQIK01fPnTwdcehfuuurHTY9gj7ATd8K1C8J84ClSbsS6Njm');
>   
>   INSERT INTO account_role VALUES (1, 'ADMIN', '2023-10-23 17:09:06.612875');
> ```

> [!IMPORTANT]
> ### Considerations:
> - For insert a password, you need to pass it for a bcrypt Hash Generator
> - The password used in the example is 123456
> - You must change the email if you want to use the endpoints that use an email,
    > because an email will send to that respective email with the tokens.

## Swagger

To see the documentation from all endpoints, you can see it from the following path
when the backend is initialized: /swagger-ui/index.html#/.

> [!NOTE]
> 👉 You can see how it's supposed to look like 
> [here.](https://bankback.azurewebsites.net/swagger-ui/index.html#)