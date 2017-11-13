const { BrowserWindow } = require('electron')
const path = require('path')

class Twitchee extends BrowserWindow {
  constructor (channel, proxy) {
    super({
      show: false,
      alwaysOnTop: true,
      title: channel
    })
    this.setMenu(null)
    this._setProxy(proxy)
      .then(() => this._watch(channel))
      .then(() => this.show())
      .catch(error => {
        console.error(error.message)
        this.close()
      })
  }

  _setProxy (proxy) {
    const { webContents: { session } } = this
    if (proxy == null) {
      return new Promise(resolve => session.setProxy({
        proxyRules: proxy
      }, resolve))
    } else {
      return Promise.resolve()
    }
  }

  _watch (channel) {
    const { webContents } = this
    const page = path.resolve(__dirname, `index.html?${channel}`)
    return new Promise((resolve, reject) => {
      webContents.loadURL(page)
      webContents.once('did-finish-load', resolve)
      webContents.once('did-fail-load',
        (event, errorCode, errorDescription) => reject(Error(errorDescription)))
    })
  }
}

module.exports = Twitchee
