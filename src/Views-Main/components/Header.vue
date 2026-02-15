<script setup>
    import { ref, computed } from 'vue'
    import appState, { switchTheme } from '@/appState';

    function openDrawer(index) {
        openedDrawerIndex.value = index
    }

    function closeDrawer() {
        openedDrawerIndex.value = null
    }



    const openedDrawerIndex = ref(null)
    const headerIsHidden = ref(false)
</script>

<template>
    <div class="componentContainer">
        <header :class="{headerIsHidden: headerIsHidden }">
            <RouterLink to="/" class="appName">Web Templates</RouterLink>
    
            <nav class="navbar">
                <button class="charAsIcon themeSwitch" type="button" role="switch" @click="switchTheme()">{{ appState.theme.value == "light" ? "🌙" : "☀️" }}</button>
    
                <div class="navDrawer-container"
                    v-for="(cat, index) in appState.categories"
                    @mouseenter="openDrawer(index)"
                    @mouseleave="closeDrawer(index)"
                    >
                    <RouterLink class="navDrawerHandle navLink"
                        :to="`/${cat.relUrl}`"
                        >
                        <span class="category">{{ cat.name }}</span><span class="charAsIcon"> ▿</span>
                    </RouterLink>
    
                    <Transition name="fade">
                        <ul class="navDrawer"
                            v-show="openedDrawerIndex == index"
                            @mouseenter="openDrawer(index)"
                            >
                            <RouterLink class="navDrawerItem navLink"
                                v-for="comp in cat.components"
                                :to="`/${cat.name}/${ comp.relUrl }`"
                                >
                                {{ comp.name }}.vue<span></span
                            ></RouterLink>
                        </ul>
                    </Transition>
                </div>
                <RouterLink class="navLink" to="/">Home</RouterLink>
            </nav>
        </header>
        <button class="hideHeader charAsIcon" :class="{headerIsHidden : headerIsHidden }" @click="headerIsHidden = !headerIsHidden">{{ headerIsHidden ? "▽" : "△" }}</button>
    </div>
</template>

<style scoped>
    /* Stratégie de nesting : */
    /* Je nest par petite notion */
    /* "Quand je regarde la page, comment je pourrais regrouper les éléments" */
    /* Les éléments qui sont seuls je les nest dans leur parent */
    /* Et les éléments qui sont groupés ensemble sont nestés dans leur container */

    .componentContainer {
        /* Vars */
        --headerHeight: 70px;

        transition: height .5s, var(--transitionDefaults);
        height: calc(var(--headerHeight) * v-bind("headerIsHidden ? 0 : 1"));
    }

    header {
        /* pos */
        width: 100%;
        height: var(--headerHeight);
        padding: 15px 24px;
        
        /* prop */
        background-color: var(--bg);
        box-shadow: var(--shadow);
        transition: transform .5s, opacity .2s, var(--transitionDefaults);

        /* content pos */
        display: flex;
        justify-content: space-between;
        align-items: center;

        &.headerIsHidden {
            transform: translateY(-100%);
            opacity: 0;
        }

        .appName {
            font-size: 1.5em;
            color: var(--textSub1);
            text-decoration: underline var(--emph);
        }
    }

    .themeSwitch {
        font-size: large;
        background-color: transparent;
        transition: rotate .5s ease-out, var(--transitionDefaults);

        &:active {
            rotate: 360deg;
            transition: rotate 0s, var(--transitionDefaults);
        }
    }

    .navbar {
        display: flex;
        gap: 5px;

        .navLink {
            /* pos */
            height: 40px;
            padding: 0 15px;

            /* prop */
            
            /* content pos */
            display: flex;
            align-items: center;
            
            /* content prop */
            color: var(--linkNav);
            font-size: var(--linkNavFontSize);
            text-decoration: none;
            border-radius: 50px;
            transition: background-color .2s, var(--transitionDefaults);
            
            &:hover {
                color: var(--linkNavHover);
                background-color: var(--btnBgHover);
                cursor: pointer;
            }

            &:active {
                background-color: var(--btnBgActive);
            }

            &.navDrawerHandle:hover {
                background-color: transparent;
            }

            &.navDrawerItem {
                /* pos */
                min-height: 40px;
                padding: 10px 15px;
                
                /* prop */
                transition: color 0.25s, var(--transitionDefaults);
                
                &:hover {
                    background-color: transparent;
                    /* color: var(--emph); */
                }
            }
        }

        .navDrawer-container:has(.router-link-active) .category,
        .navDrawer-container:has(.router-link-active) .navDrawerItem.router-link-active {
            /* Souligne le lien de la page actuelle */
            text-decoration: underline var(--emph) !important;
        }

        .navDrawer-container {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;

            &:before {
                /* Marge extérieure pour garder le drawer ouvert */
                content: "";
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: -1;
                /* background-color: rgba(0, 0, 0, 0.083); */
            }
            
            .navDrawer {
                /* pos */
                position: absolute;
                top: 40px;
                /* box-shadow: var(--shadow) 0px 3px 4px 1px; */
                padding: 10px 0;
                border-radius: 12px;
                width: max-content;
                max-width: 300px;
                
                /* prop */
                background-color: var(--bg);
                box-shadow: var(--shadow2);

                /* content pos */
                display: flex;
                flex-direction: column;
                transition-duration: 2s;

                overflow-wrap: break-word;

                &:before {
                    /* Marge extérieure pour garder le drawer ouvert */
                    content: "";
                    position: absolute;
                    top: -5px;
                    right: -20px;
                    bottom: -20px;
                    left: -20px;
                    z-index: -1;
                    /* background-color: rgba(0, 0, 0, 0.066); */
                }
            }
        }
    }

    button.hideHeader {
        /* pos */
        position: absolute;
        top: calc(var(--headerHeight) + 10px);
        right: 10px;
        width: 30px;
        height: 20px; 
       
        /* prop */
        background-color: var(--bgTop1);
        transition: top .5s, var(--transitionDefaults);

        &.headerIsHidden {
            top: 10px
        }
    }


</style>