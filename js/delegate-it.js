(function() {

/** Keeps track of raw listeners added to the base elements to avoid duplication */
const ledger = new WeakMap();
function editLedger(wanted, baseElement, callback, setup) {
    var _a, _b;
    if (!wanted && !ledger.has(baseElement)) {
        return false;
    }
    const elementMap = (_a = ledger.get(baseElement)) !== null && _a !== void 0 ? _a : new WeakMap();
    ledger.set(baseElement, elementMap);
    if (!wanted && !ledger.has(baseElement)) {
        return false;
    }
    const setups = (_b = elementMap.get(callback)) !== null && _b !== void 0 ? _b : new Set();
    elementMap.set(callback, setups);
    const existed = setups.has(setup);
    if (wanted) {
        setups.add(setup);
    }
    else {
        setups.delete(setup);
    }
    return existed && wanted;
}
function isEventTarget(elements) {
    return typeof elements.addEventListener === 'function';
}
function safeClosest(event, selector) {
    let target = event.target;
    if (target instanceof Text) {
        target = target.parentElement;
    }
    if (target instanceof Element && event.currentTarget instanceof Element) {
        // `.closest()` may match ancestors of `currentTarget` but we only need its children
        const closest = target.closest(selector);
        if (closest && event.currentTarget.contains(closest)) {
            return closest;
        }
    }
}
// This type isn't exported as a declaration, so it needs to be duplicated above
function delegate(base, selector, type, callback, options) {
    // Handle Selector-based usage
    if (typeof base === 'string') {
        base = document.querySelectorAll(base);
    }
    // Handle Array-like based usage
    if (!isEventTarget(base)) {
        const subscriptions = Array.prototype.map.call(base, (element) => delegate(element, selector, type, callback, options));
        return {
            destroy() {
                for (const subscription of subscriptions) {
                    subscription.destroy();
                }
            },
        };
    }
    // `document` should never be the base, it's just an easy way to define "global event listeners"
    const baseElement = base instanceof Document ? base.documentElement : base;
    // Handle the regular Element usage
    const capture = Boolean(typeof options === 'object' ? options.capture : options);
    const listenerFn = (event) => {
        const delegateTarget = safeClosest(event, selector);
        if (delegateTarget) {
            event.delegateTarget = delegateTarget;
            callback.call(baseElement, event);
        }
    };
    // Drop unsupported `once` option https://github.com/fregante/delegate-it/pull/28#discussion_r863467939
    if (typeof options === 'object') {
        delete options.once;
    }
    const setup = JSON.stringify({ selector, type, capture });
    const isAlreadyListening = editLedger(true, baseElement, callback, setup);
    const delegateSubscription = {
        destroy() {
            baseElement.removeEventListener(type, listenerFn, options);
            editLedger(false, baseElement, callback, setup);
        },
    };
    if (!isAlreadyListening) {
        baseElement.addEventListener(type, listenerFn, options);
    }
    return delegateSubscription;
}
// export default delegate;

window.delegate = delegate;
})();
