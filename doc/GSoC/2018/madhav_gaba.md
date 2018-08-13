# CarbonFootprint Mobile Application

CarbonFootprint-Mobile is a Hybrid mobile application which is developed using React-Native framework. Main function of this application is to calculate amount of emitted co2 based on user's activity and traveled distance.

## Link to project’s repository

https://gitlab.com/aossie/CarbonFootprint-Mobile

## Link to mobile app

https://drive.google.com/open?id=11G5g7PMDi0VBx0ckBkzD8iVsO9Xffc6n

## Goals Achieved

- **Improving code structure adding Prop-Types:** Although react-native is close to native apps but to get the proper functioning, it needs to be made sure that we write good code, avoid class based components wherever possible. Type checking of props being passed to a component is also a good coding practice, so ‘prop-types’ is added.

- **Back icon in settings:** In the android devices there is a BackHandler available which can be called to navigate to the previous screen on back press, however, there is no such back button in iOs devices, so, this back button was required for proper navigation in these devices.

- **User Location Button:** In the MapView in the app, the GPS shows the location of user, however to navigate to that view, the user need to manually drag on it. Like the other applications that uses maps, this MR includes adding a button that automatically zooms the view to the current location of user.

- **Sharing stats to social media:** The sole reason for building this app is to keep track on the amount of co2 being saved and emitted during various activities. Social media sharing will greatly help to achieve this. The download link is also attached with stats being shared which will help in promoting the app.

- **AutoSuggest Friends:** This is quite a gamification feature which will help in attracting users. They can see how many of their friends have used this app and send them friend requests. This autosuggest will list all the users with the name being typed to easily identify friends.

- **Saved co2 in the stats section:** The activities like walking and cycling help in saving co2 which would have been emitted if used some other automobiles. This MR calculates all the co2 saved by the user till date in the stats section.

- **User Profile:** Currently there was only one time setting up of profile(while registering only). There was no option of viewing own profile and/or updating it. In the more section, the user profile is now added which also consists of the rating of the user(1-star to 5-star) which is calculated on the basis of amount of co2 saved by the user.

## Merge Requests

- MR !39- Back Icon in settings(required for navigation in ios)(MERGED)
- MR !41- Adding prop-types across all the components of the app(MERGED)
- MR !42- User Location button in activity screen(MERGED)
- MR !45- Sharing stats to social media(both android and ios)(MERGED)
- MR !47- AutoSuggest friends(both android and ios)(NOT MERGED YET)
- MR !51- Saved co2 in the stats section(NOT MERGED YET)
- MR !59- Adding User Profile(NOT MERGED YET)

## Future scope

- **Gamification:** This can include ranking of friends on the basis of amount of co2 saved, special screen of applause for the best user of the app(based on amount of co2 saved) of the week/month etc.

- **Faster Activity Detection:** Activity detection currently takes some time to detect which vehicle the user is using. In future, we can use machine learning techniques for faster detection of activities and more precise results.

- **Stats at next level:** In future, when a lot of users will be using the app, we can calculate some more specific stats, e.g. the amount of co2 emitted in a particular area or top co2 emitting cities etc.
