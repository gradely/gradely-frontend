/* This is a JavaScript code that defines an array of objects called `serviceList`. Each object in the
array represents a service and has two properties: `name` and `port`. The `name` property is a
string that represents the name of the service, and the `port` property is a number that represents
the port number on which the service is running. */
const serviceList = [
  {
    name: "store",
    port: 8090,
  },
  {
    name: "shell",
    port: 8091,
  },
  {
    name: "auth",
    port: 8092,
  },
  {
    name: "lms",
    port: 8093,
  },
  {
    name: "assessment",
    port: 8094,
  },
  // {
  //   name: "lesson",
  //   port: 8095,
  // },
  // {
  //   name: "report-card",
  //   port: 8096,
  // },
];

module.exports = serviceList;
