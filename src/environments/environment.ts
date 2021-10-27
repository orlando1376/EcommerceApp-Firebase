// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: 'default',
  firebase: {
    config: {
      apiKey: "AIzaSyBwQ-5R7uhmIi8IrQf6yFuRpnHLtDBV2yk",
      authDomain: "ecommerce-183cb.firebaseapp.com",
      projectId: "ecommerce-183cb",
      storageBucket: "ecommerce-183cb.appspot.com",
      messagingSenderId: "104649868227",
      appId: "1:104649868227:web:df99c983d0bf2b4e1cb376"
    }
  },
  actionCodeSettings: {
    url: 'http://localhost:5200/profile/new',
    handleCodeInApp: true
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
