<script setup>
    import Footer from "@/Views-Main/components/Footer.vue";
</script>

<template>
        <div class="viewContainer">
            <main>
                <h1>Bienvenue sur Web Templates</h1>
            </main>
            <Footer></Footer>
        </div>
</template>

<style scoped>
    .viewContainer {
        display: flex;
        flex-direction: column;
    }

    main {
        /* pos */
        flex: 1;
        width: 80vw;
        margin: 20px auto;
    }

    p {
        width: 300px;
    }
</style>