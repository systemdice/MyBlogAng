"use strict";
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

exports.environment = {
    production: false,
    ge1: false,
    ge2: false,
    dev: true,
    perf: false,

    securityApi: 'https://productmdm-security-api-dev.ausvdc02.pcf.dell.com',
    masterDataApi: 'https://productmdm-masterdata-api-dev.ausvdc02.pcf.dell.com',
    workflowManagerApi: 'https://productmdm-workflowmanager-api-dev.ausvdc02.pcf.dell.com',
    materialApi: 'https://productmdm-material-api-dev.ausvdc02.pcf.dell.com',

    itemApi: 'https://productmdm-item-api-dev.ausvdc02.pcf.dell.com',
    gdossiApi: 'https://productmdm-gdossi-api-dev.ausvdc02.pcf.dell.com',
    chassisApi: 'https://productmdm-chassis-api-dev.ausvdc02.pcf.dell.com',
    
    apiVersion: '1.0',
    appName: 'Product Master'
};
//# sourceMappingURL=environment.js.map
