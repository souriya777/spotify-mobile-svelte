<script>
  import { activeDevice } from '@js/store';
  import Svg from '@lib/svg/Svg.svelte';

  export let big = false;

  let iconName;
  let iconSize;

  $: if (big) {
    iconName = $activeDevice?.type === 'Computer' ? 'computer' : 'smartphone';
    iconSize = 14;
  } else {
    iconName = 'device-listened';
    iconSize = 10;
  }
</script>

<Svg name={iconName} size={iconSize} />
