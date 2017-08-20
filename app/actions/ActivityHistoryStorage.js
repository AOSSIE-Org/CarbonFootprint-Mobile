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
	      distance: {type: 'float'},
	      co2Emitted: {type: 'float'}
	    }
	  };
  	this.realm = new Realm({schema: [schema]});
  }	

  static getData(date) { 
  	return this.realm.objects('ActivityHistory').filtered('actDate = $0', date);
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