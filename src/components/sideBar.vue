<template>
    <div class="container">
        <div class="sidebar__navigation" v-show="!this.$store.state.controls.eventEditForm">
            <div class="sidebar__navigation__button"
                 @click="showListEvent"
                 :class="addClassActiveList"
                >Все события</div>
            <div class="sidebar__navigation__button" 
                 @click="showAddForm"
                 :class="addClassActiveAdd"
                >Добавить новое</div>
        </div>
        <add-event-form v-if="this.$store.state.controls.eventAddForm"></add-event-form>
        <list-all-events v-show="this.$store.state.controls.eventList"></list-all-events>
        <edit-event-form v-if="this.$store.state.controls.eventEditForm"></edit-event-form>
    </div>
</template>

<script>
import addEventForm from './addEventForm.vue'
import listAllEvents from './listAllEvents.vue'
import editEventForm from './editEventForm.vue'

export default {
    data() {
        return {
            addEventFormShow : false
        }
    },
    components: {
        addEventForm,
        listAllEvents,
        editEventForm
    },
    methods: {
        showAddForm() {
            if (!this.$store.state.controls.eventAddForm) {
                this.$store.state.controls.eventAddForm = true;
                this.$store.state.controls.eventList = false;
            }
            else return;
        },
        showListEvent() {
            if (!this.$store.state.controls.eventList) {
                this.$store.state.controls.eventList = true;
                this.$store.state.controls.eventAddForm = false;
            }
            else return;
        }
    },
    computed: {
        addClassActiveAdd() {
            if (this.$store.state.controls.eventAddForm) return 'active';
        },
        addClassActiveList() {
            if (this.$store.state.controls.eventList) return 'active';
        }
    }
};
</script>


<style scoped>
    .sidebar__navigation {
        margin: 20px auto;
        max-width: 80%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .sidebar__navigation__button {
        padding: 5px 15px 4px;
        font-size: 18px;
        text-align: center;
        border: 1px solid #3eb5f1;
    }
    .sidebar__navigation__button:hover {
        cursor: pointer;
        background-color: #3eb5f1;
        color: #fff;
    }
        .sidebar__navigation__button.active {
            background-color: #3eb5f1;
            color: #fff;
        }
</style>