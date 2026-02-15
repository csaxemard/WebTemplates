<script>
    export const config = {
        name: "Card list"
    }
</script>

<script setup>
    import { provide, reactive } from "vue";
    import confetti from 'canvas-confetti';

    let exercicesModules = import.meta.glob('./components/Exercice*.vue', { eager: true }) // Importe tous les fichiers d'un dossier




    // Utils
    let cookieDo = {
        set(nameStr, valueStr) {
            document.cookie = `${nameStr}=${valueStr}; path=/; max-age=3600`
        },

        get(name) {
            const cookies = document.cookie.split('; ').reduce((acc, c) => {
                const [key, val] = c.split('=')
                acc[key] = decodeURIComponent(val)
                return acc
            }, {})
            return cookies[name] || null
        }

    }

    function confettiFromEle(eleSelector) {
        const rect = document.querySelector(eleSelector).getBoundingClientRect()

        const x = (rect.left + rect.width / 2) / window.innerWidth
        const y = (rect.top + rect.height / 2) / window.innerHeight

        confetti({
            particleCount: 10,
            startVelocity: 15,
            angle: 90,
            spread: 135,
            origin: { x, y }
        })
    }



    // --- Main ---
    // Réactivité :
    // let a = ref("Hello");    // retourne un objet contenant la valeur. Dès que la valeur est changée, ça recharge la page
    // console.log(a.value);    // On accède à la valeur du ref par .value
    // let stateEx0 = { compteur: 0 };
    // let stateEx0 = ref({compteur: 0}); // Avec ref ou reactive, si la variable est affichée dans le dom, elle est actualisée
    let appState = reactive({ compteur: 0 });
    let stateEx0 = reactive({ compteur: 0 }); // Différence, reactive c'est pour tout un objet et ses propriétés


    let exercices = Object.entries(exercicesModules)    // Extrait les default de chaque modules
        .map(([path, m]) => {
            const match = path.match(/Exercice(\d+)\.vue$/);
            const number = match ? Number(match[1]) : 0;

            return {
                key: path,
                comp: m.default,
                number
            };
        })
        .sort((a, b) => a.number - b.number);
    // exercices = exercices.reverse()

    provide('confettiFromEle', confettiFromEle);
    provide('appState', appState);
    provide('stateEx0', stateEx0);
    provide("cookieDo", cookieDo);
</script>

<template>
    <div class="viewContainer">
        <main>
            <img class="bg" src="/dew.jpg" alt="background" />
            
            <h1>Bienvenue, ceci est un test de Vue 👓</h1>
            
            <div class="main">
                <!-- Affiche chaque exercices -->
                <component v-for="ex in exercices" :key="ex.key" :is="ex.comp" />
                <button type="submit"></button>
            </div>
        </main>
    </div>
</template>

<style scoped>
    main {
        display: flex;
        flex-direction: column;
    }

    img.bg {
        
    }

    .body {
        width: 100%;
        height: 100%;
        flex: 1;
        border-radius: 0;

        /* width: fit-content; */
        margin: auto;
        padding: 50px 50px;
        background-color: #3c3c3c;

        display: flex;
        flex-direction: column;
        align-items: center;
        /* max-width: 750px; */
        z-index: -3;

        & > div {
            z-index: 1;
        }

        .bg {
            position: fixed;
            top: 0;
            left: 0;
            margin: 0;
            padding: 0;
            object-fit: cover;
            pointer-events: none;
            opacity: 0.5;
            border-radius: 0;
            height: 100vh;
            width: 100vw;
            z-index: -2;
            transition: none;
        }

        h1 {
            position: relative;
            background-color: #3c3c3c;
            border: solid 5px transparent;
            border-radius: 50px;
            margin-bottom: 50px;
            padding: 10px;
            text-align: center;

            &:before {
                content: "";
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: -1;
                margin: -10px;
                border-radius: inherit;
                background: linear-gradient(175deg, #ffc33e, #58c5f2);
            }
        }

        .main {
            padding: 10px;
            max-width: 750px;
            width: 750px;

            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 50px;
        }


        .topright {
            position: absolute;
            top: 0;
            right: 0;
            margin: 15px 15px 0 0;

            display: flex;
            flex-direction: column;
            align-items: end;
            gap: 10px;
        }

        .flexright {
            display: flex;
            flex-direction: column;
            align-items: end;
            font-size: small;
        }

        .alert {
            color: #ff9898;
        }

        input,
        textarea {
            border-radius: 0;
            color: black;
            border: none;
            padding: 5px;
            resize: both;
        }

        .large {
            font-size: x-large;
        }

        .t-small {
            font-size: small;
        }

        .char-icon {
            line-height: 1;
        }
    }
</style>