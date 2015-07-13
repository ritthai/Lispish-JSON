var add = function (a, b) { return a + b; }
evaluate(["set", "add2", ["lambda", ["a"], ["add", ["get", "a"], 2]]]);
evaluate([["get", "add2"], 5]);
