
# Docker Setup

This repository contains multiple applications that can be run together or individually using Docker.


### Prerequisites

Make sure you have the following installed before continuing:

- Docker
- Docker Compose

### Generate docker-compose

The `docker-compose.yml` has already been generated, with services listed within the `service-list.js` file. 

To add a new service update the `service-list.js` file with the service name and service port, a simple object below:

```bash
  {
    name: 'service-name', // 'store'
    port: 'service-port' //8090
  }
```

Upon adding this new service to the service list, run command. below:

```bash
node generate-compose.js
```

### Running Multiple Apps Together

To run all the applications together, simply navigate to the root directory. For a first time usage the base image needs to be built, hence we run:

```bash
./start-app.sh build
```
Then subsequently, we can run:

```bash
./start-app.sh
```

### Closing Multiple Apps Together

To close all apps together, we run:

```bash
./stop-app.sh
```

### Running a Specific App
On gradely, we have some couple of apps, such as gradely-auth, gradely-base etc. To run a specific app like the gradely-auth app, navigate to the root directory, not within any app, then on first usage, run:

```bash
./start-app.sh build auth
```

Then subsequently, we can run:

```bash
./start-app.sh - auth
```

### Closing a Specific App

To close a specific app, we run:

```bash
./stop-app.sh auth
```