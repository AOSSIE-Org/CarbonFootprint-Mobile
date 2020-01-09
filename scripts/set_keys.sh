envsubst < ./android/app/src/main/res/values/strings.xml > ./android/app/src/main/res/values/temp.xml && mv ./android/app/src/main/res/values/temp.xml ./android/app/src/main/res/values/strings.xml
sed -i 's/apiKey: null/apiKey: "$FIREBASE_API_KEY"/' ./app/config/keys.js
sed -i 's/authDomain: null/authDomain: "$FIREBASE_AUTH_DOMAIN"/' ./app/config/keys.js
sed -i 's/databaseURL: null/databaseURL: "$FIREBASE_DATABASE_URL"/' ./app/config/keys.js
sed -i 's/projectId: null/projectId: "$FIREBASE_PROJECT_ID"/' ./app/config/keys.js
sed -i 's/storageBucket: null/storageBucket: "$FIREBASE_STORAGE_BUCKET"/' ./app/config/keys.js
sed -i 's/messagingSenderId: null/messagingSenderId: "$FIREBASE_MESSAGING_SENDER_ID"/' ./app/config/keys.js
sed -i 's/webClientId: null/webClientId: "$GOOGLE_CLIENT_ID"/' ./app/config/keys.js
sed -i 's/googleRoadsAPIKey = null/googleRoadsAPIKey = "$GEOCODING_API"/' ./app/config/keys.js
sed -i 's/geocodingAPIKey = null/geocodingAPIKey = "$GEOCODING_API"/' ./app/config/keys.js
envsubst < ./app/config/keys.js > ./app/config/temp.js && mv ./app/config/temp.js ./app/config/keys.js
