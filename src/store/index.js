import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


import VueResource from 'vue-resource';
Vue.use(VueResource);
//Vue.http.options.root = "http://localhost/";


export const store = new Vuex.Store({
	state: {
		map: "",
		controls : {
			eventAddForm : false,
			eventList : true,
			eventEditForm : false,
			deleteModal : false,
			indexEventToChange : null,
			indexEventToDelete : null
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
            var markerG = new google.maps.Marker(tempMarker);
            state.markers.push(markerG);


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
		},
		editMarker(state){
			for (var i = 0; i < state.markers.length; i++) {
            	state.markers[i].setMap(null);
	        }
	        state.markers = [];

	        for (var i = 0; i < state.arrayEvents.length; i++) {
	        	store.commit('addMarker',state.arrayEvents[i]);
	        }
		},
		addMap(state, newMap) {
			state.map = newMap;
		},
		refreshMarkers(state) {
			for (var i = 0; i < state.markers.length; i++) {
				var dateStart = +new Date(state.markers[i].infoMarker.dateStart);
	            var dateEnd = +new Date(state.markers[i].infoMarker.dateEnd);
	            var dateNow = +new Date();

	            if (dateNow > dateStart && dateNow > dateEnd) {
	            	state.markers[i].setMap(null);
	            }
	        }
        },
        deleteEvent(state) {
        	state.arrayEvents.splice(state.controls.indexEventToDelete, 1);
        	state.markers[state.controls.indexEventToDelete].setMap(null);
        	state.markers.splice(state.controls.indexEventToDelete, 1);
        }
	}

});