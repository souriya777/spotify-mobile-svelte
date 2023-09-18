export type SpotifySong = {
  track: SpotifyTrack;
  context: SpotifyContext;
  added_at: date;
};

export type SpotifyTrack = {
  uri: string;
  name: string;
  duration_ms: number;
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
};

export type SpotifyAlbum = {
  uri: string;
  name: string;
  images: SpotifyImage[];
};

export type SpotifyArtist = {
  name: string;
  uri: string;
};

export type SpotifyPlaylist = {
  id: string;
  uri: string;
  name: string;
  owner: SpotifyUser;
  images: SpotifyImage[];
  tracks: SpotifyPlaylistTracks;
  added_at: date;
};

export type SpotifyPlaylistTracks = {
  href: string;
  total: number;
};

export type SpotifyPlaylistItems = {
  items: SpotifyPlaylistItem[];
};

export type SpotifyPlaylistItem = {
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

export type SpotifyAlbumCursor = {
  href: string;
  limit: number;
  offset: number;
  total: number;
  next: string;
  previous: string;
  items: SpotifyAlbumItemCursor[];
};

export type SpotifyAlbumItemCursor = {
  album: SpotifyAlbum;
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

export interface SpotifyPlaylistCursor extends Cursor {
  items: SpotifyPlaylist[];
}

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
