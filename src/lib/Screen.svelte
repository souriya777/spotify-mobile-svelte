<script>
  import { currentPath } from '@js/store';
  import Ui from '@lib/Ui.svelte';
  import Showcase from '@lib/Showcase.svelte';
  import Header from '@lib/Header.svelte';
  import Nav from '@lib/Nav.svelte';
  import View from '@lib/views/View.svelte';
  import { onMount } from 'svelte';

  /** @type {HTMLElement} */
  let SCREEN;

  // let VIEWS = ['side-menu', 'welcome', 'playlist', 'album'];

  onMount(() => {
    if (window.navigator.standalone === false) {
      // Inform the user they can add your app to the home screen
      alert("To add this web app to your home screen, tap 'Share' and then 'Add to Home Screen'.");
    }
  });
</script>

<div bind:this={SCREEN} class="screen">
  <div class="screen__content">
    currentPath:{$currentPath}
    <Ui>
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
          Milton Hyland Erickson, né le 5 décembre 1901 à Aurum (Nevada) et mort le 25 mars 1980 à
          Phoenix (Arizona), est un psychiatre et psychologue américain qui a joué un rôle important
          dans le renouvellement de l'hypnose clinique et a consacré de nombreux travaux à l'hypnose
          thérapeutique. Son approche innovante en psychothérapie repose sur la conviction que le
          patient possède en lui les ressources pour répondre de manière appropriée aux situations
          qu'il rencontre : il s'agit par conséquent d'utiliser ses compétences et ses possibilités
          d'adaptation personnelles. Atteint de poliomyélite à l'âge de dix-sept ans, Erickson a été
          une figure emblématique du « guérisseur blessé », expérimentant sur lui-même, lors de sa
          réadaptation, certains phénomènes qu'il met ensuite en application dans l'hypnose
          thérapeutique1. Au cours de sa carrière, Erickson a collaboré notamment avec Margaret
          Mead, Gregory Bateson, Lawrence Kubie, Aldous Huxley, John Weakland, Jay Haley et Ernest
          Rossi. Il est considéré comme le père des thérapies brèves2. Ses travaux ont inspiré
          plusieurs approches thérapeutiques, dont l'hypnose ericksonienne, la thérapie brève de
          Palo Alto3 qui s'est largement inspirée des tâches qu'il donnait à faire à ses patients,
          la programmation neuro-linguistique et diverses autres techniques de traitement4. Parmi
          ses élèves les plus connus figurent Stephen Gilligan, Stephen R. Lankton (en) et Jeffrey
          K. Zeig (en). Milton Erickson naît le 5 décembre 1901 à Aurum, une petite ville minière du
          Nevada aujourd'hui disparue. Son père, Charles, originaire de Chicago et descendant
          d'immigrés scandinaves, et sa mère, Clara, se sont mariés dans le Wisconsin en 18815.
          Milton est atteint de troubles sensoriels et perceptifs congénitaux : il est daltonien et
          amusique. Sa perception du monde modifiée lui fait prendre conscience dès son plus jeune
          âge du caractère relatif des cadres de références des êtres humains6. Lorsque Milton et sa
          sœur aînée atteignent l'âge de la scolarité, leurs parents s'installent à Lowell, dans le
          Wisconsin, après y avoir acheté une ferme7. Milton, ses sept sœurs et son frère,
          participent tous aux travaux de la ferme8. Avec la scolarisation, on se rend compte que le
          jeune Milton n'est pas seulement incapable de reconnaître les rythmes et les sonorités
          musicales, mais qu'il est aussi atteint de dyslexie sévère5. En 1919, à l'âge de 17 ans9,
          Erickson contracte une forme grave de poliomyélite6. Un soir, alors qu'il est au plus mal,
          alité dans sa chambre, il entend un médecin dire à sa mère dans la pièce voisine que son
          fils sera mort le lendemain matin. Erickson raconte comment il demande à sa mère de
          déplacer son lit de manière à pouvoir voir le coucher de soleil une dernière fois avant de
          mourir. Il vit alors ce qu'il appelle une expérience d'autohypnose, au cours de laquelle
          il ne voit que le coucher de soleil, faisant abstraction de l'arbre et de la barrière qui
          entravent sa vue par la fenêtre10. Il sort totalement paralysé d’un coma de trois jours,
          seulement capable de parler et de bouger les yeux9. Ne pouvant bouger, il meuble son ennui
          par des jeux d'observation, par lesquels il développe une capacité à percevoir les signes
          non verbaux émis à la limite du seuil de perception. Il observe, en voyant ses sœurs
          discuter entre elles, que souvent le langage verbal dit une chose alors que le langage du
          corps en dit une autre11. « Elles pouvaient dire « oui » et penser « non » en même temps
          ... j'ai commencé à étudier le langage non verbal et le langage corporel »12. Ses efforts
          pour se rééduquer l'amènent à redécouvrir par lui-même beaucoup des phénomènes classiques
          de l'hypnose et la manière de les utiliser à des fins thérapeutiques6. Erickson raconte :
          « Je ne pouvais même pas dire où se trouvaient mes bras et mes jambes dans mon lit. C'est
          ainsi que j'ai passé des heures à essayer de localiser ma main, mon pied, ou mes orteils,
          en guettant la moindre sensation, et je suis devenu particulièrement attentif à ce que
          sont les mouvements »13. Il passe aussi des heures entières à observer sa plus jeune sœur
          apprendre à marcher. Erickson garde de nombreuses et douloureuses séquelles physiques de
          la polio. Conscient qu'il ne pourra pas devenir fermier, il décide de devenir médecin. En
          1921, après onze mois d'entraînement, Erickson est capable de marcher avec des béquilles
          et s'inscrit parallèlement en médecine et en psychologie à l'université du Wisconsin. Le
          15 juin 1922, avec seulement cinq dollars en poche, Erickson entreprend un périple
          solitaire de 1 200 miles en canoë à travers les quatre lacs de la région de Madison dans
          le Wisconsin14. Il revient de son aventure capable de marcher sans béquilles et de porter
          son canoë sur son dos, ses cinq dollars toujours en poche. En 1923, Erickson se marie pour
          la première fois.
        </View>
        <View id="album-abc">album</View>
        <View id="cinq">cinq</View>
        <View id="six">six</View>
      </svelte:fragment>
    </Ui>
  </div>

  <div class="screen__nav">
    <Nav />
  </div>
</div>

<style>
  .screen {
    height: 100dvh;
    position: fixed;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: var(--color-primary);
    color: var(--color-on-primary);
  }

  .screen__content {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .screen__nav {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
