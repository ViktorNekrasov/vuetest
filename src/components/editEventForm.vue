<template>
    <div class="sidebar__newEvent">
        <div class="sidebar__newEvent__goBack" @click="goBack()">&#8617; Назад</div>
        <h2>Редактирование:</h2>
        <form action="">
            <div class="sidebar__newEvent__item">
                <label>Наименование события:</label>
                <input type="text" name="nameEvent" placeholder="Name Event"
                       @input="newEventMap.infoMarker.nameEvent = $event.target.value"
                       :value="eventMap.infoMarker.nameEvent">
            </div>
            <div class="sidebar__newEvent__item">
                <label>Дата начала события:</label>
                <input type="datetime-local" name="dateStart"
                       @input="newEventMap.infoMarker.dateStart = $event.target.value"
                       :value="eventMap.infoMarker.dateStart.split(' ').join('T')">
            </div>
            <div class="sidebar__newEvent__item">
                <label>Дата окончания события:</label>
                <input type="datetime-local" name="dateEnd" 
                       @input="newEventMap.infoMarker.dateEnd = $event.target.value"
                       :value="eventMap.infoMarker.dateEnd.split(' ').join('T')">
            </div>
            <div class="sidebar__newEvent__item">
                <label>Широта:</label>
                <input type="text" name="latitude"  placeholder=""
                       @input="newEventMap.position.latitude = $event.target.value"
                       :value="eventMap.position.latitude">
            </div>
            <div class="sidebar__newEvent__item">
                <label>Долгота:</label>
                <input type="text" name="longitude" placeholder=""
                       @input="newEventMap.position.longitude = $event.target.value"
                       :value="eventMap.position.longitude">
            </div>
            <button @click="editEvent">Изменить</button>
        </form>
    </div>
</template>

<script>

export default {
    data() {
        return {
            eventMap: {
                position: this.$store.state.arrayEvents[this.$store.state.controls.indexEventToChange].position,
                infoMarker: {
                    nameEvent: this.$store.state.arrayEvents[this.$store.state.controls.indexEventToChange].infoMarker.nameEvent,
                    dateStart: this.$store.state.arrayEvents[this.$store.state.controls.indexEventToChange].infoMarker.dateStart,
                    dateEnd: this.$store.state.arrayEvents[this.$store.state.controls.indexEventToChange].infoMarker.dateEnd
                }
            },
            newEventMap: {
                position: this.$store.state.arrayEvents[this.$store.state.controls.indexEventToChange].position,
                infoMarker: {
                    nameEvent: this.$store.state.arrayEvents[this.$store.state.controls.indexEventToChange].infoMarker.nameEvent,
                    dateStart: this.$store.state.arrayEvents[this.$store.state.controls.indexEventToChange].infoMarker.dateStart,
                    dateEnd: this.$store.state.arrayEvents[this.$store.state.controls.indexEventToChange].infoMarker.dateEnd
                }
            }
        }
    },
    computed: {
    },
    methods: {
        editEvent(e) {
            e.preventDefault();

            this.newEventMap.infoMarker.dateStart = this.newEventMap.infoMarker.dateStart.split('T').join(' ');
            this.newEventMap.infoMarker.dateEnd = this.newEventMap.infoMarker.dateEnd.split('T').join(' ');

            this.$store.state.arrayEvents[this.$store.state.controls.indexEventToChange] = this.newEventMap;
            this.$store.commit('editMarker');
            this.$store.commit('refreshMarkers');

            this.$store.state.controls.eventList = true;
            this.$store.state.controls.eventEditForm = false;
        },
        goBack(){
            this.$store.state.controls.eventEditForm = false;
            this.$store.state.controls.indexEventToChange = null;
            this.$store.state.controls.eventList = true; 
        }
    }
};
</script>


<style scoped>
    .sidebar__newEvent {
        margin: 50px auto;
        max-width: 80%;
    }
        .sidebar__newEvent__item {
            margin-top: 15px;
        }
            .sidebar__newEvent__item label {
                display: block;
                width: 100%;
                font-weight: bold;
            }
            .sidebar__newEvent__item input {
                display: block;
                width: 100%;
                margin-top: 5px;
                height: 40px;
                padding: 5px 10px;
                box-sizing: border-box;
                border-radius: 5px;
                border: 1px solid #3eb5f1;
                color: #777;
                font-size: 16px;
                font-weight: bold;
            }
        button {
            display: block;
            width: 200px;
            margin: 30px auto 0px;
            height: 40px;
            background-color: #3eb5f1;
            color: #fff;
            border: none;
            font-size: 16px;
            border-radius: 5px;
        }
            button:hover {
                cursor: pointer;
                -webkit-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.5);
                -moz-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.5);
                box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.5);
            }
    .sidebar__newEvent__goBack {
        font-size: 18px;
        font-weight: bold;
    }
        .sidebar__newEvent__goBack:hover {
            cursor: pointer;
            color: #3eb5f1;
        }
    
</style>