<template>
    <div class="sidebar__listEvent" v-show="!this.$store.state.controls.eventEditForm">
        <div class="sidebar__listEvent__item sidebar__listEvent__item--title">
            <div class="sidebar__listEvent__item__number">&#8470;</div>
            <div class="sidebar__listEvent__item__name">Название события</div>
            <div class="sidebar__listEvent__item__status">Статус</div>
            <div class="sidebar__listEvent__item__edit">Ред.</div>
            <div class="sidebar__listEvent__item__delete">Удл.</div>
        </div>
        <div class="sidebar__listEvent__item" v-for="(marker, index) in printArray">
            <div class="sidebar__listEvent__item__number">{{index + 1}}</div>
            <div class="sidebar__listEvent__item__name">{{ marker.infoMarker.nameEvent }}</div>
            <div class="sidebar__listEvent__item__status">{{ printStatus(marker) }}</div>
            <div class="sidebar__listEvent__item__edit"
                 @click="editFormShow(index)"
            >&#9998;</div>
            <div class="sidebar__listEvent__item__delete"
                 @click="deleteModalShow(index)"
            >&#215;</div>
        </div>

        <delete-modal v-if="this.$store.state.controls.deleteModal"></delete-modal>
        
    </div>
</template>

<script>

import deleteModal from './deleteModal.vue'

export default {
    data() {
        return {
            
        }
    },
    components: {
        deleteModal
    },
    methods: {
        editFormShow(index) {
            this.$store.state.controls.indexEventToChange = index;
            this.$store.state.controls.eventEditForm = true;
            this.$store.state.controls.eventList = false; 
        },
        deleteModalShow(index) {
            this.$store.state.controls.indexEventToDelete = index;
            this.$store.state.controls.deleteModal = true;
        },
        printStatus(marker) {
            var dateStart = +new Date(marker.infoMarker.dateStart);
            var dateEnd = +new Date(marker.infoMarker.dateEnd);
            var dateNow = +new Date();

            if (dateNow > dateStart && dateNow > dateEnd) {
                return "done";
            }
            else return "active";
        }
    },
    computed: {
        printArray(){
            return this.$store.state.arrayEvents;
        }
    }
};
</script>


<style scoped>
    .sidebar__listEvent {
        margin: 30px auto;
        width: 90%;
        box-sizing: border-box;
    }
        .sidebar__listEvent__item {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            border-bottom: 1px solid #3eb5f1;
            padding: 5px 5px 4px;
            border: 1px solid #3eb5f1;
            border-top: 0px;
        }
            .sidebar__listEvent__item:nth-child(2n + 3) {
                background-color: #d6f1ff;
            }
            .sidebar__listEvent__item--title {
                border-top-right-radius: 10px;
                border-top-left-radius: 10px;
                background-color: #3eb5f1;
                color: #fff;
                font-size: 18px;
            }
                .sidebar__listEvent__item--title .sidebar__listEvent__item__edit:hover,
                .sidebar__listEvent__item--title .sidebar__listEvent__item__delete:hover{
                    color: #fff;
                    cursor: default;
                }
            .sidebar__listEvent__item__number {
                flex-basis: 10%;
                text-align: center;
                font-size: 16px;
            }
            .sidebar__listEvent__item__name {
                flex-basis: 50%;
                box-sizing: border-box;
                padding: 0px 5px;
                font-size: 16px;
            }
            .sidebar__listEvent__item__status {
                flex-basis: 20%;
                font-size: 16px;
            }
            .sidebar__listEvent__item__edit {
                font-size: 14px;
                flex-basis: 10%;
                text-align: center;
            }
                .sidebar__listEvent__item__edit:hover {
                    cursor: pointer;
                    color: #aaa;
                }
            .sidebar__listEvent__item__delete {
                font-size: 15px;
                flex-basis: 10%;
                text-align: center;
            }
                .sidebar__listEvent__item__delete:hover {
                    cursor: pointer;
                    color: #aaa;
                }
</style>