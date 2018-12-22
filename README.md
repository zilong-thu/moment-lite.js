# moment-lite.js

一直很喜欢 `moment.js`，但是它有时候太臃肿了（好比语言包问题），而且不够函数式（`moment().add(1, 'days')`的副作用...），所以我就写了个非常轻量级的 `moment-lite.js`。

后来同事告诉说已经有一个很好的 moment.js 替代品了：[https://date-fns.org/](https://date-fns.org/)。Well...也没有关系，就当自己练手吧。我设计的 API 跟它们都不太一样。

目标：

+ 好用的 API
+ 无副作用
+ 轻量级

## Usage

```javascript
import moment from 'moment-lite';

const now = moment();
console.log(now.format('YYYY-MM-DD HH:mm:ss'));
```

## APIs
