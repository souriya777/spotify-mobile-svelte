export type SpotifySong = {
  context: SpotifyContext;
  track: SpofityTrack;
};

export type SpofityTrack = {
  uri: string;
  name: string;
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
};

export type SpotifyPlaybackState = {
  is_playing: boolean;
  shuffle_state: boolean;
  repeat_state: string; // FIXME SpotifyPlaybackStatus
  progress_ms: number;
  item: SpotifyTrack;
};

export type SpotifyDevice = {
  is_active: boolean;
  name: string;
  type: string;
  volume_percent: number;
};

export type SpotifyContext = {
  type: string;
  uri: string;
};

export type SpotifyPlaylist = {
  uri: string;
  name: string;
  owner: SpotifyUser;
  images: SpotifyImage[];
};

export type SpotifyQueue = {
  currently_playing: SpotifyTrack;
  queue: SpotifyTrack[];
};

export type SpotifySongsCursor = {
  items: SpotifySong[];
  next: string;
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

export type SpotifyAlbum = {
  uri: string;
  name: string;
  images: SpotifyImage[];
};

export type SpotifyArtist = {
  name: string;
};
