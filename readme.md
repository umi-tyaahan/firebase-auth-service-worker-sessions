Service workerを使ったFirebase Auth Sessionの管理
====

See original repo : https://github.com/FirebaseExtended/firebase-auth-service-worker-sessions

## Description

オリジナルを見ながらexpress-generatorをベースに実装
|  flameworks  |  package  |
| ---- | ---- |
|  runtime  |  Node.js(v10)  |
|  web app   |  express  |
|  templateEngine  |  PUG  |
|  authentication  | Firebase Authentication (use FirebaseUI)  |
|  other  | webpack + babel  |

 my coding memo : https://note.com/umaaai/n/n4e3ad5cb9a76

## Requirement

 認証にFirebaseAuthenticationを利用する。   
 あらかじめFirebaseConsoleでの操作が必要。
- Firebaseでプロジェクトを登録
- Firebase Authenticationでログイン方法にGoogleを追加する
- firebase SDKの構成(firebaseConfig)を **/app/config.js** として置く

参考 : https://qiita.com/spre55/items/d751477f5039f8589514

- サーバー用のserviceAccountKeys.jsonを取得し **/serviceAccountKeys.json** として置く

参考 : https://firebase.google.com/docs/admin/setup?hl=ja#initialize_the_sdk

※上記２つのファイル置き場所の目安に、xxxx.js.dummyが配置されている

## Usage
### Local server


```
yarn install
yarn bundle
yarn dev
```

expressサーバーが立ち上がるので、Chomeでhttp://localhost:8000 にアクセスする。

- Loginでログインページを表示。FirebaseUIからOAuthログインプロセスを開始する。
- 認証が成功すると、indexページにredirect。ログインしていればユーザー名が表示される。
- 認証済みの場合、indexページからセキュアなページ(/users)にアクセスできる。
- 認証済みの場合、indexページのログアウトリンクより、ログアウトを行う。
- 未認証の場合、セキュアなページにアクセスするとindexページにredirectされる。

<div align="center">
<img src="https://github.com/umi-tyaahan/firebase-auth-service-worker-sessions/blob/master/doc/images/login.png?raw=true" alt="Logged in" title="Logged in">
</div>

### GAE
あらかじめ、GAEの公開ホスト(xxxx.appspot.com)をFirebase Authenticationのホワイトリストに入れておく必要がある。
<div align="center">
<img src="https://github.com/umi-tyaahan/firebase-auth-service-worker-sessions/blob/master/doc/images/whitelist.png?raw=true" alt="Logged in" title="Logged in">
</div>

```
gcloud app deploy
```

see : https://cloud.google.com/appengine/docs/standard/nodejs/quickstart?hl=ja#deploy_and_run_hello_world_on


### Other
クライアントスクリプト(/app/***.js)を変更した場合webpack(babel)を行う必要がある。

```yarn bundle```

- /public/javascripts/***.jsが生成される
- /public/sw.jsが生成される

sw.jsのリソース位置に注意する。  
see : https://developers.google.com/web/fundamentals/primers/service-workers?hl=ja#service_worker_%E3%81%AE%E7%99%BB%E9%8C%B2


### Probrem
- Google OAuth認証プロセスでクッキーに警告が出る。←そのうち直るんじゃない？

## Licence

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)

## Author

tyaahan