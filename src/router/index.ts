import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/Contact.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../auth/Signup.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../auth/Login.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../auth/Profile.vue"),
    },
    {
      path: "/chatbot",
      name: "chatbot",
      component: () => import("../chatbot/Chatbot.vue"),
    },
    {
      path: "/electric-circuit",
      name: "electric-circuit",
      component: () => import("../Sections/ElectricCircuits.vue"),
    },
    {
      path: "/fluid-dynamics",
      name: "fluid-dynamics",
      component: () => import("../Sections/FluidDynamics.vue"),
    },
    {
      path: "/harmonic-motion",
      name: "harmonic-motion",
      component: () => import("../Sections/HarmonicMotion.vue"),
    },
    {
      path: "/pendulum-swing",
      name: "pendulum-swing",
      component: () => import("../Sections/PendulumSwing.vue"),
    },
    {
      path: "/thermo-dynamics",
      name: "thermo-dynamics",
      component: () => import("../Sections/Thermodynamics.vue"),
    },
    {
      path: "/wave-patterns",
      name: "wave-patterns",
      component: () => import("../Sections/WavePatterns.vue"),
    },
    {
      path: "/topic/:title",
      name: "topic-content",
      component: () => import("../views/TopicContent.vue"),
      props: true
    }
  ],
});

export default router;
