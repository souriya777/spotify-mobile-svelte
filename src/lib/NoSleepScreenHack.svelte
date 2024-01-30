<script>
  import { getTimestamp } from '@js/date-utils';
  import { playerFull, uiFakeTouch } from '@js/store';

  let timestamp;

  function dispatchTouchEvent() {
    var touchEvent = new TouchEvent('touchend', {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    console.log('dispatch event 😎');
    timestamp = getTimestamp();

    document.dispatchEvent(touchEvent);
  }

  $: if ($playerFull) {
    $uiFakeTouch = true;
    setInterval(dispatchTouchEvent, 10000);
  } else {
    $uiFakeTouch = false;
  }
  //  TODOadd visibility
</script>

no-sleep-hack:{timestamp}

<style></style>
