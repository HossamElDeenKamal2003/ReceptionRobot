<template>
    <h1 v-bind:style="{ opacity: opacity }" class="plansTitle">Plans</h1>
    <div class="plans">
        <div class="card">
            <div class="card-body first" v-bind:style="{ opacity: opacity_1 }">
                <h2 class="card-title">35JOD/3Mon</h2>
                <a href="#" class="btn btn-primary">select</a>
                <ul>
                    <li>send information from doctors to labs quickly</li>
                    <li>Delivery</li>
                    <li>manage finance between doctor and lab</li>
                    <li>full manage labs finance</li>
                    <li>Installing a receiving and delivery box for cases</li>
                </ul>
            </div>
        </div>
        <div class="card">
            <div class="card-body second" v-bind:style="{ opacity: opacity_2 }">
                <h2 class="card-title">30JOD/12Mon</h2>
                <h2 style="font-size:1.5em;">VIP</h2>
                <h2 style="font-size: 1em;">Most Popular</h2>
                <a href="#" class="btn btn-primary">select</a>
                <ul>
                    <li>send information from doctors to labs quickly</li>
                    <li>Delivery</li>
                    <li>manage finance between doctor and lab</li>
                    <li>full manage labs finance</li>
                    <li class="arrow" @click="showMore">{{ this.text }}<i class="bi bi-arrow-down"></i></li>
                    <div class="additional-content" v-bind:style="{ display: visibility }">
                        <li>Gift printer + printing papers + printer inks</li>
                        <li>Creating free content for the laboratory, filming + designing videos for the laboratory</li>
                        <li>Create social media pages for free and follow them on an ongoing basis</li>
                        <li>Special offers on delivery service</li>
                        <li>Installing a box for receiving and delivering orders</li>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-body.second::-webkit-scrollbar {
    width: 10px;
    display: none;
}

.card-body.second::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0 grey; 
    border-radius: 10px;
}

.card-body.second::-webkit-scrollbar-thumb {
    background: #33a1f1; 
    border-radius: 10px;
}

.card-body.second::-webkit-scrollbar-thumb:hover {
    background:  blue; 
}

.arrow {
    color: #33a1f1;
    cursor: pointer;
}

.additional-content {
    display: none;
    transition: display 0.5s ease; /* Add a transition for smooth display change */
}

h1 {
    --s: 0.1em;
    /* the thickness of the line */
    --c: #2c4bff;
    /* the color */

    color: #0000;
    padding-bottom: var(--s);
    background: linear-gradient(90deg,
            var(--c) 50%,
            #000 0) calc(100% - var(--_p, 0%))/200% 100%,
        linear-gradient(var(--c) 0 0) 0% 100%/var(--_p, 0%) var(--s) no-repeat;
    -webkit-background-clip: text, padding-box;
    background-clip: text, padding-box;
    transition: 1s;
    animation-name: slide-axis;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
    margin-bottom: 25px;
    font-family: system-ui, sans-serif;
    font-size: 5rem;
    cursor: pointer;
}

.plansTitle{
    font-style: italic;
}

h1:hover {
    --_p: 100%;
}

h2 {
    color: #33a1f1;
}

.card-body {
    box-shadow: 8px 10px black, -8px -10px blue;
    height: 480px;
}

.plans {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: stretch;
}

.card {
    border: none;
    width: 18%;
    margin-bottom: 20px;
}

.btn {
    border-radius: 20%;
    transition: 0.7s ease-in-out;
    border: none;
    padding: 8px 30px;
    border-radius: 50px;
    color: #fff;
    margin: 10px 0px;
    cursor: pointer;
}

.first {
    transition: 1s ease-in-out;
}

.second {
    transition: 2s ease-in-out;
    overflow: auto;
}

.btn:hover {
    background-color: #33a1f1;
}

ul {
    list-style: circle;
    line-height: 2em;
    padding-left: 20px;
}

li {
    text-transform: capitalize;
    padding-bottom: 5px;
}

@media (max-width: 768px) {
    .plans {
        flex-direction: column;
        align-items: center;
    }

    .card {
        width: 80%;
        margin-top: 20px;
    }
}
</style>

<script>
export default {
    name: 'plansView',
    data() {
        return {
            opacity: 0,
            opacity_1: 0,
            opacity_2: 0,
            visibility: 'none',
            text: 'Show More',
        };
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            const scrollTop = window.scrollY;
            this.opacity = scrollTop >= 1497.5999755859375 ? 1 : 0;
            this.opacity_1 = scrollTop >= 1519.199951171875 ? 1 : 0;
            this.opacity_2 = scrollTop >= 1519.199951171875 ? 1 : 0;
        },
        showMore() {
            if (this.text === 'Show More') {
                this.text = 'Show Less';
                this.visibility = 'block';
            } else {
                this.text = 'Show More';
                this.visibility = 'none';
            }
        },
    },
};
</script>
