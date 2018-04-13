<template>
    <div class="sidebar__newEvent">
        <form action="">
            <div class="sidebar__newEvent__item">
                <label>Наименование события:</label>
                <input type="text" name="nameEvent" placeholder="Name Event"
                       v-model="eventMap.infoMarker.nameEvent">
            </div>
            <div class="sidebar__newEvent__item">
                <label>Дата начала события:</label>
                <input type="datetime-local" name="dateStart"
                       v-model="eventMap.infoMarker.dateStart">
            </div>
            <div class="sidebar__newEvent__item">
                <label>Дата окончания события:</label>
                <input type="datetime-local" name="dateEnd" 
                       v-model="eventMap.infoMarker.dateEnd">
            </div>
            <div class="sidebar__newEvent__item">
                <label>Широта:</label>
                <input type="text" name="latitude"  placeholder=""
                       v-model="eventMap.position.latitude">
            </div>
            <div class="sidebar__newEvent__item">
                <label>Долгота:</label>
                <input type="text" name="longitude" placeholder=""
                       v-model="eventMap.position.longitude">
            </div>
            <button @click="addNewEvent">Добавить</button>
        </form>
    </div>
</template>

<script>

export default {
    data() {
        return {
            eventMap: {
                position: {
                    latitude: 55.0525312,
                    longitude: 82.8775784
                },
                infoMarker: {
                    nameEvent: "",
                    dateStart: "",
                    dateEnd: ""
                }
            }
        }
    },
    methods: {
        addNewEvent(e) {
            e.preventDefault();

            this.eventMap.infoMarker.dateStart = this.eventMap.infoMarker.dateStart.split('T').join(' ');
            this.eventMap.infoMarker.dateEnd = this.eventMap.infoMarker.dateEnd.split('T').join(' ');

            this.$store.commit('addEvent', this.eventMap);
            this.$store.commit('addMarker', this.eventMap);
            this.$store.state.controls.eventAddForm = false;
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
</style>