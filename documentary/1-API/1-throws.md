
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

%EXAMPLE: example/throws.js, ../src => assert-throws%
