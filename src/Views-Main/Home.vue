<script setup>
    import Footer from "@/Views-Main/components/Footer.vue";
    import References from "@/references";



    function getHostname(ref) {
        try {
            const url = new window.URL(ref)
            return url.hostname.replace(/^www./, "") + url.pathname.replace(/\/$/, "") || "";
        } catch {
            return ref
        }
    }
</script>

<template>
    <div class="viewContainer">
        <main class="main centeredMain">
            <h1>Bienvenue sur Web Templates</h1>

            <section class="references">
                <h2>Références de sites</h2>
                <div v-for="(ref, index) in References" :key="index">
                    <a :href="ref" target="_blank" rel="noopener noreferrer">{{ getHostname(ref) }}</a>
                </div>
            </section>
        </main>

        <Footer></Footer>
    </div>
</template>

<style scoped>
    .viewContainer {
        --linkNavSub: #3876d9;
    }


</style>