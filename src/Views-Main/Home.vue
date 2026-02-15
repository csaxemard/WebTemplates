<script setup>
    import Footer from "@/Views-Main/components/Footer.vue";
    import resources from "@/resources";



    function formatUrl(ref) {
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
                <section class="resource">
                    <h2>Outils</h2>
                    <p class="small textSub1">Outils pour m'aider à créer des sites</p>
                
                    <div class="tools">
                        <div class="tool" v-for="(tool, index) in resources.tools" :key="index">
                            <a :href="tool" target="_blank" rel="noopener noreferrer">{{ formatUrl(tool) }}</a>
                        </div>
                    </div>
                </section>

                <section class="resource">
                    <h2>Références</h2>
                    <p class="small textSub1">Sites dont le design me sert de référence</p>
                
                    <div class="refs">
                        <div class="ref" v-for="(ref, index) in resources.references" :key="index">
                            <a :href="ref" target="_blank" rel="noopener noreferrer">{{ formatUrl(ref) }}</a>
                        </div>
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

    main {
        display: flex;
        flex-direction: column;
        gap: 50px
    }

    .resource {
        border: 2px solid var(--bgTop2);
        /* background-color: var(--bgTop1); */
        padding: 20px;
        border-radius: 12px;
        
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        
        & > div {
            margin-top: 30px;
            display: flex;
            flex-wrap: wrap;
            gap: 50px;
            width: fit-content;

            & > div {
                display: flex;

                a {
                    flex: 1;
                    position: relative;
                    padding: 20px;
                    border-radius: 12px;
                    background-color: var(--bgTop2);
                    
                    &::after {
                        position: absolute;
                        top: 15px;
                        right: 5px;
                    }
                }
            }
        }
    }
</style>