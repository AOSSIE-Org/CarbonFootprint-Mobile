## Setup guide for testing

1. First of all create a new firebase app for a test database.
2. Browse https://console.firebase.google.com.
3. Generate an empty project.
4. Go to **Authentication** icon under **Develop** section, in the **sign-in-method** tab enable **email**.
5. Go to **Database** icon under **Develop** section and create a **Real Time Database** with both read and write access.
6. Go to the **Authentication** icon again and click on the **Web Setup** option on the top right corner and copy the credentials, paste them to the `app/config/keys.js` file in the firebase in the `firebaseConfigForTesting` object.
7. Place this url `ws://localhost:5000` in place of databaseURL in firebaseConfigForTesting object.
8. Make sure you have `firebase-admin` module installed.
9. Create an empty `serviceAccountKey.json` file in the path `app/config/`.
10. Navigate to the [Service Accounts](https://console.firebase.google.com/u/0/project/_/settings/serviceaccounts/adminsdk) tab in your project's settings (Project created for Test Databse) page.
11. Choose the **Node.js** option and generate the private key.
12. Copy the contents of the generated file to the `serviceAccountKey.json` file.