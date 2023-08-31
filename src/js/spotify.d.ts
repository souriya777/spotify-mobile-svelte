export type SpotifySong = {
  context: SpotifyContext;
  track: SpofityTrack;
};

export type SpofityTrack = {
  uri: string;
  name: string;
  duration_ms: number;
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
};

export type SpotifyPlaybackState = {
  device: SpotifyDevice;
  is_playing: boolean;
  shuffle_state: boolean;
  repeat_state: string;
  progress_ms: number;
  item: SpotifyTrack;
};

export type SpotifyPlayerState = {
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
    current_track: SpofityTrack;
    previous_tracks: SpofityTrack[];
    next_tracks: SpofityTrack[];
  };
};

export type SpotifyPlayerMetadataItem = {
  name: string;
  uri: string;
  estimated_duration: number;
  artists: SpotifyArtist[];
  images: SpotifyImage[];
};

export type SpotifyDeviceList = {
  devices: SpotifyDevice[];
};

export type SpotifyDevice = {
  id: string;
  is_active: boolean;
  name: string;
  type: 'Computer' | 'Smartphone';
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
  isEmpty: () => boolean;
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
  uri: string;
};
