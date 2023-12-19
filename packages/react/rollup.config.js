const preserveDirectives = require("rollup-plugin-preserve-directives");
const nxConfig = require("@nx/react/plugins/bundle-rollup");
const terser = require("@rollup/plugin-terser");

module.exports = (_config) => {
  const config = nxConfig(_config);

  config.preserveModules = true;
  config.plugins.push(
    preserveDirectives.default(), // For preserving "use client" directives
    terser(), // For minification
  );

  return config;
};
