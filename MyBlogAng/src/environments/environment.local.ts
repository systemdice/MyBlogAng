// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  ge1: false,
  ge2: false,
  ge4: false,
  dev: true,
  perf: false,

  securityApi: 'http://localhost:58943',
  masterDataApi: 'http://localhost:63338',
  workflowManagerApi: 'http://localhost:63347',
  materialApi: 'http://localhost:61569',

  itemApi: 'http://localhost:55113',
  gdossiApi: 'http://localhost:61993',
  chassisApi: 'http://localhost:61991',
  emailApi: 'http://localhost:60994',

  apiVersion: '1.0',
  appName: 'Product Master',

  environmentName: 'dev'
};
