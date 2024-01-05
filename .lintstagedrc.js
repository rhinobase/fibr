module.exports = {
  "{apps,libs,tools}/**/*.{js,jsx,ts,tsx,json}": [
    (files) => `nx affected --target=typecheck --files=${files.join(",")}`,
    (files) => `pnpm dlx @biomejs/biome check --apply ${files.join(" ")}`,
  ],
};
