import { sub, drv, isDrv, isVal, _isPlainObject } from 'rval';

const states = [];
let currentFrame = -1;
let undoing = false;

export function trackChanges(store) {
    const snapshot = drv(() => toJS(store));
    sub(snapshot, state => {
        console.dir(state);
        if (!undoing) {
            states.splice(++currentFrame);
            states.push(toJS(state));
        }
    });
}

export function previousState(store) {
    if (currentFrame > 1) {
        currentFrame--;
        undoing = true;
        store.load(states[currentFrame]);
        undoing = false;
    }
}

export function nextState(store) {
    if (currentFrame < states.length - 1) {
        currentFrame++;
        undoing = true;
        store.load(states[currentFrame]);
        undoing = false;
    }
}

export function toJS(thing) {
    if (!thing) { return thing; }
    if (typeof thing.toJS === 'function') { return thing.toJS(); }
    if (isVal(thing) || isDrv(thing)) { return toJS(thing()); }
    if (Array.isArray(thing)) { return thing.map(toJS); }
    if (_isPlainObject(thing)) {
        const res = {};
        for (const key in thing) {
            if (typeof thing[key] !== 'function' || isVal(thing[key])) {
                res[key] = toJS(thing[key]);
            }
        }
        return res;
    }
    return thing;
}
