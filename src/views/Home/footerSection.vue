<template>
    <div class="footer">
        <div class="left">
            <h1>Recption</h1>
            <h1 class="llab" style="color:#33A1F1;">Robot</h1>
        </div>
        <div class="icons">
            <a href="https://www.facebook.com/share/W3MSbiL7p7d2VWYZ/?mibextid=qi2Omg" class="social-icon" target="_blank"><i class="bi bi-facebook"></i></a>
            <a href="https://www.instagram.com/receptionrobot?igsh=MXJkN2NkNnQzaDZkNQ==" class="social-icon" target="_blank"><i class="bi bi-instagram"></i></a>
            <a href="#" class="social-icon"  target="_blank"><i class="bi bi-whatsapp"></i></a>
        </div>
    </div>
</template>

<style>
.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FDFBFB;
    padding: 10px 20px;
    
}

.left {
    display: flex;
    align-items: center;
}

.left h1 {
    font-size: 1.5em;
}

.icons {
    display: flex;
}

.social-icon {
    margin-right: 10px;
    font-size: 1.5em;
    color: black;
    text-decoration: none;
}

.social-icon:hover {
    color: #33A1F1;
}


</style>

<script>
export default {
    name: 'footerSection',
};
</script>
