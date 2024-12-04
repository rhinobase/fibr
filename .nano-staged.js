module.exports = {
  "{apps,libs,tools}/**/*.{js,jsx,ts,tsx,json}": (api) =>
    `pnpm dlx @biomejs/biome check --apply ${api.filenames.join(" ")}`,
};
