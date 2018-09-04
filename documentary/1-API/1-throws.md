
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

### Arguments

To pass arguments to the tested function, the `args` properties can be used.

%EXAMPLE: example/args.js, ../src => assert-throws%

%FORK example example/args%

### Context

To pass context to the function, the `context` properties can be set.

%EXAMPLE: example/context.js, ../src => assert-throws%

%FORK example example/context%
