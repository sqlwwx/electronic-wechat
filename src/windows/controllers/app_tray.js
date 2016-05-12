/**
 * Created by Zhongyi on 5/2/16.
 */
"use strict";

const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;
const nativeImage = electron.nativeImage;

const Common = require('../../common');

class AppTray {
  constructor(splashWindow, wechatWindow) {
    this.splashWindow = splashWindow;
    this.wechatWindow = wechatWindow;

    let image = nativeImage.createFromPath(
      Common.getDict('TRAY_ICONS', process.platform)
    );
    image.setTemplateImage(true);

    this.tray = new electron.Tray(image);
    this.tray.setToolTip(Common.ELECTRONIC_WECHAT);

    if (process.platform == "linux") {
      let contextMenu = Menu.buildFromTemplate([
        {label: 'Show', click: () => this.hideSplashAndShowWeChat()},
        {label: 'Exit', click: () => app.exit(0)}
      ]);
      this.tray.setContextMenu(contextMenu);
    } else {
      this.tray.on('click', () => this.hideSplashAndShowWeChat());
    }
  }

  setTitle(title) {
    this.tray.setTitle(title);
  }

  hideSplashAndShowWeChat() {
    if (this.splashWindow.isShown) return;
    this.wechatWindow.show();
  }
}

module.exports = AppTray;
