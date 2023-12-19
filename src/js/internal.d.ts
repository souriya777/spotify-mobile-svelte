import { SvelteComponent } from 'svelte';

export type View = {
  id: string;
  component: typeof MyComponent;
  props?: {
    [key: string]: any;
  };
};

interface MyComponent extends SvelteComponent {}
