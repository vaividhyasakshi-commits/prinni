import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const output = path.resolve("dist");
const posts = JSON.parse(readFileSync(path.join(output, "data/blogs.json"), "utf8"));
const routes = ["blog", "admin-panel"];

for (const post of posts) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) {
    throw new Error(`Invalid published blog slug: ${post.slug}`);
  }
  routes.push(`blog/${post.slug}`);
}

// GitHub Pages serves these files when a visitor opens or refreshes a route.
for (const route of routes) {
  const directory = path.join(output, route);
  mkdirSync(directory, { recursive: true });
  copyFileSync(path.join(output, "index.html"), path.join(directory, "index.html"));
}

copyFileSync(path.join(output, "index.html"), path.join(output, "404.html"));
writeFileSync(path.join(output, ".nojekyll"), "");
console.log(`Prepared GitHub Pages with ${posts.length} published blog routes.`);
