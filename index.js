'use strict';

class Stack {

    constructor(maxSize = 10000) {
        if (typeof maxSize !== 'number') {
            throw new TypeError();
        }
        if (isNaN(maxSize) || maxSize < 0 || !Number.isInteger(maxSize)) {
            throw new RangeError();
        }

        this._size = 0;
        this._maxSize = maxSize;
    }

    get isEmpty() {
        return this._size === 0;
    }

    get size() {
        return this._size;
    }

    push(value) {
        if (this._size >= this._maxSize) {
            throw new RangeError('Stack overflow');
        }
        this[`_${this._size++}`] = value;

        return this._size;
    }

    pop() {
        if (this.isEmpty) {
            return;
        }
        const lastItem = this[`_${--this._size}`];
        delete this[`_${this._size}`];
        return lastItem;
    }

    pick() {
        if (this.isEmpty) {
            return;
        }
        return this[`_${this._size - 1}`];
    }

}

const stack = new Stack();
const string = prompt('Enter brackets');
const brackets = {
    '(': ')',
    '[': ']',
    '{': '}',
};

for (const stringElement of string) {
    switch (stringElement) {
        case brackets[stack.pick()]:
            stack.pop();
            break;
        case Object.keys(brackets)[0]:
        case Object.keys(brackets)[1]:
        case Object.keys(brackets)[2]:
        case brackets["("]:
        case brackets["["]:
        case brackets["{"]:
            stack.push(stringElement);
            break;
        default:
            break;
    }
}

alert(`Stack is ${stack.isEmpty ? '' : 'not '}empty`);
