<template>
    <div class="parent container">
        <div class="text" :style="{ opacity: opacity, transition: 'opacity 1s' }">
            <p>best system to make connection between labs and dental clinics</p>
        </div>
        <div class="image" :style="{ opacity: opacity, transition: 'opacity 1s' }">
            <img src="@/assets/thirdSection.jpg" alt="" width="100%" height="auto">
        </div>
    </div>
</template>

<style scoped>
.parent {
    height: 80vh;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 70%;
}

p {
    text-transform: capitalize;
    width: 88%;
    height: 200px;
    background-color: #33A1F1;
    border-radius: 15%;
    font-size: 1.5em;
    display: flex;
    align-items: center;
}

.image img {
    box-shadow: 15px 15px #33A1F1;
    max-width: 100%; /* Ensure the image does not exceed its container width */
    height: auto; /* Maintain the aspect ratio */
}

/* Responsive styles */
@media (max-width: 768px) {
    .parent {
        flex-direction: column;
        text-align: center;
        gap: 10px;
    }

    p {
        width: 100%;
    }
}
</style>

<script>
export default {
    name: 'thirdSection',
    data() {
        return {
            opacity: 0,
            vertical: 0,
        };
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmounted() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            this.vertical = window.scrollY;
            this.handleAnimation(); // Call handleAnimation method on scroll
        },
        handleAnimation() {
            if (this.vertical >= 1100.272705078125) {
                this.opacity = 1;
            }else if(this.vertical >= 1340.800048828125){
                this.opacity = 1;
            }else if(this.vertical >= 1294.4000244140625){
                this.opacity = 1;
            }
            else {
                this.opacity = 0;
            }
        },
    },
};
</script>
