/**
 * @type {import('./spotify').SpotifyDevice}
 */
class SpotifyDevice {
  constructor(fromApi) {
    this.id = fromApi?.id;
    this.is_active = fromApi?.is_active;
    this.name = fromApi?.name;
    this.type = fromApi?.type;
    this.volume_percent = fromApi?.volume_percent;
    console.log(this.id, this.is_active, this.name, this.type, this.volume_percent);
  }
}

export default SpotifyDevice;
