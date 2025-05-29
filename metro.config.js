// metro.config.js
const { getDefaultConfig } = require('@expo/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList'); // don't rename

const config = getDefaultConfig(__dirname);

config.resolver.blockList = exclusionList([
  /.*\/@tensorflow\/tfjs-react-native\/dist\/bundle_resource_io\.js/,
  /.*\\@tensorflow\\tfjs-react-native\\dist\\bundle_resource_io\.js/,
]);

module.exports = config;
