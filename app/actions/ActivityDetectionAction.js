import ActivityRecognition from 'react-native-activity-recognition';

export function detectActivity() {
  return function (dispatch) {
    alert("Activity is being detected ...");
    const detectionIntervalMillis = 100;
    ActivityRecognition.start(detectionIntervalMillis) ;
    // Subscribe to updates 
    this.unsubscribe = ActivityRecognition.subscribe(detectedActivities => {
      const mostProbableActivity = detectedActivities.sorted[0] ;
      //if(mostProbableActivity.confidence >= 75) {
        alert("Detected Activity: " + mostProbableActivity.type + ", Confidence: " + mostProbableActivity.confidence);
      //}  
    });
    //Stop activity detection and remove the listener 
    //ActivityRecognition.stop() ;
    //this.unsubscribe() ;
  }
}