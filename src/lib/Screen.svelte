<script>
  import MobileDragger from '@lib/MobileDragger.svelte';
  import Showcase from '@lib/Showcase.svelte';
  import Header from '@lib/Header.svelte';
  import Nav from '@lib/Nav.svelte';
  import View from '@lib/views/View.svelte';

  /** @type {HTMLElement} */
  let SCREEN;

  let VIEWS = ['side-menu', 'welcome', 'playlist', 'album'];
</script>

<div bind:this={SCREEN} class="screen">
  <div class="screen__content">
    <MobileDragger totalSlides={6}>
      <svelte:fragment slot="views">
        <View id="side-menu">
          <svelte:fragment slot="header">
            <Header />
          </svelte:fragment>
          side-menu
          <Showcase />
        </View>
        <View id="welcome">
          <svelte:fragment slot="header">
            <Header />
          </svelte:fragment>
          main
        </View>
        <View id="playlist-123">
          playlist Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore sunt
          explicabo non nemo qui autem? Dolores nemo adipisci illo harum asperiores. Error optio
          culpa quis dolor consectetur ab cupiditate nisi. Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Inventore sunt explicabo non nemo qui autem? Dolores nemo adipisci illo
          harum asperiores. Error optio culpa quis dolor consectetur ab cupiditate nisi. Lorem ipsum
          dolor sit, amet consectetur adipisicing elit. Inventore sunt explicabo non nemo qui autem?
          Dolores nemo adipisci illo harum asperiores. Error optio culpa quis dolor consectetur ab
          cupiditate nisi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore sunt
          explicabo non nemo qui autem? Dolores nemo adipisci illo harum asperiores. Error optio
          culpa quis dolor consectetur ab cupiditate nisi. Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Inventore sunt explicabo non nemo qui autem? Dolores nemo adipisci illo
          harum asperiores. Error optio culpa quis dolor consectetur ab cupiditate nisi. Lorem ipsum
          dolor sit, amet consectetur adipisicing elit. Inventore sunt explicabo non nemo qui autem?
          Dolores nemo adipisci illo harum asperiores. Error optio culpa quis dolor consectetur ab
          cupiditate nisi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore sunt
          explicabo non nemo qui autem? Dolores nemo adipisci illo harum asperiores. Error optio
          culpa quis dolor consectetur ab cupiditate nisi. Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Inventore sunt explicabo non nemo qui autem? Dolores nemo adipisci illo
          harum asperiores. Error optio culpa quis dolor consectetur ab cupiditate nisi. Lorem ipsum
          dolor sit, amet consectetur adipisicing elit. Inventore sunt explicabo non nemo qui autem?
          Dolores nemo adipisci illo harum asperiores. Error optio culpa quis dolor consectetur ab
          cupiditate nisi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore sunt
          explicabo non nemo qui autem? Dolores nemo adipisci illo harum asperiores. Error optio
          culpa quis dolor consectetur ab cupiditate nisi. Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Inventore sunt explicabo non nemo qui autem? Dolores nemo adipisci illo
          harum asperiores. Error optio culpa quis dolor consectetur ab cupiditate nisi. Lorem ipsum
          dolor sit, amet consectetur adipisicing elit. Inventore sunt explicabo non nemo qui autem?
          Dolores nemo adipisci illo harum asperiores. Error optio culpa quis dolor consectetur ab
          cupiditate nisi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore sunt
          explicabo non nemo qui autem? Dolores nemo adipisci illo harum asperiores. Error optio
          culpa quis dolor consectetur ab cupiditate nisi. Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Inventore sunt explicabo non nemo qui autem? Dolores nemo adipisci illo
          harum asperiores. Error optio culpa quis dolor consectetur ab cupiditate nisi. explicabo
          non nemo qui autem? Dolores nemo adipisci illo harum asperiores. Error optio culpa quis
          dolor consectetur ab cupiditate nisi. Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Inventore sunt explicabo non nemo qui autem? Dolores nemo adipisci illo harum
          asperiores. Error optio culpa quis dolor consectetur ab cupiditate nisi. explicabo non
          nemo qui autem? Dolores nemo adipisci illo harum asperiores. Error optio culpa quis dolor
          consectetur ab cupiditate nisi. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Inventore sunt explicabo non nemo qui autem? Dolores nemo adipisci illo harum asperiores.
          Error optio culpa quis dolor consectetur ab cupiditate nisi. explicabo non nemo qui autem?
          Dolores nemo adipisci illo harum asperiores. Error optio culpa quis dolor consectetur ab
          cupiditate nisi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore sunt
          explicabo non nemo qui autem? Dolores nemo adipisci illo harum asperiores. Error optio
          culpa quis dolor consectetur ab cupiditate nisi. explicabo non nemo qui autem? Dolores
          nemo adipisci illo harum asperiores. Error optio culpa quis dolor consectetur ab
          cupiditate nisi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore sunt
          explicabo non nemo qui autem? Dolores nemo adipisci illo harum asperiores. Error optio
          culpa quis dolor consectetur ab cupiditate nisi. explicabo non nemo qui autem? Dolores
          nemo adipisci illo harum asperiores. Error optio culpa quis dolor consectetur ab
          cupiditate nisi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore sunt
          explicabo non nemo qui autem? Dolores nemo adipisci illo harum asperiores. Error optio
          culpa quis dolor consectetur ab cupiditate nisi. explicabo non nemo qui autem? Dolores
          nemo adipisci illo harum asperiores. Error optio culpa quis dolor consectetur ab
          cupiditate nisi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore sunt
          explicabo non nemo qui autem? Dolores nemo adipisci illo harum asperiores. Error optio
          culpa quis dolor consectetur ab cupiditate nisi. explicabo non nemo qui autem? Dolores
          nemo adipisci illo harum asperiores. Error optio culpa quis dolor consectetur ab
          cupiditate nisi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore sunt
          explicabo non nemo qui autem? Dolores nemo adipisci illo harum asperiores. Error optio
          culpa quis dolor consectetur ab cupiditate nisi. explicabo non nemo qui autem? Dolores
          nemo adipisci illo harum asperiores. Error optio culpa quis dolor consectetur ab
          cupiditate nisi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore sunt
          explicabo non nemo qui autem? Dolores nemo adipisci illo harum asperiores. Error optio
          culpa quis dolor consectetur ab cupiditate nisi. explicabo non nemo qui autem? Dolores
          nemo adipisci illo harum asperiores. Error optio culpa quis dolor consectetur ab
          cupiditate nisi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore sunt
          explicabo non nemo qui autem? Dolores nemo adipisci illo harum asperiores. Error optio
          culpa quis dolor consectetur ab cupiditate nisi. explicabo non nemo qui autem? Dolores
          nemo adipisci illo harum asperiores. Error optio culpa quis dolor consectetur ab
          cupiditate nisi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore sunt
          explicabo non nemo qui autem? Dolores nemo adipisci illo harum asperiores. Error optio
          culpa quis dolor consectetur ab cupiditate nisi. explicabo non nemo qui autem? Dolores
          nemo adipisci illo harum asperiores. Error optio culpa quis dolor consectetur ab
          cupiditate nisi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore sunt
          explicabo non nemo qui autem? Dolores nemo adipisci illo harum asperiores. Error optio
          culpa quis dolor consectetur ab cupiditate nisi. souriya
        </View>
        <View id="album-abc">album</View>
        <View id="cinq">cinq</View>
        <View id="six">six</View>
      </svelte:fragment>
    </MobileDragger>
  </div>

  <div class="screen__nav">
    <Nav />
  </div>
</div>

<style>
  .screen {
    border: 2px dashed hotpink;
    position: relative;
    box-sizing: content-box;
    display: grid;
    height: 100%;
    background-color: var(--color-primary);
    color: var(--color-on-primary);
  }

  .screen__content {
    background-color: deeppink;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .screen__nav {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
</style>
