import { SvelteComponent } from 'svelte';

export type Component = {
  id: string;
  component: typeof MyComponent;
  props?: object;
};

interface MyComponent extends SvelteComponent {}
