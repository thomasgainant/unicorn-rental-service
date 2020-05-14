# Unicorn rental service

### Running the server

#### With Docker and Docker compose

Simply run:

```
docker-compose up
```

Queries to the backend are to be made on **localhost:3000**

To view the backend documentation with how to query it:

```
open http://localhost:3000/docs
```

Database administration on **localhost:3001** using the following login data:

```
    host: db-unicorn:3308
    user: root
    password: root
    database: unicorn
```

If you are using Docker Toolbox, localhost should be replaced to the Docker machine default network IP (probably 192.168.99.100)

#### Without Docker & docker compose

Every occurences of "db-unicorn" should replaced by "127.0.0.1" in the services

To run the server, run:

```
npm install
npm start
```

To view the Swagger UI interface:

```
open http://localhost:3000/docs
```

Runs on MySQL, should have a MySQL server with the following connection information:
- host: localhost
- login: root
- password: root
- port: 3308
- database: unicorn