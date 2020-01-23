function patternCreator(prefix, postfix) {
    replacedPrefix = prefix.replace(/[\[\]\(\)\+\!]/g, '\\$&');
    replacedPostfix = postfix.replace(/[\[\]\(\)\+\!]/g, '\\$&');

    return replacedPrefix + '(.*)' + replacedPostfix;
}

function isMatching(string, pattern) {
    var result = string.match(new RegExp(pattern));
    if (result) return result[1];

    return null;
}

function setDecoded(decodedCode) {
    var code = document.querySelector('#code');
    code.value = eval(decodedCode);
}

function decode() {
    var code = document.querySelector('#code');

    var prefix = '[][' + JSFuck.encode('fill') + ']' +
                 '[' + JSFuck.encode('constructor') + ']' +
                 '(' + JSFuck.encode('return eval') + ')()(';
    var postfix = ')';
    var result = isMatching(code.value, patternCreator(prefix, postfix));

    if (result) {
        setDecoded(result);

        return;
    }

    prefix = '[][' + JSFuck.encode('fill') + ']' +
             '[' + JSFuck.encode('constructor') + '](';
    postfix = ')()';
    result = isMatching(code.value, patternCreator(prefix, postfix));

    if (result) {
        setDecoded(result);

        return;
    }

    prefix = '[][' + JSFuck.encode('filter') + ']' +
             '[' + JSFuck.encode('constructor') + '](';
    postfix = ')()';
    result = isMatching(code.value, patternCreator(prefix, postfix));

    if (result) {
        setDecoded(result);

        return;
    }

    setDecoded(code.value);
}
