```### async throws => Error
[
  ["config", {
    "fn": ["function"],
    "args?": ["any|any[]"],
    "context?": ["any"],
    "message?": ["Assertion"],
    "code?": ["Assertion"],
    "error?": ["Assertion"],
    "[prop]?": ["Assertion"]
  }, "Config"]
]
```

Checks if a function throws an error. As a minimum, the function should be passed in the `fn` property. If the assertion passes, the method returns the error which was thrown by the tested function.

%TYPEDEF types/index.xml%

%EXAMPLE: example/throws, ../src => assert-throws%

%FORK example/throws%

%EXAMPLE: example/throws-fail, ../src => assert-throws%

%FORK example/throws-fail%

%~ width="25"%

### Arguments

To pass arguments to the tested function, the `args` properties can be used.

%EXAMPLE: example/args, ../src => assert-throws%

%FORK example/args%

### Context

%~ width="25"%

To pass a context to the function, the `context` properties can be set. Otherwise, it will use the global context, unless it was bound.

%EXAMPLE: example/context, ../src => assert-throws%

%FORK example/context%

%~%