var add = function (a, b) { return a + b; }
evaluate(["set", "add2", ["lambda", ["a"], ["add", ["get", "a"], 2]]]);
var out = evaluate([["get", "add2"], 5]);
console.log(out);
