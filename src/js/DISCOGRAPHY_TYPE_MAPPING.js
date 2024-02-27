import DISCOGRAPHY_TYPE from '@js/DISCOGRAPHY_TYPE';

/** @enum {string} */
const DISCOGRAPHY_TYPE_MAPPING = {
  [DISCOGRAPHY_TYPE.ALBUM]: 'albums',
  [DISCOGRAPHY_TYPE.SINGLE]: 'singles',
  [DISCOGRAPHY_TYPE.COMPILATION]: 'compilations',
};

export default Object.freeze(DISCOGRAPHY_TYPE_MAPPING);
