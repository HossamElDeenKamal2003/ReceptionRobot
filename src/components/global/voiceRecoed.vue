<template>
    <div class="container">
        <div class="display">
            <p>{{ message }}</p>
            <audio controls v-if="audioURL" :src="audioURL"></audio>
        </div>
        <div class="controllers">
            <button v-if="currentState === 'Initial'" @click="startRecording" class="btn btn-primary">Start
                Recording</button>
            <button v-if="currentState === 'Record'" @click="stopRecording">Stop Recording</button>
            <button v-if="currentState === 'Download'" @click="recordAgain">Record Again</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentState: 'Initial',
            message: '',
            mediaRecorder: null,
            chunks: [],
            audioURL: ''
        }
    },
    mounted() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    this.mediaRecorder = new MediaRecorder(stream)
                    this.mediaRecorder.ondataavailable = e => this.chunks.push(e.data)
                    this.mediaRecorder.onstop = () => {
                        const blob = new Blob(this.chunks, { type: 'audio/ogg; codecs=opus' })
                        this.chunks = []
                        this.audioURL = window.URL.createObjectURL(blob)
                    }
                })
                .catch(error => {
                    console.log('Following error has occurred:', error)
                })
        } else {
            this.currentState = ''
            this.message = 'Your browser does not support mediaDevices'
        }
    },
    methods: {
        startRecording() {
            this.currentState = 'Record'
            this.mediaRecorder.start()
            this.message = 'Recording...'
        },
        stopRecording() {
            this.currentState = 'Download'
            this.mediaRecorder.stop()
            this.message = 'Voice Message'
        },
        recordAgain() {
            this.currentState = 'Record'
            this.audioURL = ''
            this.startRecording()
        }
    }
}
</script>

