import type DISCOGRAPHY_TYPE from '@js/DISCOGRAPHY_TYPE';

export type SpotifySong = {
  track: SpotifyTrack;
  context: SpotifyContext;
  added_at: date;
};

export type SpotifyTrack = {
  id: string;
  uri: string;
  name: string;
  duration_ms: number;
  popularity: number;
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
};

export type SpotifyAlbum = {
  id: string;
  uri: string;
  name: string;
  release_date: string;
  album_type: string;
  images: SpotifyImage[];
  artists: SpotifyArtist[];
};

export type SpotifyAlbumTrack = {
  id: string;
  uri: string;
  name: string;
  disc_number: number;
  track_number: number;
  duration_ms: number;
  artists: SpotifyArtist[];
};

export interface SpotifySavedAlbum extends SpotifyAlbum {
  added_at: date;
}

export type SpotifyArtist = {
  id: string;
  name: string;
  uri: string;
  images: SpotifyImage[];
};

export type SpotifyPlaylist = {
  id: string;
  uri: string;
  name: string;
  description: string;
  owner: SpotifyUser;
  images: SpotifyImage[];
  tracks: SpotifyPlaylistTracks;
  added_at: date;
};

export type SpotifyPlaylistTracks = {
  href: string;
  total: number;
};

export type SpotifyPlaylistExtended = {
  items: SpotifyPlaylistExtendedItem[];
};

export type SpotifyPlaylistExtendedItem = {
  added_at: date;
};

export type SpotifyQueue = {
  currently_playing: SpotifyTrack;
  queue: SpotifyTrack[];
  isEmpty: () => boolean;
};

export type SpotifyImage = {
  url: string;
  height: number;
  width: number;
};

export interface Cursor {
  href: string;
  limit: number;
  offset: number;
  total: number;
  next: string;
  previous: string;
}

export interface SpotifySongCursor extends Cursor {
  items: SpotifySong[];
}

export interface SpotifyAlbumCursor extends Cursor {
  items: SpotifyAlbumItemCursor[];
}

export interface SpotifyAlbumTrackCursor extends Cursor {
  items: SpotifyAlbumTrack[];
}

export interface SpotifyPlaylistCursor extends Cursor {
  items: SpotifyPlaylist[];
}

export interface SpotifyArtistCursor extends Cursor {
  items: SpotifyArtist[];
}

export type SpotifyAlbumItemCursor = {
  album: SpotifyAlbum;
};

export type SpotifyDevice = {
  id: string;
  is_active: boolean;
  name: string;
  type: 'Computer' | 'Smartphone';
  volume_percent: number;
};

export type SpotifyDeviceList = {
  devices: SpotifyDevice[];
};

export type SpotifyUser = {
  id: string;
  display_name: string;
  images: SpotifyImage[];
};

export type SpotifyContext = {
  type: string;
  uri: string;
};

export type SpotifyPlaybackState = {
  is_playing: boolean;
  shuffle_state: boolean;
  repeat_state: string;
  progress_ms: number;
  item: SpotifyTrack;
  device: SpotifyDevice;
};

export type SpotifyPlayerState = {
  timestamp: number;
  paused: boolean;
  shuffle: boolean;
  repeat_mode: number;
  duration: number;
  position: number;
  context: {
    metadata: {
      current_item: SpotifyPlayerMetadataItem;
      previous_items: SpotifyPlayerMetadataItem[];
      next_items: SpotifyPlayerMetadataItem[];
    };
  };
  track_window: {
    current_track: SpotifyTrack;
    previous_tracks: SpotifyTrack[];
    next_tracks: SpotifyTrack[];
  };
};

export type SpotifyPlayerMetadataItem = {
  name: string;
  uri: string;
  estimated_duration: number;
  artists: SpotifyArtist[];
  images: SpotifyImage[];
};

export type SpotifySearch = {
  albums: SpotifyAlbum[];
  artists: SpotifyArtist[];
  playlists: SpotifyPlaylist[];
  tracks: SpotifyTrack[];
};

export type SpotifyDiscography = {
  albums: SpotifyAlbum[];
  singles: SpotifyAlbum[];
  compilations: SpotifyAlbum[];
};

export type SpotifyDiscographyType = {
  type: string;
  items: SpotifyAlbum[];
};
