
# jqValid

jQuery用のバリデーションユーティリティ。


## 主な機能

- オブジェクトまたはform要素の値をバリデートします
- 値が不正だった場合に、エラーメッセージを返します
- バリデーションルールはオブジェクトで設定します
- 関数を使用して単純に値をテストする事ができます
- その他、細かい機能でバリデーションをサポート

## 基本的な使い方


### ルールの宣言

次の様なオブジェクトでバリデーションのルールを宣言します。

```
var rules = {
	name : [
		{ method : "notEmpty", message : "名前を入力してください" },
		{ method : "maxLength", args : [100], message : "100文字以内で入力してください" }
	],
	email : [
		{ method : "email", message : "正しいメールアドレスを入力してください" }
	]
};
```

- "method" は$.validのメンバ関数である必要があります
- "args" は "method" に渡される追加引数です。（オプション）
- "message" は値が不正だった場合に返されるメッセージです


### $.Validationの初期化

ルールを引数に渡して$.Validationのインスタンスを初期化します。

```
var myValidation = new $.Validation(rules);
```

### form要素をバリデートし、結果を取得する (validateForm)

以下のうちいずれかを$.Validation.validateForm()に渡し、コールバック関数で結果を取得します。（このメソッドは$.Deferredオブジェクトを返します）

- HTMLFormElement
- セレクタ文字列
- form要素を内包したjQueryオブジェクト

```
myValidation.validateForm("form#my-form")
.then(function(valid, errors, data){
	// valid : Boolean (values are all valid or not)
	// errors : Object (error messages)
	// data : Object (values passed to validate)
});
```

第二引数でコールバック関数を渡す事も出来ます。

```
myValidation.validateForm("form#my-form", function(){ ... });
```

または、コールバック関数を使用せずに、$.Validation.getErrors() や $.Validation.getResult() で結果を取得する事も出来ます。

- getErrors() : 直近のバリデーションのエラーメッセージを返します
- getResult() : 直近のバリデーションの結果をオブジェクトで返します

```
myValidation.validateForm({...});
var errors = myValidation.getErrors(); // Get messages as object
var ressult = myValidation.getResult(); // Get result object
```

### オブジェクトをバリデートする (validate)

```
myValidation.validateForm({
	name : "foo",
	email : "foo@example.com"
})
.then(function(){ ... });
```

### 値をバリデートする (check)

```
myValidation.check("email", "foo@example.com")
.then(function(valid, message){
	// valid : Boolean (valid or not)
	// message : String (error message when invalid)
});
```

### ほうほう、それで？

申し訳ありませんが、これがjqValidの内容全てです。

エラーメッセージをinput要素の隣に表示する等の処理は、
jqValidの返す結果を利用して、うまいこと実装してください。


## APIドキュメント

- [$.Validation](docs/validation.md)
- [$.valid](docs/valid.md)
- [Extensions](docs/extend.md)


## 作者

mach3

- [Website](http://www.mach3.jp)
- [Blog](http://blog.mach3.jp)
- [Twitter](http://twitter.com/mach3ss)