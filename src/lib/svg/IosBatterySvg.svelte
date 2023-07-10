<script>
  export let level = 100;

  const MAX_CAPACITY = 21.5;
  $: capacity = (level * MAX_CAPACITY) / 100;
</script>

<!-- ORIGINAL -->
<!-- <svg xmlns="http://www.w3.org/2000/svg" width="28.128" height="13" viewBox="0 0 28.128 13"> -->
<svg xmlns="http://www.w3.org/2000/svg" width="19.47" height="13" viewBox="0 0 28.128 13">
  <g fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="1" opacity="0.35">
    <rect width="25.655" height="13" rx="4" stroke="none" />
    <rect x="0.5" y="0.5" width="24.655" height="12" rx="3.5" fill="none" />
  </g>
  <path
    d="M0,0V4A2.17,2.17,0,0,0,1.328,2,2.17,2.17,0,0,0,0,0"
    transform="translate(26.8 4.5)"
    fill="currentColor"
    opacity="0.4"
  />
  <rect width={capacity} height="9" rx="2.6" transform="translate(2 2)" fill="currentColor" />
</svg>
