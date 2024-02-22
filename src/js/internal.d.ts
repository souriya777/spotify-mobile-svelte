export type View = {
  id: string;
  viewName: string;
  props?: {
    [key: string]: any;
  };
};

export type EventBus = {
  type: 'search-input-focus-event';
  data?: {
    [key: string]: any;
  };
};
