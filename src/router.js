import { createRouter, createWebHistory } from 'vue-router';
import Welcome from './pages/Welcome.vue';
import List from './pages/List.vue';

const routes = [
	{
		path: '/',
		name: 'Welcome',
		component: Welcome,
	},
	{
		path: '/list',
		name: 'List',
		component: List,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
