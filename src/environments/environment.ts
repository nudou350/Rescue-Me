// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    projectId: 'resgate-me',
    appId: '1:280956106382:web:72caeb7bbb347dce4efbdf',
    databaseURL: 'https://resgate-me-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'resgate-me.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyABXNGSZ8LY0pTAGNadMdbjmKzI_19c48o',
    authDomain: 'resgate-me.firebaseapp.com',
    messagingSenderId: '280956106382',
    measurementId: 'G-QNL5EHQQXC',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
