<script>
  import { clearLocalStorage } from '@/js/store';
  import { getDevice } from '@/js/browser-utils';
</script>

<button on:click={clearLocalStorage}>🗑️ localStorage</button>
<p>navigator.userAgent = {getDevice()}</p>
