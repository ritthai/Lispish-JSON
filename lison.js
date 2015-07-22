var evaluate = function (exp, env) {
    if (undefined === env) { 
        env = {inner: this};
    }
    if (exp.constructor !== Array) {
        return exp;
    }
    var first = evaluate(exp[0], env);

    if (first === 'if') {
        if (evaluate(exp[1], env)) {
            return evaluate(exp[2], env);
        }
        return evaluate(exp[3], env);
    }
    if (first === 'quote') {
        return exp[1];
    }
    if (first === 'lambda') {
        return lambda(exp[1], exp[2]);
    }

    var functionToCall;
    if (typeof first === 'string') {
        functionToCall = eval(first);
    } else if (typeof first === 'function') {
        functionToCall = first;
    } else {
        return;
    }

    var args = [];
    for (var i = 1; i < exp.length; i++) {
        var arg = evaluate(exp[i], env);
        args.push(arg);
    }
    if (functionToCall === get) {
        return get(env, args[0]);
    }
    if (functionToCall === set) {
        console.log('set it');
        return set(env, args[0], args[1]);
    }
    return functionToCall.apply(this, args);
};

var env = {};

var get = function (env, key) {
    return find(env, key)[key];
};

var set = function (env, key, value) {
    find(env, key)[key] = value;
};

var lambda = function (vars, exp) {
    return function () {
        var inner = {};
        for (var i = 0; i < vars.length; i++) {
            inner[vars[i]] = arguments[i];
        }
        return evaluate(exp, {inner: inner, outer: this});
    };
};

var list = function () {
    return arguments;
};

var find = function (env, key) {
    if (env.inner[key]) { return env.inner; }
    if (env.outer) { return find(env.outer, key); }
    return env.inner;
};
