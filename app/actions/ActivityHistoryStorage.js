import Realm from 'realm';

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
	      co2Emitted: {type: 'double'}
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
    var dist = 0, co2 = 0;
    for(var i = 0; i < len; i ++) {
      dist = dist + obj[i].distance;
      co2 = co2 + obj[i].co2Emitted;
    }
    return {
      distance: dist,
      co2Emitted: co2
    };
  }	  
  
  static insertData(dataObj) {
	this.realm.write(() => {
      const hist = this.realm.create('ActivityHistory', dataObj);
      //alert("Activity data stored");
    });
  }

  static deleteData(dataObj) {
	this.realm.write(() => {
		let obj = this.realm.create('ActivityHistory', dataObj);
		this.realm.delete(obj);
    });
  }
}