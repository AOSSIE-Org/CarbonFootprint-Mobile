import ActivityRecognition from 'react-native-activity-recognition';

export function detectActivity() {
  return function (dispatch) {
    alert("detectActivity");
    const detectionIntervalMillis = 1000;
    ActivityRecognition.start(detectionIntervalMillis) ;
    // Subscribe to updates 
    this.unsubscribe = ActivityRecognition.subscribe(detectedActivities => {
      const mostProbableActivity = detectedActivities.sorted[0] ;
      //if(mostProbableActivity.confidence >= 75) {
        //this.setState({activity: mostProbableActivity.type});
        alert("Detected Activity : " + mostProbableActivity.type + " " + mostProbableActivity.confidence);
      //}  
    });
    //alert("detectActivity finished");
    //Stop activity detection and remove the listener 
    //ActivityRecognition.stop() ;
    //this.unsubscribe() ;
  }
}