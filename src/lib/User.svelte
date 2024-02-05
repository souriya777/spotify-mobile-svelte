<script>
  export let userPictureUrl = '';
  export let username = null;
  export let mini = false;

  $: style = `--picture-url: ${userPictureUrl};`;
</script>

<div class="user" {style}>
  <div class="img" class:mini style={`background-image: url(${userPictureUrl})`}></div>
  {#if username}
    <p class="username">{username}</p>
  {/if}
</div>

<style>
  .user {
    display: flex;
    align-items: center;
  }

  .img {
    height: 3.4rem;
    width: 3.4rem;
    border-radius: 50%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .mini {
    height: 2.2rem;
    width: 2.2rem;
  }

  .username {
    margin-inline-start: 0.6rem;
    transform: translateY(0.3rem);
  }
</style>
