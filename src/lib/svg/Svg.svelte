<script>
  export let name;
  export let size = 24;
  export let fill = 'currentColor';

  const SVG_PROPERTIES = {
    height: size,
    width: size,
    fill,
    role: 'img',
    'aria-hidden': true,
  };
</script>

{#if 'favorite' === name}
  <svg {...SVG_PROPERTIES} viewBox="0 0 16 16">
    <path
      d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"
    >
    </path>
  </svg>
{/if}
