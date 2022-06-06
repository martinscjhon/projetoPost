import { createRouter, createWebHashHistory } from "vue-router";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Perfil from "../pages/Perfil";
import firebase from "../services/firebaseConnection";

const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    component: Home,
    meta: {
      requireAuth: true, //rota protegida. Só acessa quem estiver autenticado
    },
  },
  {
    path: "/perfil/:userId",
    component: Perfil,
    props: true,
    meta: {
      requireAuth: true, //rota protegida. Só acessa quem estiver autenticado
    },
  },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: {
      requireAuth: true, //rota protegida. Só acessa quem estiver autenticado
    },
  },
  {
    path: "/:catchAll(.*)",
    component: "/login",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(
    (verification) => verification.meta.requireAuth
  );

  if (requireAuth && !firebase.auth().currentUser) {
    next("/login");
  } else {
    next();
  }
});

export { router };
