Template.hireItem.onRendered(function(){
    $("#htime").hide();
    $("#finalPrice").hide();
	$('.datetimepicker').datetimepicker();
    $('.hire-item').validate({});
    Session.set('hiringType', null);	//fixed for calculatedPrice
    Session.set('hiringTime',null);
});

Template.hireItem.helpers({
    calculatedPrice: function() {
    	var hiringType = Session.get('hiringType');
    	var time = Session.get('hiringTime');

    	if(hiringType == 'hour'){
 	    	return this.perHour*time
	    } else if (hiringType == 'day'){
	    	return this.perDay*time
	    } else if (hiringType == 'week'){
	    	return this.perWeek*time
	    }
  	},

  	startDate: function() {
    	return Session.get('currentDateTime');
  	}
});

Template.hireItem.events({
	'click .radioSelect': function(e,t) {
		var hiringType = e.target.value;
	    Session.set('hiringType', hiringType);
	    $("#htime").show();
	},

	 // set format and current date time
    'click .date-time': function(e,t){
    	var dateTime = moment().format("MM-DD-YYYY HH:mm A");
		Session.set('currentDateTime', dateTime);
    },

	'keyup .htime': function (event) {
	    var hiringTime = $('.htime').val();
	    Session.set('hiringTime', hiringTime);
	    $("#finalPrice").show();
	},

	'submit .hire-item': function (event) {
		event.preventDefault();
	 	var hireData = this.events;
	 	var reason = event.target.reason.value;
     	var hireType = Session.get('hiringType');
     	var hireTime = Session.get('hiringTime');
     	var hireCost = event.target.hirePrice.value;
     	var booker = Meteor.userId();
     	var startDate = moment(event.target.startDate.value,"MM-DD-YYYY HH:mm A").toISOString();
     	var canBook = null;

		if(hireType == 'hour'){
	    	var endDate = moment(startDate).add(hireTime,'h').toISOString()
	    } else if(hireType == 'day'){
	    	var endDate = moment(startDate).add(hireTime, 'd').toISOString()
	    }else if(hireType == 'week'){
	  		var endDate = moment(startDate).add(hireTime, 'w').toISOString()
	  	}

	  	if(hireData.length != 0){
	  		hireData.forEach(function(hd){
	  			var stDate = hd.startDate;
	  			var enDate = hd.endDate;
	  			var range = moment.range(stDate, enDate);
	  			var newDate = moment.range(startDate, endDate);

	  			if(newDate.overlaps(range) == true) {
	  				canBook = false
	  			} else {
	  				canBook = true
	  			}
	  			console.log(canBook);
  			});
  		} else {
  			Meteor.call('hireItem', this._id, booker, hireCost, startDate, endDate, hireType, reason);
  			console.log('successful!')
  		}

  		if(canBook == true){
  			Meteor.call('hireItem', this._id, booker, hireCost, startDate, endDate, hireType, reason);
  			console.log('successful!')
  		} else if(canBook == false) {
	  		alert("Already rented for this time period");
  		}
    }
});