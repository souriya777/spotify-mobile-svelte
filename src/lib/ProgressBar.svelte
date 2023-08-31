<script>
  export let progress_percent = 0;
  $: safeProgressPercent = isNaN(progress_percent) ? 0 : progress_percent;
</script>

<progress max="100" value={safeProgressPercent} />
{safeProgressPercent}
