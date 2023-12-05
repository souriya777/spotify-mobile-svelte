<script>
  import Header from '@lib/Header.svelte';
  import Nav from '@lib/Nav.svelte';
  import Button from '@lib/Button.svelte';
</script>

<div class="screen">
  <div class="screen__side-menu">
    SIDE MENU Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae in soluta
    necessitatibus quisquam vel provident sit modi officia, enim sint, reiciendis ab quo. Dolorem
    mollitia, culpa debitis quaerat neque repellat.
  </div>

  <div class="screen_content">
    <Header />

    normal
    <div class="text-accent">accent</div>
    <div class="accent-area">accent-area</div>
    <div class="highlight-area">highlight-area</div>

    <Button type="primary" svg="favorite" callback={() => console.log('TODO')}>primary</Button>
    <Button type="secondary" svg="favorite" callback={() => console.log('TODO 2')}>secondary</Button
    >
    <Button type="secondary" svg="favorite" callback={() => console.log('TODO 3')} />
    <Button type="primary" hasAccent={false} callback={() => console.log('TODO 4')}
      >no-accent</Button
    >
    <Button filled={true} callback={() => console.log('TODO 5')}>filled</Button>

    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero ducimus vel dolores incidunt
    est beatae possimus aut totam error soluta voluptatem, eius corporis similique quae ex
    distinctio voluptates. Quasi, consequuntur. Lorem ipsum dolor sit, amet consectetur adipisicing
    elit. Libero ducimus vel dolores incidunt est beatae possimus aut totam error soluta voluptatem,
    eius corporis similique quae ex distinctio voluptates. Quasi, consequuntur. Lorem ipsum dolor
    sit, amet consectetur adipisicing elit. Libero ducimus vel dolores incidunt est beatae possimus
    aut totam error soluta voluptatem, eius corporis similique quae ex distinctio voluptates. Quasi,
    consequuntur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero ducimus vel
    dolores incidunt est beatae possimus aut totam error soluta voluptatem, eius corporis similique
    quae ex distinctio voluptates. Quasi, consequuntur. Lorem ipsum dolor sit, amet consectetur
    adipisicing elit. Libero ducimus vel dolores incidunt est beatae possimus aut totam error soluta
    voluptatem, eius corporis similique quae ex distinctio voluptates. Quasi, consequuntur. Lorem
    ipsum dolor sit, amet consectetur adipisicing elit. Libero ducimus vel dolores incidunt est
    beatae possimus aut totam error soluta voluptatem, eius corporis similique quae ex distinctio
    voluptates. Quasi, consequuntur. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    Libero ducimus vel dolores incidunt est beatae possimus aut totam error soluta voluptatem, eius
    corporis similique quae ex distinctio voluptates. Quasi, consequuntur.
  </div>

  <div class="screen__nav">
    <Nav />
  </div>
</div>

<style>
  .screen {
    position: relative;
    box-sizing: content-box;
    display: grid;
    grid-template-columns: var(--width-side-menu) var(--width-content);
    height: var(--height-iphone-12-mini);
    width: var(--width-iphone-12-mini);
    background-color: var(--color-primary);
    color: var(--color-on-primary);
    overflow-y: scroll;
  }

  .screen_content {
    background-color: hotpink;
    color: white;
    height: 100%;
    overflow-y: scroll;
  }

  .screen__nav {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .text-accent {
    color: var(--color-accent);
  }

  .accent-area {
    background-color: var(--color-accent);
    color: var(--color-on-accent);
    padding: 1rem;
  }

  .highlight-area {
    background-color: var(--color-primary-highlight);
    color: var(--color-on-primary-highlight);
    padding: 1rem;
  }
</style>
