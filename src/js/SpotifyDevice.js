/**
 * @type {import('./spotify').SpotifyDevice}
 */
class SpotifyDevice {
  constructor(fromApi) {
    this.is_active = fromApi?.is_active;
    this.name = fromApi?.name;
    this.type = fromApi?.type;
    this.volume_percent = fromApi?.volume_percent;
  }
}

export default SpotifyDevice;
