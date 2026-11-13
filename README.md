# samePageStorage
samePageStorage is a 2kB ESModule which monkeypatches the Storage.prototype.setItem method to take advantage of a BroadcastChannel which ensures that the onstorage event can be heard by the window in which the WebStorage was updated as well as by all other same-origin browsing contexts.
