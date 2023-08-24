export type SpotifySongsCursor = {
  items: SpotifySong[];
  next: string;
};

export type SpotifySong = {
  track: SpofityTrack;
};

export type SpofityTrack = {
  uri: string;
};

export type SpotifyPlaylistCursor = {
  href: string;
  limit: number;
  offset: number;
  total: number;
  next: string;
  previous: string;
  items: SpotifyPlaylist[];
};

export type SpotifyPlaylist = {
  uri: string;
  name: string;
  owner: SpotifyUser;
  images: SpotifyImage[];
};

export type SpotifyUser = {
  id: string;
  display_name: string;
  images: SpotifyImage[];
};

export type SpotifyImage = {
  url: string;
  height: number;
  width: number;
};
