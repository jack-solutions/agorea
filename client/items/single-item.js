Template.singleItem.helpers({
	verified: function () {
		return Meteor.user().verified === true
	},

	ownerPic: function () {
		return Meteor.users.findOne(this.owner).profilePicture;
	},

	ownerLink: function () {
		return Meteor.users.findOne(this.owner).username;
	},

	isOwner: function () {
		return Meteor.userId() === this.owner
	},

	itemActive: function(){
		return this.status == 'active'
	},

	fullInactive: function() {
		return this.status == 'fullInactive'
	}
});


Template.singleItem.events({
	"click .delete-btn": function (e) {
		e.preventDefault();

	    var sure = confirm('Are you sure you want to delete this item?');
	    if (sure === true) {
	      Meteor.call("deleteItem", this._id);
	    }
        Router.go('/');
  	},

  	"click .edit-btn": function () {
  		var item = this._id;
  		Session.set('item', item);
  	},

  	"click .make-active": function (event) {
        var itemId = this._id;
        Meteor.call('activateItem', itemId);
    },

    "click .make-inactive": function (event) {
        var itemId = this._id;
        Meteor.call('deactivateItem', itemId);
    }
});




Template.singleItem.onRendered(function(){
    Session.set("itemId", this.data._id);
});

Template.calendar.onRendered(function(){
    var fc = this.$('.fc');

    Tracker.autorun(function () {
	   	Items.findOne({_id:  Session.get("itemId")});
        fc.fullCalendar('refetchEvents');
	});
});

Template.calendar.helpers({
	//Calender options
    options: function() {
    	var fc = $('.fc');
        return {
        	events: function(start, end, timezone, callback) {
	           	 fc.fullCalendar('refetchEvents');	
	             var calEvents = Items.findOne({_id:Session.get("itemId")});
		         
		         var events = [],
		         	 customClass;	

		         if(calEvents){
		             
		             var newData = calEvents.events;
		             newData.forEach(function(evt){

		             	if(evt.hireType=='hour')
		             		customClass = 'hasEventHours';
		             	else if(evt.hireType=='day')
		             		customClass = 'hasEventDay';
						else if(evt.hireType=='week')
		             		customClass = 'hasEventWeek';
		             	else
		        			customClass = 'hasEvent';

						events.push({ 
							id:calEvents._id,
							title:calEvents.title,
							start:moment.utc(evt.startDate).local(),	//local date-time
							end: moment.utc(evt.endDate).local(),		//local date-time
							className:customClass
						});
					 
					 });
					// Callback to pass events back to the calendar
					callback(events);
				}	
            },
            defaultView: 'month',
	        displayEventEnd: true,
	        // slotEventOverlap:false,
            header: {
		        // left: 'prev,next today',
		        center: 'title',
		        left: 'month,agendaWeek,agendaDay'
		    },

		    /*********** Working phase start *****************/
		    eventMouseover: function( calEvent, jsEvent, view ){ 
		    	// $(this).css('background-color', 'green');
		    },
		    eventClick: function(calEvent, jsEvent, view){
		        console.log(calEvent.start);
		        // console.log(moment.utc(calEvent.start._i).local());
		  		//       var testDateUtc = moment.utc("2015-11-30T09:30:00.000Z").local();
				// // var localDate = moment(testDateUtc).local();

				// console.log(testDateUtc);
				// // console.log(localDate);

		        alert('Event: ' + calEvent.title);
		        
		        // alert('Hire: '+calEvent.start+' '+calEvent.end);
		        // alert(fc.fullCalendar.formatDate( calEvent.start, "MM/dd/yy"));
		    },
		    eventMouseout: function(calEvent, jsEvent , view){
		    	// $(this).css('background-color', '#3A87AD');
		    	// alert('Event: '+calEvent.title);
		    }
		    // ,
		    // dayClick: function(date, jsEvent, view) {

		    //     alert('Clicked on: ' + date.format());

		    //     alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

		    //     alert('Current view: ' + view.name);
		    //     fc.fullCalendar( 'changeView', 'agendaDay');
		    //     // change the day's background color just for fun
		       
		    // }
		    /*********** Working phase end *****************/
        };
    }

});