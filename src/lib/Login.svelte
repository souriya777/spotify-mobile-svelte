<script>
  import Form from '@/lib/Form.svelte';
  import { onTap } from '@/js/event-utils';
  import SpotifyApi from '@/js/SpotifyApi';
  import Logger from '@/js/Logger';
  import { authorizationOk } from '@/js/store/store';

  const LOGGER = Logger.getNewInstance('Login.svelte');

  function login() {
    console.log('TODO');

    // LOGGER.log('authorize...');
    // authorizationOk.set(true);
    // SpotifyApi.authorize();

    // https://accounts.spotify.com/fr/login?continue=https%3A%2F%2Fopen.spotify.com%2Fintl-fr
  }
</script>

<Form>
  <input type="text" name="username" />
  <input type="password" name="password" />
  <button use:onTap={login}>Connect</button>
</Form>
