<script>
  import { clearLocalStorage } from '@/js/store';
  import { DEVICE } from '@/js/browser-utils';
</script>

<button on:click={clearLocalStorage}>🗑️ localStorage</button>
<p>device:{DEVICE}</p>
