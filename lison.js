var evaluate = function (exp) {
    if (exp.constructor !== Array) {
        return exp;
    }
    var functionName = exp[0];
    if (functionName === 'if') {
        if (evaluate(exp[1])) {
            return evaluate(exp[2]);
        }
        return evaluate(exp[3]);
    }

    if (functionName === 'quote') {
        return exp[1];
    }

    if (functionName === 'lambda') {
        return lambda(exp[1], exp[2]);
    }

    var functionToCall = eval(functionName);
    var args = [];
    for (var i = 1; i < exp.length; i++) {
        var arg = evaluate(exp[i]);
        args.push(arg);
    }
    return functionToCall.apply(window, args);
};

var env = {};

var get = function (key) {
    return env[key];
};

var set = function (key, value) {
    env[key] = value;
};

var lambda = function (vars, exp) {
    return function () {
        for (var i = 0; i < vars.length; i++) {
            set(vars[i], arguments[i]);
        }
        return evaluate(exp);
    };
};

var list = function () {
    return arguments;
};
