# Modern Izakaya LP

- Source of truth: Figma Make `nSh3kDdPKkmVSyfd6jLUvF`; copy and local files in `public/assets` are the approved design content.
- Stack: Vite, React, strict TypeScript, npm (`package-lock.json` stays synchronized), Tailwind CSS v4 using CSS-first `@theme` tokens in `src/index.css`. Do not add a Tailwind v3 config.
- Use kebab-case filenames, PascalCase React components, data arrays for repeating content, and `Reveal` for intentional entry motion. Keep shared global rules in `src/index.css` only.
- Keep semantic landmarks, keyboard-operable controls, visible focus, reduced-motion support, and mobile-first responsiveness (390px, tablet, desktop 1440px).
- Quality: `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run test:e2e`; `npm run validate` combines non-E2E checks.
- Husky v9 runs `lint-staged` then `npm test` before commits. Staged TS/JS receives `eslint --fix` and Prettier; CSS/JSON/Markdown/HTML receives Prettier.
- Only the assigned implementation agent writes source files. Quality reviewers remain read-only. GitHub publishing, history changes, and deployment require explicit work by their respective agents.
