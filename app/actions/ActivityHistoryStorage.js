import Realm from 'realm';
import { setFootprint } from '../actions/firebase/Footprint';
import store from '../config/store';

export default class ActivityHistoryStorage {
  static createDB() {
  	schema = {
	    name: 'ActivityHistory',
	    properties: {
	      actDate: {type: 'string'},
	      startTime: {type: 'string'},
	      duration: {type: 'int'},
	      src: {type: 'string'},
	      dest: {type: 'string'},
	      actType: {type: 'string'},
	      distance: {type: 'double'},
	      co2Emitted: {type: 'double'},
        co2Saved: {type: 'double'}
	    }
	  };
  	this.realm = new Realm({schema: [schema]});
  }	

  static getData(date) { 
  	return this.realm.objects('ActivityHistory').filtered('actDate = $0', date);
  }

  static getTotalData(date) { 
  	var obj = this.realm.objects('ActivityHistory').filtered('actDate = $0', date);
    var len = obj.length;
    var co2Emitted = 0, co2Saved = 0, co2WalkSaved = 0, co2CycleSaved = 0, co2VehicleEmitted = 0;
    var dist = 0, distWalk = 0, distCycle = 0, distVehicle = 0;
    var dur = 0, durWalk = 0, durCycle= 0, durVehicle = 0;
    for(var i = 0; i < len; i ++) {
      co2Emitted = co2Emitted + obj[i].co2Emitted;
      co2Saved = co2Saved + obj[i].co2Saved;
      dist = dist + obj[i].distance;
      dur = dur + obj[i].duration;
      if(obj[i].actType === 'WALKING' || obj[i].actType === 'ON_FOOT') {
        co2WalkSaved = co2WalkSaved + obj[i].co2Saved;
        distWalk = distWalk + obj[i].distance;
        durWalk = durWalk + obj[i].duration;
      }
      if(obj[i].actType === 'ON_BICYCLE') {
        co2CycleSaved = co2CycleSaved + obj[i].co2Saved;
        distCycle = distCycle + obj[i].distance;
        durCycle = durCycle + obj[i].duration;
      }
      if(obj[i].actType === 'IN_VEHICLE') {
        co2VehicleEmitted = co2VehicleEmitted + obj[i].co2Emitted;
        distVehicle = distVehicle + obj[i].distance;
        durVehicle = durVehicle + obj[i].duration;
      }
    }
    return {
      co2Emitted: co2Emitted,
      co2Saved: co2Saved,
      co2WalkSaved: co2WalkSaved,
      co2CycleSaved: co2CycleSaved,
      co2VehicleEmitted: co2VehicleEmitted,
      dist: dist,
      distWalk: distWalk,
      distCycle: distCycle,
      distVehicle: distVehicle,
      dur: dur,
      durWalk: durWalk,
      durCycle: durCycle,
      durVehicle: durVehicle
    };
  }	  
  
  static insertDataInFirebase() {
    var dataObj = this.getTotalData(new Date().toDateString());
    var data = {
      total: {
          time: dataObj.dur,
          footprint: dataObj.co2Emitted,
          distance: dataObj.dist
      },
      car: {
          time: dataObj.durVehicle,
          footprint: dataObj.co2VehicleEmitted,
          distance: dataObj.distVehicle
      },
      transit: {
          time: 0,
          footprint: 0.0,
          distance: 0.0
      },
      cycling: {
          time: dataObj.durCycle,
          footprint: 0.0,
          distance: dataObj.distCycle
      },
      walking: {
          time: dataObj.durWalk,
          footprint: 0.0,
          distance: dataObj.distWalk
      }
    };
    setFootprint(data, store.getState().auth.user.uid);
  }

  static insertData(dataObj) {
	 this.realm.write(() => {
      const hist = this.realm.create('ActivityHistory', dataObj);
      //alert("Activity data stored");
      this.insertDataInFirebase();
    });
  }

  static deleteData(dataObj) {
	 this.realm.write(() => {
  		let obj = this.realm.create('ActivityHistory', dataObj);
  		this.realm.delete(obj);
    });
  }
}