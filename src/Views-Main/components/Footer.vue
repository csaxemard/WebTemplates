<script setup>

</script>

<template>
    <footer><p>&copy; 2026 Website Templates by <a target="_" href="https://github.com/csaxemard">csaxemard</a></p></footer>
</template>

<style scoped>
    footer {
        /* pos */
        padding: 15px;
        width: 100%;

        /* prop */
        background-color: var(--bg);

        p {
            font-size: small;
            color: var(--textSub1);
        }
        a {
            text-decoration: none;

            &:hover {
                &:after {
                    content: " ⇗";
                    line-height: 1;
                }
            }
        }
    }
</style>