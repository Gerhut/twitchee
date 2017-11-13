#!/usr/bin/env electron
const { app } = require('electron')
const Twitchee = require('./twitchee')

const { channel, proxy } = require('yargs')
  .usage('$0 <channel>', 'Watch twitch channel.')
  .option('p', {
    alias: 'proxy',
    default: 'proxy setting',
    type: 'string'
  })
  .argv

app.once('ready', () => new Twitchee(channel, proxy))
app.once('window-all-closed', () => app.exit())
