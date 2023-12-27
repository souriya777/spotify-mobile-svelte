class ChromeLocalStorage {
  async get(key) {
    return await chrome.storage.local.get([key]);
  }

  set(key, value) {
    chrome.storage.local.set({ [key]: value });
  }
}

export default new ChromeLocalStorage();
