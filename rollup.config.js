const preserveDirectives = require("rollup-plugin-preserve-directives");
const terser = require("@rollup/plugin-terser");

module.exports = (config) => {
  config.preserveModules = true;

  config.plugins.push(
    preserveDirectives.default(), // For preserving "use client" directives
    terser(), // For minification
  );

  return config;
};
