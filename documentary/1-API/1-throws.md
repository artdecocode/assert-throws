
```### async throws => Error
[
  ["fn", "function"],
  ["args?", "any[]"],
  ["message?", "string|RegExp"],
  ["code?", "string"],
  ["error?", "Error"],
  ["context?", "any"]
]
```

Checks if a function throws an error. As a minimum, the function should be passed in the `fn` property.

%EXAMPLE: example/throws-fail.js, ../src => assert-throws%

%FORK example example/throws-fail%
