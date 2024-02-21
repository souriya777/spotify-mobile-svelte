<script>
  import {
    getPlayerBackgroundRgb,
    highestContrast,
    hasMinimumContrast,
    sortByHighToLowContrast,
    lightenDarkenColor,
    DEFAULT_BACKGROUND_HIGHLIGHT_RGB,
  } from '@js/palette-utils';
  import { navigatingRgb, playingRgb } from '@js/store';
  import ColorThief from 'colorthief';

  /**
   * HOW IS THE BACKGROUND-COLOR OF PLAYER IS FOUND ?
   * - `ColorThief` LIB find the `DOMINANT COLOR` & the `PALETTE`
   * - among `PALETTE`, we only keep colors that has `minimum contrast` with `TEXT COLOR`
   * - we sort `PALETTE` from `lightest` to `darkest`
   * - `BLEND-COLOR` : blend `SORTED-PALETTE` with `lightest` & `darkest` colors
   * - we make a new `DARKER-BLEND-COLOR` from `BLEND-COLOR`
   */

  export let imageUrl;
  export let textColor = [255, 255, 255];
  export let isPlayingRgb = true;

  const DARKER_FACTOR = -20;

  /** @type {HTMLImageElement} */
  let imgHtml;
  let palette = [];
  let dominantColor = [...DEFAULT_BACKGROUND_HIGHLIGHT_RGB];
  let contrastColor1 = null;
  let contrastColor2 = null;

  $: paletteValidContrast = palette.filter((color) => {
    return hasMinimumContrast(color, textColor);
  });

  $: sortedPaletteContrast = paletteValidContrast.toSorted((a, b) => {
    return sortByHighToLowContrast([...dominantColor], [...a], [...b]) ? 1 : -1;
  });

  $: if (sortedPaletteContrast && sortedPaletteContrast.length > 0) {
    contrastColor1 = [...sortedPaletteContrast.at(0)];
    if (sortedPaletteContrast.length >= 2) {
      contrastColor2 = [...sortedPaletteContrast.at(-1)];
    }
  }

  $: blendContrastColor =
    contrastColor1 && contrastColor2
      ? getPlayerBackgroundRgb(contrastColor1, contrastColor2)
      : contrastColor1 && !contrastColor2
        ? contrastColor1
        : [...DEFAULT_BACKGROUND_HIGHLIGHT_RGB];
  $: blendContrastDarkerColor = lightenDarkenColor(blendContrastColor, DARKER_FACTOR);
  $: highestColor = highestContrast(dominantColor, blendContrastColor, blendContrastDarkerColor);
  $: if (highestColor) {
    // UPDATE STORE
    if (isPlayingRgb) {
      $playingRgb = [...highestColor];
    } else {
      $navigatingRgb = [...highestColor];
    }
  }

  // TO DEBUG
  // $: dominantColorStyle = `background-color: rgb(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]});`;
  // $: blendContrastStyle = `background-color: rgb(${blendContrastColor[0]}, ${blendContrastColor[1]}, ${blendContrastColor[2]})`;
  // $: blendContrastDarkerColorStyle = `background-color: rgb(${blendContrastDarkerColor[0]}, ${blendContrastDarkerColor[1]}, ${blendContrastDarkerColor[2]})`;

  function getDominantColor() {
    const colorThief = new ColorThief();
    const color = colorThief.getColor(imgHtml);
    dominantColor = [...color];
    palette = colorThief.getPalette(imgHtml);
  }
</script>

<div class="color-solver">
  <!-- TO DEBUG -->
  <!-- <div style="display: flex;">
    <div class="palette-item" style={dominantColorStyle}>D</div>
  </div>
  <div style="display: flex;">
    <div class="palette-item" style={blendContrastStyle}>B</div>
    <div class="palette-item" style={blendContrastDarkerColorStyle}>B+</div>
  </div>
  <h2>palette</h2>
  <ul>
    {#each palette as color, i}
      {@const style = `background-color: rgb(${color?.[0]},${color?.[1]},${color?.[2]});`}
      <li class="palette-item" {style}>
        {i + 1}
      </li>
    {/each}
  </ul>
  <h2>paletteValid</h2>
  <ul>
    {#each paletteValidContrast as color, i}
      {@const style = `background-color: rgb(${color?.[0]},${color?.[1]},${color?.[2]});`}
      <li class="palette-item" {style}>
        {i + 1}
      </li>
    {/each}
  </ul>
  <h2>sortedPaletteContrast</h2>
  <ul>
    {#each sortedPaletteContrast as color, i}
      {@const style = `background-color: rgb(${color?.[0]},${color?.[1]},${color?.[2]});`}
      <li class="palette-item" {style}>
        <b>{i + 1}</b>
      </li>
    {/each}
  </ul> -->
  <img
    src={imageUrl}
    alt="not displayed"
    width="100"
    height="100"
    style="display: none;"
    crossorigin="anonymous"
    bind:this={imgHtml}
    on:load={getDominantColor}
  />
</div>

<style>
  /* TO DEBUG */
  /*.imgurl-color-solver {
    position: absolute;
    top: -400px;
  }

  h2 {
    background-color: black;
    color: deeppink;
  }

  .palette-item {
    height: 35px;
    width: 35px;
    font-size: 10px;
    font-weight: 700;
  }

  ul {
    display: flex;
  } */
</style>
