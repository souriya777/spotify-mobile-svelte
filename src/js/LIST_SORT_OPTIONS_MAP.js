import LIST_SORT_TYPE from '@js/LIST_SORT_TYPE';

const LIST_SORT_OPTIONS_MAP = new Map([
  [
    LIST_SORT_TYPE.RECENTS,
    {
      id: LIST_SORT_TYPE.RECENTS,
      label: 'Recents',
      canReverse: false,
    },
  ],
  [
    LIST_SORT_TYPE.AZ,
    {
      id: LIST_SORT_TYPE.AZ,
      label: 'A-Z',
      canReverse: true,
    },
  ],
  [
    LIST_SORT_TYPE.CREATOR,
    {
      id: LIST_SORT_TYPE.CREATOR,
      label: 'Creator',
      canReverse: true,
    },
  ],
]);

export default Object.freeze(LIST_SORT_OPTIONS_MAP);
