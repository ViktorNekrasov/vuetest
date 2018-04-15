<template>
    <div class="sidebar__listEvent__popup" @click="close_modal()">
        <div class="sidebar__listEvent__popup__container">
            <div class="sidebar__listEvent__popup__container__modal" @click="$event.stopPropagation()">
                <img src="../../img/modal_close.svg" alt="X" 
                     class="sidebar__listEvent__popup__container__modal__closeButton"
                     @click="close_modal()"
                     >
                <h4>
                    Вы действительно хотите удалить<br>
                    событие: "{{ eventToDelete }}"?
                </h4>
                <div class="sidebar__listEvent__popup__container__modal__buttons">
                    <button class="sidebar__listEvent__popup__container__modal__buttons__successes"
                        @click="deleteEvent()"
                    >Да</button>
                    <button class="sidebar__listEvent__popup__container__modal__buttons__error"
                        @click="close_modal()"
                    >Нет</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        deleteEvent(e) {

            this.$store.commit('deleteEvent', this.eventMap);
            
            this.$store.state.controls.indexEventToDelete = null;
            this.$store.state.controls.deleteModal = false;
        },
        close_modal(e) {
            this.$store.state.controls.indexEventToDelete = null;
            this.$store.state.controls.deleteModal = false;


        }
    },
    computed: {
        eventToDelete() {
            return this.$store.state.arrayEvents[this.$store.state.controls.indexEventToDelete].infoMarker.nameEvent;
        }
    }
};
</script>


<style>
    .sidebar__listEvent__popup {
        display: block;
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 200;
        background: rgba(0,0,0,0.7);
        width: 100%;
        height: 100vh;
    }
        .sidebar__listEvent__popup__container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
        }
            .sidebar__listEvent__popup__container__modal {
                position: relative;
                max-width: 600px;
                max-height: 80vh;
                text-align: center;
                background-color: #fff;
                border-radius: 20px;
                padding: 40px 80px;
                box-sizing: border-box;
                -webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.5);
                -moz-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.5);
                box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.5);
            }
            .sidebar__listEvent__popup__container__modal__closeButton {
                position: absolute;
                padding: 20px;
                top: 0px;
                right: 0px;
                cursor: pointer;
                width: 15px;
                opacity: 0.6;
                transition: all linear 0.1s;
            }
                .sidebar__listEvent__popup__container__modal__closeButton:hover {
                    transform: scale(1.05);
                    opacity: 1;
                }
            .sidebar__listEvent__popup__container__modal__buttons {
                display: flex;
                flex-direction: row;
                justify-content: center;
                margin-top: 20px;
            }
            .sidebar__listEvent__popup__container__modal__buttons button {
                display: block;
                width: 150px;
                margin: 10px;
                height: 40px;
                color: #fff;
                border: none;
                font-size: 16px;
                border-radius: 5px;
            }
            .sidebar__listEvent__popup__container__modal__buttons__successes {        
                background-color: #3eb5f1;
            }
            .sidebar__listEvent__popup__container__modal__buttons__error {        
                background-color: #f13e3e;
            }
            .sidebar__listEvent__popup__container__modal__buttons button:hover {
                cursor: pointer;
                -webkit-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.5);
                -moz-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.5);
                box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.5);
            }
</style>