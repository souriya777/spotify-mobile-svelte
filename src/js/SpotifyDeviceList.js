import SpotifyDevice from '@/js/SpotifyDevice';

/**
 * @type {import('@/js/spotify').SpotifyDeviceList}
 */
class SpotifyDeviceList {
  constructor(fromApi) {
    this.devices = fromApi?.devices?.map((item) => new SpotifyDevice(item));
  }
}

export default SpotifyDeviceList;
