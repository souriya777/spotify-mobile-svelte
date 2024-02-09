const sortListByName = (a, b) => a.name.localeCompare(b.name);

const sortListByAddedAt = (a, b) => b.added_at - a.added_at;

const sortListByAddedAtDesc = (a, b) => a.added_at - b.added_at;

function sortImagesBySizeAsc(images) {
  return images?.sort((a, b) => a.width - b.width);
}

export { sortListByName, sortListByAddedAt, sortListByAddedAtDesc, sortImagesBySizeAsc };
