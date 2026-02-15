import { createRouter, createWebHistory } from "vue-router";

import appState from "@/appState.js";
import Error404 from "@/Views-Main/Error404.vue";



function addTemplatesToRoutes() {
    appState.mainRoutes.forEach((route) => {
        routes.push(route)
    })
    
    appState.categories.forEach((cat) => {
        routes.push(
            { path: `/${cat.relUrl}`, component: cat.components[0].component, meta: { title: cat.components[0].title } }
        );
        
        cat.components.forEach(comp => {
            routes.push(
                { path: `/${cat.relUrl}/${comp.relUrl}`, component: comp.component, meta: { title: comp.title } }
            );
    
        })
    });
}



// Routes :
// / : Home
// /TemplateCategory : Le premier template de chaque catégorie
// /TemplateCategory/TemplateName : Une pour chaque template
// else : 404

const routes = [];
addTemplatesToRoutes();
routes.push({
    // 404
    path: "/:pathMatch(.*)*",
    component: Error404,
    name: "Error404",
    meta: { title: "Page non trouvée" },
})

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.afterEach((to) => {
    // Hook de navigation exécuté après chaque navigation
    document.title = to.meta.title || appState.title;
});

export default router;
