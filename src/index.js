module.exports = function check(str, bracketsConfig) {
    const openingSymbols = [];
    const closingSymbols = [];
    const similarBrackets = [];
    const bracketsPairs = [];
    bracketsConfig.forEach((bracketsArray) => {
        if (bracketsArray[1] === bracketsArray[0]) {
            similarBrackets.push(bracketsArray[0]);
        } else {
            bracketsPairs[bracketsArray[1]] = bracketsArray[0];
            openingSymbols.push(bracketsArray[0]);
            closingSymbols.push(bracketsArray[1]);
        }
    });

    const workArray = [];
    let result = true;
    str.split('').every((symbol) => {
        if ((similarBrackets.includes(symbol) && !workArray.includes(symbol))
            || (openingSymbols.includes(symbol))) {
            workArray.push(symbol);
        } else if ((similarBrackets.includes(symbol) && workArray.includes(symbol) && workArray[workArray.length - 1] === symbol)
            || (closingSymbols.includes(symbol) && workArray[workArray.length - 1] === bracketsPairs[symbol])) {
            workArray.pop();
        } else if ((similarBrackets.includes(symbol) && workArray.includes(symbol) && !workArray[workArray.length - 1] === symbol)
            || (closingSymbols.includes(symbol) && workArray[workArray.length - 1] !== bracketsPairs[symbol])) {
            result = false;
            return false;
        }

        return true;
    });

    return workArray.length > 0 ? false : result;
};
