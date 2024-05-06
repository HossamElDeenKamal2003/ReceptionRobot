<template>
    <div class="parent">
        <navBar />
        <new-order />
    </div>
</template>

<script>
    import navBar from "@/components/global/navBar.vue";
    import newOrder from "@/views/DoctorsPage/newOreder.vue";
    export default{
        name:'doctorView',
        components:{
            navBar,
            newOrder,
        }
    }
</script>