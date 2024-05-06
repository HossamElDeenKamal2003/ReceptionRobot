<template>
    <div id="draw">
        <div class="welcome-bg" v-if="popups.showWelcome">
            <div class="welcome">
                <h1 class="fade-up">Vue JS draw</h1>
                <h2 class="fade-up">By Lewi Hussey</h2>
                <a href="//twitter.com/lewitje" target="blank" title="Lewi Hussey on Twitter"
                    class="fade-up">@lewitje</a>
                <span class="btn fade-up" title="Close" @click="popups.showWelcome = false">Let's go</span>
            </div>
        </div>
        <div class="app-wrapper">
            <canvas ref="canvas"></canvas>
            <div :style="{ transform: 'translate(' + cursorPosition.x + 'px, ' + cursorPosition.y + 'px)' }"
                id="cursor"></div>
            <div class="controls">
                <div class="btn-row">
                    <div class="history" title="history">{{ history.length }}</div>
                </div>
                <div class="btn-row">
                    <button type="button" @click="removeHistoryItem" :class="{ disabled: !history.length }"
                        title="Undo">
                        <i class="ion ion-reply"></i>
                    </button>
                    <button type="button" @click="removeAllHistory" :class="{ disabled: !history.length }"
                        title="Clear all">
                        <i class="ion ion-trash-a"></i>
                    </button>
                </div>
                <div class="btn-row">
                    <button title="Brush options" @click="popups.showOptions = !popups.showOptions">
                        <i class="ion ion-android-create"></i>
                    </button>
                    <div class="popup" v-if="popups.showOptions">
                        <div class="popup-title">Options</div>
                        <button title="Restrict movement vertical"
                            @click="options.restrictY = !options.restrictY; options.restrictX = false" :class="{ active: options.restrictY }">
                            <i class="ion ion-arrow-right-c"></i>
                            Restrict vertical
                        </button>
                        <button title="Restrict movement horizontal"
                            @click="options.restrictX = !options.restrictX; options.restrictY = false"
                            :class="{ active: options.restrictX }">
                            <i class="ion ion-arrow-up-c"></i>
                            Restrict horizontal
                        </button>
                        <button type="button" @click="simplify" :class="{ disabled: !history.length }"
                            title="Simplify paths">
                            <i class="ion ion-wand"></i>
                            Simplify paths
                        </button>
                        <button type="button" @click="jumble" :class="{ disabled: !history.length }" title="Go nutz">
                            <i class="ion ion-shuffle"></i>
                            Go nutz
                        </button>
                    </div>
                </div>
                <div class="btn-row">
                    <button title="Pick a brush size" @click="popups.showSize = !popups.showSize"
                        :class="{ active: popups.showSize }">
                        <i class="ion ion-android-radio-button-on"></i>
                        <span class="size-icon">{{ size }}</span>
                    </button>
                    <div class="popup" v-if="popups.showSize">
                        <div class="popup-title">Brush size</div>
                        <label v-for="sizeItem in sizes" class="size-item" :key="sizeItem">
                            <input type="radio" name="size" v-model="size" :value="sizeItem"
                                @click="popups.showSize = !popups.showSize" />
                            <span class="size" :style="{ width: sizeItem + 'px', height: sizeItem + 'px' }"
                                @click="popups.showSize = !popups.showSize"></span>
                        </label>
                    </div>
                </div>
                <div class="btn-row">
                    <button title="Pick a color" @click="popups.showColor = !popups.showColor"
                        :class="{ active: popups.showColor }">
                        <i class="ion ion-android-color-palette"></i>
                        <span class="color-icon" :style="{ backgroundColor: color }"></span>
                    </button>
                    <div class="popup" v-if="popups.showColor">
                        <div class="popup-title">Brush color</div>
                        <label v-for="colorItem in colors" class="color-item" :key="colorItem">
                            <input type="radio" name="color" v-model="color" :value="colorItem" />
                            <span :class="'color color-' + colorItem" :style="{ backgroundColor: colorItem }"
                                @click="popups.showColor = !popups.showColor"></span>
                        </label>
                    </div>
                </div>
                <div class="btn-row">
                    <button title="Save" @click="popups.showSave = !popups.showSave">
                        <i class="ion ion-android-cloud-outline"></i>
                    </button>
                    <div class="popup" v-if="popups.showSave">
                        <div class="popup-title">Save your design</div>
                        <div class="form">
                            <input type="text" placeholder="Save name" v-model="save.name" />
                            <div v-if="save.name.length < 3" class="text-faded">
                                <i>Min 3 characters</i>
                            </div>
                            <span class="btn" @click="saveItem">
                                Save as
                                <span class="text-faded">{{ save.name }}</span>
                            </span>
                        </div>
                        <div class="saves" v-if="save.saveItems.length">
                            <div class="popup-title">Load a save</div>
                            <div class="save-item" v-for="item in save.saveItems" :key="item.name">
                                <h3>{{ item.name }}</h3>
                                <span class="btn" @click="loadSave(item)">load</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn-row">
                    <button @click="popups.showWelcome = true" title="Made by Lewi">
                        <i class="ion ion-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "drawerPage",
    data() {
        return {
            history: [],
            color: '#13c5f7',
            popups: {
                showColor: false,
                showSize: false,
                showWelcome: false,
                showSave: false,
                showOptions: false
            },
            options: {
                restrictY: false,
                restrictX: false
            },
            save: {
                name: '',
                saveItems: []
            },
            size: 12,
            colors: [
                '#d4f713',
                '#13f7ab',
                '#13f3f7',
                '#13c5f7',
                '#138cf7',
                '#1353f7',
                '#2d13f7',
                '#7513f7',
                '#a713f7',
                '#d413f7',
                '#f713e0',
                '#f71397',
                '#f7135b',
                '#f71313',
                '#f76213',
                '#f79413',
                '#f7e013'
            ],
            sizes: [6, 12, 24, 48],
            weights: [2, 4, 6],
            cursorPosition: { x: 0, y: 0 }
        };
    },
    methods: {
        closeWelcomeScreen() {
            console.log('Closing welcome screen');
            this.popups.showWelcome = false;
        },
        removeHistoryItem() {
            this.history.splice(this.history.length - 2, 1);
            this.redraw();
        },
        removeAllHistory() {
            this.history = [];
            this.redraw();
        },
        simplify() {
            const simpleHistory = [];
            this.history.forEach((item, i) => {
                if (i % 6 !== 1 || item.isDummy) {
                    simpleHistory.push(item);
                }
            });
            this.history = simpleHistory;
            this.redraw();
        },
        jumble() {
            this.history.forEach((item, i) => {
                item.r += Math.sin(i * 20) * 5;
            });
            this.history = this.shuffle(this.history);
            this.redraw();
        },
        shuffle(a) {
            const b = [];
            // eslint-disable-next-line no-unused-vars
            a.forEach((item, i) => {
                if (!item.isDummy) {
                    const l = b.length;
                    const r = Math.floor(l * Math.random());
                    b.splice(r, 0, item);
                }
            });

            for (let i = 0; i < b.length; i++) {
                if (i % 20 === 1) {
                    b.push(this.getDummyItem());
                }
            }

            return b;
        },
        saveItem() {
            if (this.save.name.length > 2) {
                const historyItem = {
                    history: this.history.slice(),
                    name: this.save.name
                };

                this.save.saveItems.push(historyItem);
                this.save.name = "";
            }
        },
        loadSave(item) {
            this.history = item.history.slice();
            this.redraw();
        },
        moveMouse(e) {
            const x = e.offsetX;
            const y = e.offsetY;
            this.cursorPosition = { x: x - 10, y: y - 10 };
        },
        getDummyItem() {
            const lastPoint = this.history[this.history.length - 1];
            return {
                isDummy: true,
                x: lastPoint.x,
                y: lastPoint.y,
                c: null,
                r: null
            };
        },
        setDummyPoint() {
            const item = this.getDummyItem();
            this.history.push(item);
            this.draw(item, this.history.length);
        },
        redraw() {
            const ctx = this.$refs.canvas.getContext('2d');
            ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
            this.drawBgDots(ctx);

            if (!this.history.length) {
                return true;
            }

            this.history.forEach((item, i) => {
                this.draw(ctx, item, i);
            });
        },
        drawBgDots(ctx) {
            const gridSize = 50;
            ctx.fillStyle = 'rgba(0, 0, 0, .2)';

            for (let i = 0; i * gridSize < this.$refs.canvas.width; i++) {
                for (let j = 0; j * gridSize < this.$refs.canvas.height; j++) {
                    if (i > 0 && j > 0) {
                        ctx.beginPath();
                        ctx.rect(i * gridSize, j * gridSize, 2, 2);
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }
        },
        draw(ctx, item, i) {
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            const prevItem = this.history[i - 2];

            if (i < 2) {
                return false;
            }

            if (!item.isDummy && !this.history[i - 1].isDummy && !prevItem.isDummy) {
                ctx.strokeStyle = item.c;
                ctx.lineWidth = item.r;

                ctx.beginPath();
                ctx.moveTo(prevItem.x, prevItem.y);
                ctx.lineTo(item.x, item.y);
                ctx.stroke();
                ctx.closePath();
            } else if (!item.isDummy) {
                ctx.strokeStyle = item.c;
                ctx.lineWidth = item.r;

                ctx.beginPath();
                ctx.moveTo(item.x, item.y);
                ctx.lineTo(item.x, item.y);
                ctx.stroke();
                ctx.closePath();
            }
        },
        setSize() {
        // Implement your logic to set the size
        // For example, you can set the canvas size here
        const canvas = this.$refs.canvas;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    },
    },
    mounted() {
        this.setSize();
        this.listen();
        this.redraw();
    },
    watch: {
        '$route'() {
            this.redraw();
        }
    }
};
</script>

<style scoped>
#canvas {
    border: 1px solid #333;
}

#cursor {
    width: 20px;
    height: 20px;
    background-color: #13c5f7;
    border-radius: 50%;
    position: absolute;
    z-index: 999;
}
</style>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');

$prim: rgb(0, 149, 255);

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    background-color: black;
    color: white;
}

body,
button,
input {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 400;
}

h1,
h2,
h3,
h4,
h5 {
    font-weight: 500;
}

.text-faded {
    opacity: .5;
}

.cursor {
    position: fixed;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 3px solid rgb(30, 30, 30);
    pointer-events: none;
    user-select: none;
    mix-blend-mode: difference;
    opacity: 0;
    transition: opacity 1s;
}

canvas {
    width: 100%;
    height: calc(100vh - 60px);
    background-color: white;
    cursor: none;

    &:hover+.cursor {
        opacity: 1;
    }

    &:active+.cursor {
        border-color: rgb(60, 60, 60);
    }
}

.controls {
    position: fixed;
    z-index: 5;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: rgb(10, 10, 10);
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
}

.stat {
    font-size: 20px;
    margin-bottom: 15px;
}

.btn-row {
    position: relative;
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 15px;
    border-radius: 4px;
}

.popup {
    position: absolute;
    width: 300px;
    bottom: 58px;
    padding: 30px;
    left: calc(50% - 150px);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: white;
    color: rgb(30, 30, 30);
    border-radius: 10px 10px 0 0;
    border: 1px solid rgb(220, 220, 220);
    border-bottom-width: 0;
    opacity: 0;
    animation: popup .5s forwards cubic-bezier(.2, 2, .4, 1);
    z-index: 2;
    overflow: hidden;
    max-height: 80vh;
    overflow-y: auto;

    .popup-title {
        flex: 0 0 100%;
        text-align: center;
        font-size: 16px;
        color: black;
        opacity: .5;
        margin-bottom: 10px;
    }

    button {
        height: 80px;
        width: 80px;
        text-align: center;
        font-size: 14px;
        color: rgba(0, 0, 0, .4);

        i {
            display: block;
            font-size: 30px;
            margin-bottom: 5px;
            color: rgba(0, 0, 0, .2);
        }

        &.disabled {
            color: rgba(0, 0, 0, .2);

            i {
                color: rgba(0, 0, 0, .1);
            }
        }

        &.active,
        &:active {
            color: rgba(0, 0, 0, .4);

            i {
                color: $prim;
            }
        }
    }
}

@keyframes popup {
    from {
        opacity: 0;
        transform: translateX(40px);
    }

    to {
        opacity: 1;
        transform: none;
    }
}

.welcome-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    background-color: $prim;
    display: flex;
    justify-content: center;
    align-items: center;
}

.fade-up {
    opacity: 0;
    animation: fade-up 1s forwards cubic-bezier(.2, 2, .4, 1);
}

.btn {
    display: inline-block;
    margin-top: 10px;
    padding: 10px 20px;
    font-weight: 400;
    font-size: 16px;
    border-radius: 4px;
    background-color: $prim;
    color: white;
    animation-delay: 1s;
    transition: all .15s;
    cursor: pointer;

    &:hover {
        background-color: lighten($prim, 10%);
    }
}

.welcome {
    width: 400px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1.fade-up {
        font-weight: 300;
        font-size: 40px;
        animation-delay: .25s;
    }

    h2.fade-up {
        font-weight: 400;
        color: rgba(255, 255, 255, .5);
        animation-delay: .5s;
    }

    a.fade-up {
        color: rgba(255, 255, 255, .5);
        display: inline-block;
        margin-top: 20px;
        text-decoration: none;
        animation-delay: .75s;
    }

    .btn.fade-up {
        background-color: rgba(255, 255, 255, .2);
        color: white;
        margin-top: 60px;

        &:hover {
            background-color: rgba(255, 255, 255, .3);
        }
    }
}


@keyframes fade-up {
    from {
        transform: translateY(80px);
        opacity: 0;
    }

    to {
        transform: none;
        opacity: 1;
    }
}

.form {
    flex: 0 0 100%;

    input {
        display: block;
        appearance: none;
        border: 0;
        box-shadow: 0;
        outline: 0;
        background-color: rgb(240, 240, 240);
        border-radius: 4px;
        padding: 10px 15px;
        width: 100%;
        margin-bottom: 4px;
    }
}

button {
    appearance: none;
    border: 0;
    border-radius: 0;
    box-shadow: 0;
    width: 40px;
    height: 60px;
    display: inline-block;
    background-color: transparent;
    color: rgb(140, 140, 140);
    font-size: 22px;
    transition: all .15s;
    cursor: pointer;
    outline: 0;
    position: relative;

    .size-icon,
    .color-icon {
        position: absolute;
        top: 10px;
        right: 0;
    }

    .color-icon {
        width: 5px;
        height: 5px;
        border-radius: 50%;
    }

    .size-icon {
        font-size: 6px;
        text-align: right;
    }

    &:hover {
        opacity: .8;
    }

    &:active,
    &.active {
        color: white;
    }

    &.disabled {
        color: rgb(50, 50, 50);
        cursor: not-allowed;
    }
}

.history {
    width: 30px;
    height: 30px;
    background-color: rgb(30, 30, 30);
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    overflow: hidden;
    color: rgb(140, 140, 140);
}

.color-item {
    position: relative;
    display: inline-block;
    cursor: pointer;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    input {
        position: absolute;
        opacity: 0;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
    }

    input:checked+.color {
        opacity: 1;
        border: 2px solid $prim;
    }

    .color {
        display: block;
        width: 30px;
        height: 30px;
        background-color: white;
        border-radius: 50%;

        &:hover {
            opacity: .8;
        }
    }
}

@keyframes pulsate {

    0%,
    100% {
        transform: none;
    }

    50% {
        transform: scale(1.15);
    }
}

.size-item {
    width: 40px;
    height: 60px;
    display: inline-flex;
    position: relative;
    justify-content: center;
    align-items: center;
    vertical-align: top;
    cursor: pointer;

    input {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        opacity: 0;
    }

    .size {
        background-color: rgb(140, 140, 140);
        display: inline-block;
        border-radius: 50%;
        transition: all .15s;
        transform: translate(-50%, -50%) scale(.6);
        position: absolute;
        top: 50%;
        left: 50%;

        &:hover {
            opacity: .8;
        }
    }

    input:checked+.size {
        background-color: $prim;
    }
}

.saves {
    flex: 0 0 calc(100% + 60px);
    margin: 30px -30px -30px;
    padding: 30px;
    background-color: rgb(240, 240, 240);
    max-height: 250px;
    overflow-y: auto;

    .save-item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>