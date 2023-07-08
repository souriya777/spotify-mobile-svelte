import '@/css/main.scss';
import App from '@/App.svelte';
import { toto } from '@/js/toto';

toto();

const app = new App({
  target: document.getElementById('app'),
});

export default app;
