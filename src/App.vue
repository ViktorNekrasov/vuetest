<template>
    <div class="page_content">
        <div class="map_container">
        <google-map
            name="example"
        ></google-map>
        </div>
        <div class="side_bar">
            <side-bar
            ></side-bar>
        </div>
    </div>
</template>

<script>
    import googleMap from './components/googleMap.vue'
    import sideBar from './components/sideBar.vue'

    export default {
        data() {
            return {
            }
        },
        components: {
            googleMap,
            sideBar
        },
        methods: {
        }
    }
</script>


<style scoped>
    * {
        font-family: 'Arial';
    }
    .map_container {
        position: fixed;
        width: 70%;
        left: 30%;
        height: 100vh;
        top: 0px;
    }
    .side_bar {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 30%;
        height: 100vh;
        background-color: #fff;
        box-sizing: border-box;
        border-right: 1px solid #ccc;
        -webkit-box-shadow: 2px 0px 10px 2px rgba(0,0,0,0.5);
        -moz-box-shadow: 2px 0px 10px 2px rgba(0,0,0,0.5);
        box-shadow: 2px 0px 10px 2px rgba(0,0,0,0.5);
    }
    button {
        z-index: 100;
        position: fixed;
        left: 10px;
        top: 10px;
    }
</style>