<template>
    <div style="  background-color:#FDFBFB">
        <headerPage />
        <firstSection />
        <secondSection />
        <thirdSection />
        <!-- <plansView /> -->
        <footerSection />
    </div>
</template>

<script>
import headerPage from "@/components/global/navBar.vue";
import firstSection from "@/views/Home/firstSection.vue";
import secondSection from "@/views/Home/secondSection.vue";
import thirdSection from "@/views/Home/thirdSection.vue";
// import plansView from "@/views/Home/plansView.vue";
import footerSection from "@/views/Home/footerSection.vue";
export default {
    name: 'homeView',
    components: {
        headerPage,
        firstSection,
        secondSection,  
        thirdSection,
        // plansView,
        footerSection,
    }

}
</script>