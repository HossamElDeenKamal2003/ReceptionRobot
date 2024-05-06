<template>
    <div class="parent"  v-bind:style="{ opacity: opacity }">
        <h1> About <i style="color:#33A1F1">Recption Robot</i> </h1>
    </div>
    <div class="About container" v-bind:style="{opacity:opacityimg}">
        <img src="@/assets/secondSection.jpg" alt="" width="25%" height="90%"/>
        <p>Masallab is a system aimed at facilitating communication between dentists and laboratories and transferring tangible parts between them easily.</p>
    </div>
</template>

<style scoped>

h1 {
    --s: 0.1em;
    /* the thickness of the line */
    --c: #2c4bff;
    /* the color */

    color: #0000;
    padding-bottom: var(--s);
    background:
        linear-gradient(90deg, var(--c) 50%, #000 0) calc(100% - var(--_p, 0%))/200% 100%,
        linear-gradient(var(--c) 0 0) 0% 100%/var(--_p, 0%) var(--s) no-repeat;
    -webkit-background-clip: text, padding-box;
    background-clip: text, padding-box;
    transition: 1s;
    animation-name: slide-axis;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
}

.parent{
    transition: 1s;
}

.About img{
    border-radius: 50%;
}

h1:hover {
    --_p: 100%;
}

h1 {
    font-family: system-ui, sans-serif;
    font-size: 5rem;
    cursor: pointer;
}
.About{
    text-transform: capitalize;
    background-color: #33A1F1;
    height: 70vh;
    font-size: 2em;
    color: white;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 3s;
}

.About p{
    transform: translateY(15px);
    width: 40%;
    justify-content: space-around;
    height: 80%;
}

@media (max-width: 425px){
    .About img{
        width: 40%;
    }
}

@media (max-width: 768px){
    .About{
        font-size: 1.5em;
    }
}
</style>

<script>
export default {
    name: 'secondSection',
    data() {
        return {
            vertical: 0,
            opacity: 0,
            opacityimg:0,
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
            this.handleAnimationimg();
        },
        handleAnimation() {
            // Adjust the scroll position condition based on your needs
            if (this.vertical >= 330) {
                this.opacity = 1;
            }else if(this.vertical >= 579.2000122070312){
                this.opacity = 1;
            }else if(this.vertical >=604){
                this.opacity = 1;
            }else if(this.vertical >= 1947.199951171875){
                this.vertical = 1;
            }else if(this.vertical >=927.2000122070312){
                this.opacity = 1;
            }else if(this.vertical >= 1272){
                this.opacity = 1;
            }
            else{
                this.opacity = 0;
            }
        },
        handleAnimationimg() {
            if (this.vertical >= 441.6000061035156) {
                this.opacityimg = 1;
            }else if (this.vertical >= 1071.199951171875) {
                this.opacityimg = 1;
            }else if(this.vertical >= 1556.800048828125){
                this.opacity = 1;
            }
            else {
                this.opacityimg = 0;
            }
        },

    },
};
</script>
