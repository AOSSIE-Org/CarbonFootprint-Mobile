## Setting up Pipeline

**1.** Whenever you create a merge request the pipeline runs to check whether the app is building successfully or not.

**2.** You need to set gitlab CI/CD variables in **settings**/**CI/CD** to run the pipeline successfully otherwise it will keep failing. These variables stores the API keys, client Ids and other values.

**3.** The variable names are:

-   FACEBOOK_APP_ID
-   FIREBASE_API_KEY
-   FIREBASE_AUTH_DOMAIN
-   FIREBASE_DATABASE_URL
-   FIREBASE_MESSAGING_SENDER_ID
-   FIREBASE_PROJECT_ID
-   FIREBASE_STORAGE_BUCKET
-   GEOCODING_API
-   GOOGLE_CLIENT_ID
-   GOOGLE_SERVICES
-   APPETIZE_API
-   APPETIZE_KEY
-   KEYSTORE
-   MY_ALIAS
-   KEY_PASSWORD

**4.** You need to store

-   _Google Maps API key_ in _GEOCODING_API_
-   _google-services.json_ file content in _GOOGLE_SERVICES_. There should be no space in the content. For example
    If the content is like as shown below

    ```
    {
      "project_info": {
        "project_number": "project_number",
        "project_id": "project_id",
     }
    ```

    Store it like

    ```
    {"project_info":{"project_number": "project_number","project_id":"project_id"}}
    ```

    Don't enclose it in quotes as shown below

    ```
    "{"project_info":{"project_number": "project_number","project_id":"project_id"}}"
    ```

    You just have to remove all the spaces that are there in the content and store it under GOOGLE_SERVICES.
    This is just an example, you need to store google-services.json file's entire content like that without any space or new lines.

-   All other variables' names clearly suggest what values need to be stored in them.
-   Do not enclose any variable value in quotes. For example: FIREBASE_API_KEY is given as "ABCXYZ" store it as ABCXYZ.
-   There should be no space in any value and the variables' names should be same as mentioned above.

**5.** To check why the pipeline failed go to left sidebar and hover to **CI/CD** then go to **Jobs** link and click on the most recent job's number.


#### Setting up appetize.io

Follow these steps to deploy your app to appetize.io:-

1. Get an API token from here: https://appetize.io/docs#request-api-token.   
2. Create a CI/CD variable for api token named "APPETIZE_API".     
    Follow this guide to learn how to add CI/CD variables to your gitlab repository: https://docs.gitlab.com/ee/ci/variables/#creating-a-custom-environment-variable  
3. Run the following command once to upload the app.    
    ```curl https://APITOKEN@api.appetize.io/v1/apps -F "file=@file_to_upload.apk" -F "platform=android"```    
    Replace API_TOKEN with the api token you got in step 1.  
    Replace file_to_upload.apk with your apk file.   
4. Command in step 3 will return a response. Note the public key from your response and add  a CI/CD varible named "APPETIZE_KEY" and enter this public key as value.  
    Make sure to make both the varibales protected and make your branch protected too. Follow this guide: https://docs.gitlab.com/ee/user/project/protected_branches.html#configuring-protected-branches  
    
    This is a one time setup, subsequent changes you make in your repository will be reflected in your link you got in the response automatically.  

    **Always remember to add your appetize link with any Merge request you submit.**

#### Signed apk setup for pipeline

Follow the following steps :- 
1. Generate a keystore.jks file using keytool. `keytool -genkeypair -v -keystore keystore.jks -alias YOUR-KEY-ALIAS -keyalg RSA -keysize 2048 -validity 10000` Replace YOUR-KEY-ALIAS with your key alias.
2. Encode the key with base64. `base64 keystore.jks > base64-keystore.txt`
3. Copy the content of base64-keystore.txt and add it to a CI variable named: "KEYSTORE"
4. Add a CI variable named "MY_ALIAS" and put your key alias there.
5. Add a CI variable named "KEY_PASSWORD" and put the password of your keystore.

Make these CI variables Protected and Masked also don't forget to make your branch Protected.

Generate Signing-certificate fingerprint `keytool -keystore path-to-production-keystore -list -v`

It will give SHA1. Enter SHA1 as fingerprint and packagename which is in manifest file.
Go to https://console.firebase.google.com. Add SHA1 fingerprint and generate google-services.json file.
Update GOOGLE_SERVICES CI variable.
