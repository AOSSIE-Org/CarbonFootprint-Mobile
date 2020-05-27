#!/usr/bin/env bash

cat  << EOF
org.gradle.jvmargs=-Xmx4608M
android.useAndroidX=true
android.enableJetifier=true
MYAPP_UPLOAD_STORE_FILE=keystore.jks
MYAPP_UPLOAD_STORE_PASSWORD=$KEY_PASSWORD
MYAPP_UPLOAD_KEY_ALIAS=$MY_ALIAS
MYAPP_UPLOAD_KEY_PASSWORD=$KEY_PASSWORD
EOF
