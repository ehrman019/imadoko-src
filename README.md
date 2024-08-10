<p align="left">
  <img src="https://img.shields.io/badge/-Typescript-555.svg?logo=typescript&style=flat-square">
  <img src="https://img.shields.io/badge/-React-555.svg?logo=react&style=flat-square">
  <img src="https://img.shields.io/badge/-vite-555.svg?logo=vite&style=flat">
  <img src="https://img.shields.io/badge/-laravel-555.svg?logo=laravel&style=flat-square">
  <img src="https://img.shields.io/badge/-node.js-555.svg?logo=node.js&style=flat-square">
  <img src="https://img.shields.io/badge/-Docker-555.svg?logo=docker&style=flat-square">
</p>

## 概要
勤怠状況や予定を登録・確認できるWebアプリケーション

## 仕様
- トップページ：勤務状況・時間の登録
- 設定：カラーテーマ・日付表示の変更


## 備忘録
### クローン後の構築

- 依存関係のインストール

```
npm i
```
```
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php83-composer:latest \
    composer install --ignore-platform-reqs
```

- .env の作成
```
cp .env.example .env
```

- .envを編集（抜粋）
```
APP_TIMEZONE=Asia/Tokyo
```
```
APP_LOCALE=ja
APP_FALLBACK_LOCALE=ja
APP_FAKER_LOCALE=ja_JP
```
```
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=sail
DB_PASSWORD=password
```
※初回のみ　コマンド入力を`./vendor/bin/sail`->`sail`にするため、`.bashrc`の一番最後の行に
```
alias sail='[-f sail]&& bash sail || bash vender/bin/sail'
```
を追記し保存
- sailの起動
```
sail up -d
```

- APP_KEY の更新・マイグレーション・シード

```
sail artisan key:generate
sail artisan migrate:fresh --seed
```
- viteの起動
```
npm run dev
```

### 環境構築（新規）

```
npm install
npm install -D @vitejs/plugin-react
npm install -D typescript
npm add -D sass
npx tsc --init --jsx react-jsx
npm i -D react-router-dom @types/react-router-dom
```
- [Emotion](https://emotion.sh/docs/introduction): css
- [React Datepicker](https://reactdatepicker.com/)
- [Font Awesome](https://docs.fontawesome.com/web/use-with/react/)
- [date-fns](https://date-fns.org/docs/Getting-Started#installation)



