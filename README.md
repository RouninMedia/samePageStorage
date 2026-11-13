# samePageStorage
`samePageStorage` is a 2kB ESModule which monkeypatches the `Storage.prototype.setItem` method to take advantage of a `BroadcastChannel`

This ensures that the `storage` event can be heard by the window in which the `WebStorage` was updated as well as by all other same-origin browsing contexts.

This is helpful when using `WebStorage` as the Single Source of Truth (SSOT).

The `Storage.prototype.setItem` method is reconfigured such that it takes three parameters instead of two. The third parameter, `samePage`, defaults to `false`:

```
Storage.prototype.setItem = function (storageKey, storageValue, samePage = false) { [...] }
```

## How is it activated?

When you update an item in localStorage, if you want the onstorage event to fire also on the window that makes the change, you use:

```
localStorage.setItem('myStorageKey', myStorageValue, true);
```

Setting that new third parameter to a Boolean value of `true` will initiate the sequence.

## How does it work?

The monkeypatched `.setItem()` method, in addition to firing the storage event on all other same-origin browsing contexts (as it normally would) will also send a message to a `BroadcastChannel` created specifically for this purpose.

The message includes the storage key and the storage value and identifies the window which updated the `WebStorage`.

All same-origin browsing contexts are subscribed to the `BroadcastChannel` mentioned above. One of them (already nominated) will respond to the message by re-confirming the storage update which has just taken place.

The process of re-confirmation means that the window which originally made the change will now also hear the same `onstorage` event which all other browsing contexts have already heard.
