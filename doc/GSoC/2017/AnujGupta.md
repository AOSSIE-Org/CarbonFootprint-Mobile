# Carbon Footprint Mobile Application

CarbonFootprint-Mobile is a Hybrid mobile application which is developed using React-Native framework. Main function of this application is to calculate amount of emitted co2 based on user's activity and traveled distance.
	
### Link to project’s repository

https://gitlab.com/aossie/CarbonFootprint-Mobile

### Link to mobile app

https://drive.google.com/open?id=0B9OhwWvtD1xIcEpZZHZmREM4QlE

## Features of App 

1. Option to calculate amount of co2 that will be emitted based on source and destination entered by user and type of user's activity
2. A summary of today's user activities showing emitted and saved co2 because of user's different activities
3. Activity screen: It detects user's activity and calculate traveled distance and amount of emitted co2 (at runtime)
4. Friends section: User can send and accept friend requests. It shows a list of all friends
5. Gamification: Ranking of user along with his friends based on co2 emission
6. User profile: overall status of co2 emission from user's activities
7. Timeline screen: It shows the history of user's activities
8. Settings, About Us, Terms & Conditions screen
9. Login/Signup using manual method and Social Logins method 
10. Firebase integration for user authentication using email, Friends section APIs, storage in remote Db 
	
List of features I worked on during GSoC 2017 include 2, 5, 7 (Only me) and 3, 4, 9, 10 (Me and Amit both).

## Features: Achieved goals, Faced difficulties, Future scope
	
**1. Login/Signup screen** - Initially I implemented Fb, Google signin (for Android only) using `react-native-fbsdk` and `react-native-google-sign-in` but for Twitter and other social logins, I was not able to find good packages, so I used `react-native-simple-auth` package for Twitter and Tumblr which uses browser instead of native apps to authenticate users. Since this was not the right way, so we searched more and Amit found a package `tipsi-twitter` and implemented Twitter signin and we removed `react-native-simple-auth` package. 
In future, more social logins can be added.

**2. Activity detection** - I used `react-native-activity-recognition` package for implementing it. Initially, this package was for Android only. Amit worked on it and extended it for iOS also. There are many challenges with Activity detection. It takes more time (about 10-20 sec) to detect new activity and sometimes it detects wrong activity. Another challenge is that we can not differentiate between different vehicles, i.e., activity is only detected as `IN_VEHICLE` but can not classify whether vehicle is car, bus or train etc. For this problem, we have used concept of preferred or default vehicle that will be set by user. 
In future, improvement can be done so that it would take less time in detecting new activity and errors can be minimized. Also classification can be done for vehicles.

**3. Distance calculation and finding current location** - I used `haversine` package that calculates shortest distance between two points on earth. For finding current location of user, I used react-native's `navigator.geolocation` package. There are many challenges with this. It takes much time to get user's current location for first time. Sometimes it does not find location, finds incorrect location or does not send location updates. Basically this problem is because of GPS. 
In future, these errors can be minimized. One way to do this is removal of noise from GPS data by using Kalman filter or other methods.

**4. Drawing routes on map** - Polylines are used to draw routes on map. I used airbnb's `react-native-maps` package for implementing map and drawing polylines on map. Because of GPS problem described above, initially route was drawn in random zigzag manner. Later I used `Google Roads API` to interpolate user's current location with coordinates of roads so that route can be drawn linearlly in parallel to roads. But this method is not appropriate because user's activity can be in park etc. (not necessarily along the road). 
In future, `Google Roads API` can be replaced by some other method (possible by removal of noise from GPS data and then drawing route).

**5. Emitted and Saved co2 calculation** - Present formula for calculating co2 emission is: `emitted co2 (in kg) = co2 emission rate of fuel (in kg/L) * (traveled distance (in km) / mileage of vehicle (in km/L))`. If activity is `IN_VEHICLE`, co2 calculated by above formula becomes Emitted co2 and Saved co2 is 0. If activity is `WALKING`, `ON_BICYCLE` etc., co2 calculated by above formula becomes Saved co2 and Emitted co2 is 0. Currently we are using average co2 emission rate and average mileage. 
In future, different fuel rates and mileages for different vehicles can be used. Also co2 emission due to non-vehicle activities like `RUNNING`, `WALKING` can be added because of respiration.

**6. Timeline/History storage (in local device) using Realm Db** - I used `react-native-timeline-listview` package for GUI of timeline screen with some customizations. To implement Realm Db, I used Realm's official package `realm`. Major challenge in this feature was of synchronization. Activity data (that is to be stored in Db) was being collected in `ActivityTab.js` but this data was being sent for storage from `ActivityDetection.js`. Sometimes data was being sent for storage before being collected in `ActivityTab.js`. I solved this problem by storing Activity data continuously in Redux store and using this stored data in `ActivityDetection.js`. There is one task yet to be done. Sometimes there occurs some errors in finding Activity data and wrong or null values are stored in Realm Db. 
In future, this Timeline listview can be made editable so that user can modify it and correct values can be stored in Db. When user will modify some activity data, other dependent data should be modified automatically, e.g. - if user modifies activity type, corresponding co2 emission should also be modified.

**7. Firebase integration and manual login/signup (using email) implementation** - For server and remote Db, we have used `Firebase`. Firebase has in-built features for implementing Db and user authentication. I integrated Firebase with app and implemented login/signup using email. Amit implemented other functions/APIs for interacting with Firebase Db and management of Friends (fetch list of friends, send and accept friend request). Firebase is not totally free. If we are using it under its usage limit, then it is free otherwise we have to pay for it. 
In future, if userbase of this app increases, we'll have to shift to new server or pay for the firebase.

**8. Friends section** - I mainly worked on GUI of Friends section. I also did some modifications in functions/APIs and connected these functions/APIs with GUI. Currently changes in Friends section are not reflected at runtime, e.g. - if we accept any friend request, that friend is not shown in list of friend at same time, we have to close and re-open the app to see the changes. 
In future, this limitation can be removed so that changes done can be seen simultaneously.

**9. Gamification** - This feature has very basic implementation. Total co2 emitted by user and his/her friends are calculated and user is given a rank among his/her friends and list of friends is sorted based on emitted co2. 
In future, other methods can be added for implementing Gamification, e.g. - finding the ratio of traveled distance and emitted co2 and using this ratio for giving ranks or using saved co2 etc.

### Merge Requests

* MR !3 - [Adding Async local storage and Social login - FB, Google (Old way: using apps), Twitter, Tumblr (New way: using browser) (For Android only)](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/3) (MERGED)
	
* MR !6 - [Activity detection (For Android), Main stats, Activity stats and Timeline screen](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/6) (MERGED)

* MR !8 - [Making Activity screen dynamic](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/8) (MERGED)

* MR !9 - [Firebase Integration and login / signup implementation](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/9) (MERGED)

* MR !11 - [Realm DB implementation for local storage of Activity data + Friend Requests and Invite sections + Other minor changes](https://gitlab.com/aossie/CarbonFootprint-Mobile/merge_requests/11) (NOT MERGED YET)