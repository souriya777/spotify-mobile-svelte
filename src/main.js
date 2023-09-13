import App from '@/App.svelte';

import '@/register-service-worker';

const app = new App({
  target: document.getElementById('app'),
});

export default app;
