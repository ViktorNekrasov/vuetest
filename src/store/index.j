import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		map: "",
		controls : {
			eventAddForm : false,
			eventList : true,
			eventEditForm : false,
			indexEventToChange : 0
		},
		arrayEvents: [],
		markers: []
	},
	mutations: {
		addEvent(state, newEvent) {
            state.arrayEvents.push({
                position: {
                    latitude: newEvent.position.latitude,
                    longitude: newEvent.position.longitude
                },
                title : newEvent.infoMarker.nameEvent,
                infoMarker: {
                    nameEvent: newEvent.infoMarker.nameEvent,
                    dateStart: newEvent.infoMarker.dateStart,
                    dateEnd: newEvent.infoMarker.dateEnd
                }
            });
		},
		addMarker(state, marker){
			var dateStart = +new Date(marker.infoMarker.dateStart);
            var dateEnd = +new Date(marker.infoMarker.dateEnd);
            var dateNow = +new Date();

            const position = new google.maps.LatLng(marker.position.latitude, marker.position.longitude)
            var tempMarker = {
            	title : marker.infoMarker.nameEvent,
                infoMarker: {
                    nameEvent: marker.infoMarker.nameEvent,
                    dateStart: marker.infoMarker.dateStart,
                    dateEnd: marker.infoMarker.dateEnd
                }
            }
            tempMarker.map = state.map;
            tempMarker.position = position;

            if ((dateNow > dateStart && dateNow < dateEnd) || (dateNow < dateStart && dateNow < dateEnd)) {

	            var markerG = new google.maps.Marker(tempMarker);

	            for (var i = 0; i < state.markers.length; i++)
		        	if (state.markers[i] == markerG) {
		        		state.markers[i].setMap(null);
	            		state.markers.push(markerG);
		        	}

	            var infoWindow;
	            var strInfo = '<p><b>Название: </b>'+ markerG.infoMarker.nameEvent +'</p>' + 
			                  '<p><b>Дата начала: </b>'+ markerG.infoMarker.dateStart +'</p>' +
			                  '<p><b>Дата окончания: </b>'+ markerG.infoMarker.dateEnd +'</p>';

	            google.maps.event.addListener(markerG, "click", function() {
	                if (infoWindow)
	                    infoWindow.close();
	                infoWindow = new google.maps.InfoWindow({
	                    content: strInfo
	                });
	                infoWindow.open(this.map, markerG);
	            });
	        }
	        else return;
		},
		addMap(state, newMap) {
			state.map = newMap;
		}
	}

});