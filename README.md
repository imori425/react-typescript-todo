# React typescript todo
```
npx react-typescript-todo --typescript
cd react-typescript-todo
```

## propsにわたすときにスプレッド演算子で展開
[JSX を深く理解する – React](https://ja.reactjs.org/docs/jsx-in-depth.html#spread-attributes)

## Formを使う
制御コンポーネントと非制御コンポートネントの２種類が存在する
今回は制御されたコンポーネントで実装してみた。
### 制御されたコンポーネント
[フォーム – React](https://ja.reactjs.org/docs/forms.html#controlled-components)

FORMの状態（例えば、テキストやセレクトボックスの値）をstateで管理する方法。
属性の変更があった場合に、ハンドラ関数を用いてstateで更新する。
stateで管理することでバリデーションなどが、即時にできるなどの利点がある。
それぞれの属性にハンドラ関数を用意する必要がある。

### 非制御コンポーネント

[非制御コンポーネント – React](https://ja.reactjs.org/docs/uncontrolled-components.html)
非制御コンポーネントでは制御されたコンポーネントとは異なり、formの状態をstateで管理しない。
DOMのForm自身に状態を管理させる。
refを利用して状態を取得することができる。

### 制御されたコンポーネントｖｓ非制御コンポーネント
[Controlled and uncontrolled form inputs in React don't have to be complicated \- Gosha Arinich](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/)

リアルタイムにフィードバックを与えるようなフォームの場合は制御されたコンポーネントを使ったほうが良い。
そういった用途がなければ非制御コンポーネントでも良い。

## Eventの型

[EventCallback](https://qiita.com/Takepepe/items/f1ba99a7ca7e66290f24)

全部anyでもいいかなと思ったけど、初めてなので書いてみることにした。

## setStateを使っていたらundefined

[ES6でReact使ってたらsetStateがundefinedとか怒られた件 \- とっしぃのTech Memo](http://tossy-yukky.hatenablog.com/entry/2016/01/15/185338)

少し理解が足りていない