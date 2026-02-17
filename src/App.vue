<script setup>
    import {onMounted} from "vue"

    import Header from "@/Views-Main/components/Header.vue";
    import appState, { initCssThemeVariables } from "@/appState.js";

    onMounted(() => {
        // onMounted est appelé après la création du DOM
        initCssThemeVariables()
    })
</script>

<template>
    <div id="root" :class="appState.theme.value">
        <Header></Header>
        <RouterView />
    </div>
</template>

<style scoped>
    #root {
        /* self pos */
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        z-index: 0;

        /* self prop */
        background-color: var(--bg);
        overflow-x: hidden;

        /* content prop */
        color: var(--text);
        font-family: var(--font);

        & > .viewContainer {
            flex: 1;
            z-index: 1;
            display: flex;
            flex-direction: column;
            
            & :deep(main) {
                flex: 1;
            }
            & :deep(main.centeredMain) {
                width: 80vw;
                margin: 50px auto 0 auto;
            }
        }
        & > .componentContainer {
            z-index: 2;
        }
    }
</style>
