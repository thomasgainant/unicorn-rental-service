# Unicorn rental service

## Coding challenge from Ambidexter GmbH

Unicorns the new taxis. We allow our customers to rent a unicorn and return it at any time later. When the unicorn is returned we charge the customer with 8 EUR per started rental hour.

## Challenge

Implement a simple microservice for unicorn rental.

It should:
- expose an endpoint ``/unicorns/rentals`` that allows for renting an unicorn
- expose an endpoint ``/unicorns/rentals`` that allows the return of a rented unicorn
- expose an appropriate ``/healtz`` endpoint that allows checking if the service works

Requirements:
- we only have four unicorns at the moment: "Pinky Pie", "Rainbow Dash", "Fluttershy" and "Twilight Sparkle"
- each unicorn can be rented once at any given moment
- each unicorn needs 15 minutes of rest between consecutive rentals, with the exception of "Twilight Sparkle", she needs 30 minutes

## My result

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
