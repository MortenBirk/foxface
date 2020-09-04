@id stack
@desc Stack multiple ndarrays along a new dimension

```js
import { stack, full } from 'foxface'
    const first = full(1, { shape: [5, 2, 4] })
    const second = full(2, { shape: [5, 2, 4] })
    const third = full(3, { shape: [5, 2, 4] })
    const stacked = stack([first, second, third])
    console.log(stacked.shape)
```

@id stack
@desc Stack multiple ndarrays along a new last axis

```js
import { stack, full } from 'foxface'
    const first = full(1, { shape: [5, 2, 4] })
    const second = full(2, { shape: [5, 2, 4] })
    const third = full(3, { shape: [5, 2, 4] })
    const stacked = stack([first, second, third], -1)
    console.log(stacked.shape)
```