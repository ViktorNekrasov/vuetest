<template>
    <div class="google-map" :id="mapName"></div>
</template>

<script>
export default {
    name: 'google-map',
    props: ['name'],

    data() {
        return {
            mapName : this.name + "-map",
            centerMap : [55.003263, 82.928759],
            markers: [
                {
                    position: {
                        latitude: 55.0525312,
                        longitude: 82.8775784
                    },
                    title : "Marker 1",
                    animation: google.maps.Animation.DROP,
                    infoMarker: {
                        nameEvent: "My Event",
                        dateStart: "2018-04-13 12:00",
                        dateEnd: "2018-04-13 15:00"
                    }
                },
                {
                    position: {
                        latitude: 55.0625312,
                        longitude: 82.7775784
                    },
                    title : "Marker 2",
                    animation: google.maps.Animation.DROP,
                    infoMarker: {
                        nameEvent: "My Event 2",
                        dateStart: "2018-04-15 18:00",
                        dateEnd: "2018-04-15 18:00"
                    }
                }
            ],
            map: null,
            bounds: null
        }
    },
    methods: {
        addInfoWindow(marker, markerObj) {
            var infoWindow;
            var strInfo = this.mkInfoWindow(markerObj);
            google.maps.event.addListener(marker, "click", function() {
                if (infoWindow)
                    infoWindow.close();
                infoWindow = new google.maps.InfoWindow({
                    content: strInfo
                });
                infoWindow.open(this.map, marker);
            });
        },
        mkInfoWindow(marker) {
            return '<p><b>Название: </b>'+ marker.infoMarker.nameEvent +'</p>' + 
                   '<p><b>Дата начала: </b>'+ marker.infoMarker.dateStart +'</p>' +
                   '<p><b>Дата окончания: </b>'+ marker.infoMarker.dateEnd +'</p>';
        }
                
    },
    computed: {
              
    },
    mounted() {
            const element = document.getElementById(this.mapName)

            const options = {
                zoom: 11,
                center: new google.maps.LatLng(55.003263, 82.928759),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControlOptions: false,
                streetViewControl: false,
                mapTypeControl: false
            }

            this.map = new google.maps.Map(element, options);
            this.$store.commit('addMap', this.map);
            
            this.markers.forEach((marker) => {

                this.$store.commit('addEvent', marker);
                var dateStart = +new Date(marker.infoMarker.dateStart);
                var dateEnd = +new Date(marker.infoMarker.dateEnd);
                var dateNow = +new Date();
                if ((dateNow > dateStart && dateNow < dateEnd) || (dateNow < dateStart && dateNow < dateEnd)) 
                    this.$store.commit('addMarker', marker); 

            });
    }
};
</script>


<style scoped>
    .google-map {
        width: 100%;
        height: 100%;
    }
</style>