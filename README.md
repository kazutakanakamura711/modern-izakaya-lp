# Modern Izakaya LP

「炭と酒 余白」のランディングページです。Vite、React、TypeScript、Tailwind CSS 4を使用しています。

## セットアップ

Node.jsは `.nvmrc` に指定した `24.22.1`、npmは `package.json` の `packageManager` に指定した `11.19.1` を使用します。
`engines.node` では、セキュリティ更新済みの `24.22.1` 以降の24系を要求しています。

`nvm` を導入済みの場合は、次の手順で指定バージョンをインストール・使用します。

```bash
nvm install
nvm use
npm ci
npm run dev
```

Tailwind CSS 4は `@tailwindcss/vite` 経由でビルドし、共通のスタイルとテーマは `src/index.css` で管理します。

## 検証

```bash
npm audit
npm run validate
npm run test:e2e
```

`validate` は整形、Lint、型チェック、単体テスト、本番ビルドを実行します。
E2EはChromiumで390px・768px・1440pxの表示と操作を確認します。画面サイズ限定のテストは、対象外のサイズではスキップします。
E2Eの初回実行前には `npx playwright install chromium` でブラウザーをインストールしてください。

Node.jsを更新する場合は `.nvmrc` と `engines.node` を整合させ、`npm ci` と上記の検証を実行してください。
依存関係の更新時は `package.json` と `package-lock.json` を一緒に管理します。

## Vercel

VercelのNode.js設定は `24.x` を使用します。マイナー・パッチ更新はVercelが管理し、ローカル用の `.nvmrc` とは別に扱います。
詳細は [VercelのNode.jsバージョン管理](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions) を参照してください。

このLPは `npm run build` で生成した `dist` の静的ファイルを配信します。

## Gitフック

`pre-commit` は `lint-staged` と単体テスト、`pre-push` は `validate` とE2Eを実行します。
