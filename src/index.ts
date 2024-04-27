const MAX_ARRAY_LENGTH = 10;
const ALLOWED_STRING_MASK: RegExp = /^[a-z]+$/;
const MAX_STRING_LENGTH = 1e5;

function commonPrefix1(strArray: unknown): number[] {
    if (!Array.isArray(strArray) || !strArray.length || strArray.length > MAX_ARRAY_LENGTH) {
        throw new Error('Invalid input array');
    }

    return strArray.reduce((acc, str: string, i: number) => {
        validateString(str, i);

        let totalPrefixLength = 0;

        for (let i = 0; i <= str.length; i++) {
            const l = calculateCommonPrefixLength(str, str.substring(i));
            totalPrefixLength += l
        }

        acc.push(totalPrefixLength);

        return acc;
    }, [] as number[]);
}

function calculateCommonPrefixLength(all: string, suffix: string): number {
    const suffixLength = suffix.length;

    for (let i = 0; i < suffixLength; i++) {
        if (all[i] !== suffix[i]) {
            // return the count of overlapping characters so far
            return i;
        }
    }

    // if no mismatches were found, return the shorter string's length
    return suffixLength;
}

function validateString(str: unknown, i: number) {
    if (typeof str !== 'string') {
        throw new Error(`Invalid element type at index ${i}`);
    }
    if (str.length > MAX_STRING_LENGTH) {
        throw new Error(`Invalid string length at index ${i}`);
    }
    if (!ALLOWED_STRING_MASK.test(str)) {
        throw new Error(`Invalid string characters at index ${i}`);
    }
}

// test
const inputStrings = ['abcabcd' , 'aa', 'ababaa'];
console.log(commonPrefix1(inputStrings)); // Outputs [ 10, 3, 11 ]