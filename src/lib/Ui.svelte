<script>
  import { getTranslateXY } from '@js/browser-utils';
  import { getTimestamp } from '@js/date-utils';

  const _DEBUG = false;
  const TOUCH_AREA_WIDTH = 70;
  const SLIDE_STYLE = 'transform 0.25s cubic-bezier(0.4, 0, 0.23, 1)';

  /** @type {HTMLElement} */
  let SLIDER;

  let timestamp = getTimestamp();
  let currentSlidePosition = 0;
  let initialX = 0;
  let initialY = 0;
  let x = 0;
  let y = 0;
  let prevSlideTranslateX = 0;
  let nextSlideTranslateX = 0;
  /** @type {HTMLElement[]} */
  // @ts-ignore
  $: CHILDREN = SLIDER ? SLIDER.children : [];
  $: SLIDE_WIDTH = SLIDER ? SLIDER.clientWidth : 0;
  $: TOTAL_SLIDES = SLIDER ? SLIDER.children.length : 0;
  $: MINIMUM_SWIPE_X = SLIDE_WIDTH / 3;
  $: currentSlide = SLIDER ? CHILDREN[currentSlidePosition] : null;
  $: prevSlide = SLIDER ? CHILDREN[currentSlidePosition - 1] : null;
  $: nextSlide = SLIDER ? CHILDREN[currentSlidePosition + 1] : null;
  $: deltaX = x - initialX;
  $: deltaY = y - initialY;
  $: isPrev = deltaX > 0;
  $: isNext = !isPrev;
  $: isTouchedOnEdge = initialX <= TOUCH_AREA_WIDTH || initialX + TOUCH_AREA_WIDTH >= SLIDE_WIDTH;
  $: isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);
  $: canSwipe = Math.abs(deltaX) >= MINIMUM_SWIPE_X;
  $: canGoPrev = currentSlidePosition > 0;
  $: canGoNext = currentSlidePosition + 1 < TOTAL_SLIDES;

  $: if (SLIDER) {
    initSlider();
  }

  function initSlider() {
    Array.from(SLIDER.children).forEach((slide, i) => {
      let translateX;

      if (i < currentSlidePosition) {
        translateX = -SLIDE_WIDTH;
      } else if (i > currentSlidePosition) {
        translateX = SLIDE_WIDTH;
      } else {
        translateX = 0;
      }

      // @ts-ignore
      slide.style.transform = `translateX(${translateX}px)`;
    });
  }

  function start(e) {
    const touch = [...e.changedTouches].at(0);
    initialX = touch.pageX;
    x = initialX;
    prevSlideTranslateX = getTranslateXY(prevSlide).translateX;
    nextSlideTranslateX = getTranslateXY(nextSlide).translateX;
  }

  function move(e) {
    if (!isTouchedOnEdge) {
      return;
    }

    const touch = [...e.changedTouches].at(0);
    x = touch.pageX;

    if (isPrev && canGoPrev) {
      currentSlide.style.transform = `translateX(${deltaX}px)`;
      prevSlide.style.transform = `translateX(${(prevSlideTranslateX + deltaX) / 10}px)`;
    } else if (isNext && canGoNext && nextSlide) {
      nextSlide.style.transform = `translateX(${nextSlideTranslateX + deltaX}px)`;
      currentSlide.style.transform = `translateX(${deltaX / 4}px)`;
    }
  }

  function end() {
    if (!isTouchedOnEdge) {
      return;
    }

    if (isPrev) {
      slidePrev();
    } else {
      slideNext();
    }
  }

  function slidePrev() {
    currentSlide.style.transition = SLIDE_STYLE;

    if (canSwipe && canGoPrev) {
      currentSlide.style.transform = `translateX(${SLIDE_WIDTH}px)`;
      prevSlide.style.transition = SLIDE_STYLE;
      prevSlide.style.transform = `translateX(${0}px)`;

      currentSlidePosition--;
    } else if (prevSlide) {
      currentSlide.style.transform = `translateX(${0}px)`;
    }
  }

  function slideNext() {
    if (canSwipe && canGoNext) {
      nextSlide.style.transition = SLIDE_STYLE;
      nextSlide.style.transform = `translateX(${0}px)`;
      currentSlide.style.transition = SLIDE_STYLE;
      currentSlide.style.transform = `translateX(${-SLIDE_WIDTH}px)`;

      currentSlidePosition++;
    } else if (nextSlide) {
      nextSlide.style.transition = SLIDE_STYLE;
      nextSlide.style.transform = `translateX(${SLIDE_WIDTH}px)`;
    }
  }

  function removeTransition() {
    if (currentSlide) {
      currentSlide.style.transition = '';
    }

    if (prevSlide) {
      prevSlide.style.transition = '';
    }

    if (nextSlide) {
      nextSlide.style.transition = '';
    }
  }
</script>

{#if _DEBUG}
  <div class="indicator" class:debug-red={canGoPrev || canGoNext} class:debug-green={canSwipe}>
    <div>SLIDE_WIDTH:{SLIDE_WIDTH}</div>
    <div>initialX:{initialX}</div>
    <div>initialY:{initialY}</div>
    <div>x:{x}</div>
    <div>y:{y}</div>
    <div>deltaX:{deltaX}</div>
    <div>deltaY:{deltaY}</div>
    <div>nextSlideTranslateX:{nextSlideTranslateX}</div>
    <div>isTouchedOnEdge:{isTouchedOnEdge}</div>
    <div>canSwipe:{canSwipe}</div>
    <div>isPrev:{isPrev}</div>
    <div>isNext:{isNext}</div>
    <div>canGoPrev:{canGoPrev}</div>
    <div>canGoNext:{canGoNext}</div>
    <div>currentSlidePosition:{currentSlidePosition}</div>
  </div>
{/if}

<input type="text" name="" id="" />

<svelte:window
  on:resize={() => {
    console.log('trigger resize');
    timestamp = getTimestamp();
  }}
/>

{#key timestamp}
  <ul
    bind:this={SLIDER}
    on:touchstart={start}
    on:touchend={end}
    on:touchmove={move}
    on:transitionend={removeTransition}
  >
    <li>
      <h1>debut</h1>
      <div>
        Milton Hyland Erickson, né le 5 décembre 1901 à Aurum (Nevada) et mort le 25 mars 1980 à
        Phoenix (Arizona), est un psychiatre et psychologue américain qui a joué un rôle important
        dans le renouvellement de l'hypnose clinique et a consacré de nombreux travaux à l'hypnose
        thérapeutique. Son approche innovante en psychothérapie repose sur la conviction que le
        patient possède en lui les ressources pour répondre de manière appropriée aux situations
        qu'il rencontre : il s'agit par conséquent d'utiliser ses compétences et ses possibilités
        d'adaptation personnelles. Atteint de poliomyélite à l'âge de dix-sept ans, Erickson a été
        une figure emblématique du « guérisseur blessé », expérimentant sur lui-même, lors de sa
        réadaptation, certains phénomènes qu'il met ensuite en application dans l'hypnose
        thérapeutique1. Au cours de sa carrière, Erickson a collaboré notamment avec Margaret Mead,
        Gregory Bateson, Lawrence Kubie, Aldous Huxley, John Weakland, Jay Haley et Ernest Rossi. Il
        est considéré comme le père des thérapies brèves2. Ses travaux ont inspiré plusieurs
        approches thérapeutiques, dont l'hypnose ericksonienne, la thérapie brève de Palo Alto3 qui
        s'est largement inspirée des tâches qu'il donnait à faire à ses patients, la programmation
        neuro-linguistique et diverses autres techniques de traitement4. Parmi ses élèves les plus
        connus figurent Stephen Gilligan, Stephen R. Lankton (en) et Jeffrey K. Zeig (en).

        <h1>Biographie</h1>
        La jeunesse Milton Erickson naît le 5 décembre 1901 à Aurum, une petite ville minière du Nevada
        aujourd'hui disparue. Son père, Charles, originaire de Chicago et descendant d'immigrés scandinaves,
        et sa mère, Clara, se sont mariés dans le Wisconsin en 18815. Milton est atteint de troubles
        sensoriels et perceptifs congénitaux : il est daltonien et amusique. Sa perception du monde modifiée
        lui fait prendre conscience dès son plus jeune âge du caractère relatif des cadres de références
        des êtres humains6. Lorsque Milton et sa sœur aînée atteignent l'âge de la scolarité, leurs parents
        s'installent à Lowell, dans le Wisconsin, après y avoir acheté une ferme7. Milton, ses sept sœurs
        et son frère, participent tous aux travaux de la ferme8. Avec la scolarisation, on se rend compte
        que le jeune Milton n'est pas seulement incapable de reconnaître les rythmes et les sonorités
        musicales, mais qu'il est aussi atteint de dyslexie sévère5. En 1919, à l'âge de 17 ans9, Erickson
        contracte une forme grave de poliomyélite6. Un soir, alors qu'il est au plus mal, alité dans
        sa chambre, il entend un médecin dire à sa mère dans la pièce voisine que son fils sera mort
        le lendemain matin. Erickson raconte comment il demande à sa mère de déplacer son lit de manière
        à pouvoir voir le coucher de soleil une dernière fois avant de mourir. Il vit alors ce qu'il
        appelle une expérience d'autohypnose, au cours de laquelle il ne voit que le coucher de soleil,
        faisant abstraction de l'arbre et de la barrière qui entravent sa vue par la fenêtre10. Il sort
        totalement paralysé d’un coma de trois jours, seulement capable de parler et de bouger les yeux9.
        Ne pouvant bouger, il meuble son ennui par des jeux d'observation, par lesquels il développe
        une capacité à percevoir les signes non verbaux émis à la limite du seuil de perception. Il observe,
        en voyant ses sœurs discuter entre elles, que souvent le langage verbal dit une chose alors que
        le langage du corps en dit une autre11. « Elles pouvaient dire « oui » et penser « non » en même
        temps ... j'ai commencé à étudier le langage non verbal et le langage corporel »12. Ses efforts
        pour se rééduquer l'amènent à redécouvrir par lui-même beaucoup des phénomènes classiques de
        l'hypnose et la manière de les utiliser à des fins thérapeutiques6. Erickson raconte : « Je ne
        pouvais même pas dire où se trouvaient mes bras et mes jambes dans mon lit. C'est ainsi que j'ai
        passé des heures à essayer de localiser ma main, mon pied, ou mes orteils, en guettant la moindre
        sensation, et je suis devenu particulièrement attentif à ce que sont les mouvements »13. Il passe
        aussi des heures entières à observer sa plus jeune sœur apprendre à marcher. Erickson garde de
        nombreuses et douloureuses séquelles physiques de la polio. Conscient qu'il ne pourra pas devenir
        fermier, il décide de devenir médecin. En 1921, après onze mois d'entraînement, Erickson est
        capable de marcher avec des béquilles et s'inscrit parallèlement en médecine et en psychologie
        à l'université du Wisconsin. Le 15 juin 1922, avec seulement cinq dollars en poche, Erickson
        entreprend un périple solitaire de 1 200 miles en canoë à travers les quatre lacs de la région
        de Madison dans le Wisconsin14. Il revient de son aventure capable de marcher sans béquilles
        et de porter son canoë sur son dos, ses cinq dollars toujours en poche. En 1923, Erickson se
        marie pour la première fois.

        <h1>Premières expériences avec l'hypnose</h1>

        Le psychologue Joseph Jastrow (1863-1944) a apporté son soutien à Milton Erickson dans ses
        travaux sur l'hypnose. En 1923 et 1924, Erickson, alors étudiant en troisième année de
        médecine, participe au séminaire sur l'hypnose organisé à l'université du Wisconsin par
        Clark L. Hull, un des pères fondateurs avec Jean Leguirec de la psychologie expérimentale et
        des théories de l'apprentissage aux États-Unis15. C'est avec Hull que prend naissance
        l'application de la méthode expérimentale à l'hypnose16. Hull cherche à appliquer au domaine
        de l'hypnose une méthodologie stricte et reprend le fameux débat entre suggestion (École de
        Nancy) et état modifié de conscience (École de la Salpêtrière)17. La plupart des expériences
        de Hull se concentrent sur la question de la suggestibilité. Prenant parti en faveur de
        l'École de Nancy, il ne mentionne jamais aucune base physiologique pour cet état particulier
        que serait l'hypnose. Au printemps de 1923, Hull manifeste de l'intérêt pour le travail
        expérimental d'Erickson sur l'hypnose18 et lui propose de poursuivre ses recherches pendant
        l'été et d'en faire le compte rendu en septembre devant le séminaire de troisième cycle sur
        l'hypnose que doit organiser le département de psychologie19. Erickson met vite en doute la
        conviction de Hull selon laquelle l'opérateur, à travers ce qu'il dit et fait au sujet, est
        beaucoup plus important que les processus comportementaux internes du sujet sous hypnose20.
        Il critique également « l'acharnement de Hull à instaurer une « technique standard » pour
        l'induction »20 sans tenir compte des différences individuelles entre les sujets. En octobre
        1923, Erickson décide de mener ses propres recherches et commence à développer diverses
        techniques d'induction hypnotique permissive et indirecte21. Les expériences menées par
        Erickson déplaisent à Hull, qui a l'impression qu'il ne tient pas assez compte de
        l'importance des suggestions et de la suggestibilité21. De son côté, Erickson s'oppose à
        Hull pour qui un sujet hypnotisé perçoit et ressent la réalité qui l'entoure de la même
        manière que lorsqu'il n'est pas hypnotisé22. Alors qu'Erickson s'éloigne de Hull, il obtient
        le soutien d'autres professeurs, parmi lesquels le psychologue Joseph Jastrow et le
        neurologue Hans Rees, qui avait beaucoup utilisé l'hypnose dans l'armée allemande durant la
        Première Guerre mondiale23. En 1928, Erickson obtient son doctorat en médecine en même temps
        que sa maîtrise de psychologie au Colorado general hospital24. Il est ensuite stagiaire en
        psychiatrie au Colorado psychopathic hospital, où on lui interdit de mentionner l'hypnose,
        puis médecin assistant au State Hospital for Mental Diseases à Howard (Rhode Island).
      </div>
    </li>
    <li class="deux">
      <div class="deuxdeux">DEUX</div>
    </li>
    <li class="trois">TROIS</li>
    <li class="quatre">QUATRE</li>
  </ul>
{/key}

<style>
  ul {
    position: relative;
    height: 100%;
    background-color: deeppink;
  }

  li {
    position: absolute;
    height: 100%;
    width: 100%;
  }

  .deux {
    background-color: rgba(173, 216, 230);
  }
  .trois {
    background-color: rgba(32, 178, 170);
  }
  .quatre {
    background-color: rgba(240, 128, 128);
  }

  .debug-red {
    background-color: red;
    color: white;
  }

  .debug-green {
    background-color: rgb(25, 141, 25);
    color: white;
  }
</style>
