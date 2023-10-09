export const sortByName = (a, b) => a.name.localeCompare(b.name);

export const sortByAddedAt = (a, b) => b.added_at - a.added_at;
