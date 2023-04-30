/**
 * The function generates a Docker Compose service configuration for a given service name and port
 * number.
 * @param service - The `service` parameter is an object that contains information about a service,
 * including its name and port number.
 * @returns The `generateService` function returns a string that represents a Docker Compose service
 * configuration for a specific service. The returned string includes the service name, port number,
 * container name, build context, Dockerfile path, port mapping, volume mapping, and the command to run
 * the service.
 */
const generateService = (service) => {
  const serviceName = service.name;
  const portNumber = service.port;

  return `
    gradely-${serviceName}:
      container_name: ${serviceName}-app
      build: 
        context: ./gradely-${serviceName}
        dockerfile: Dockerfile
      ports:
        - ${portNumber}:8080
      volumes: 
        - ./gradely-${serviceName}:/app
        - '/app/node_modules'
      command: npm run serve
  `;
};

module.exports = generateService;
