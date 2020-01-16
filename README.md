# React typescript todo
```
npx react-typescript-todo --typescript
cd react-typescript-todo
```

# code
色々な方針で実装して比較してみました。

## fat-component
１コンポーネントでロジックとビューを実装

### 実装してみてどうだったか
小規模だったら全部込みでもいいかもしれない。
密結合なので、テストをどうすればよいのだろうか？

## container-presentational
componentのデザインとしてpresentational componentとcontainer component
[Usage with React](https://redux.js.org/basics/usage-with-react/#presentational-and-container-components)
ロジックをContainer Componentで実装
ビューをPresentational Componentで実装

### 実装してみてどうだったか
ビューのテストをするのであれば良い？

## container-presentational-atomic
ロジックをContainer Componentで実装
ビューをPresentational Componentで実装
ビューを意味のある単位でコンポーネントに分割

### 実装してみてどうだったか
細かい意味のある部品で分割した。
引数を渡していく実装が手間だった。
コンポーネントの再利用をするのであれば、有効だと思う。
疎結合なので、テストもしやすい？

## container-presentational-hooks
ロジックをContainer Componentをreact hooksを使用して実装
ビューをPresentational Componentで実装

### 実装してみてどうだったか
react hooksを利用することで関数のbindが必要なくなった。
thisを書かずにすむようになった。

今回のサンプルでは使用していないが、componentDidMountなどの処理が、
useEffect関数だけでまとめることができる。また、ロジックを共通化できるということだったので、
基本的にはreact hooksを使って実装していく方針で良さそう


# tips
## propsにわたすときにスプレッド演算子で展開
[JSX を深く理解する – React](https://ja.reactjs.org/docs/jsx-in-depth.html#spread-attributes)

## Formを使う
考え方として制御コンポーネントと非制御コンポートネントの２種類が存在する
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

## arrayの更新が反映されない
reacthooksで配列を更新したときに変更が反映されなかった。
スプレッド演算子で配列を複製することで対応した。

スプレッド演算子は様々な用途で使えるので、覚えておいたほうが良さそう。
[【JavaScript】スプレッド構文の便利な使い方まとめ \- Qiita](https://qiita.com/Nossa/items/e6f503cbb95c8e6967f8#%E9%85%8D%E5%88%97%E3%82%92%E8%A4%87%E8%A3%BD%E3%81%99%E3%82%8B)

### before
```
const todo = todoList.find(todo => todo.id === id) as Todo
todo.status = TodoStatus.COMPLETE;
setTodoList(todoList)
```
### after
```
const todo = todoList.find(todo => todo.id === id) as Todo
todo.status = TodoStatus.COMPLETE;
setTodoList([...todoList])
```