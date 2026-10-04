let _0x_0xaa2;

const devHosts = [
    'localhost',
    '127.0.0.1',
    'ngrok-free'
];

const devMode =
    devHosts.includes(location.hostname) ||
    devHosts.includes(
        location.hostname.split('.').at(-1) ||
        location.hostname
    );

let assetsBase = location.origin + '/storage/';



function getAsset(path) {
    if (devMode) {
        return `${location.protocol}//${location.hostname}:${location.port}/stuff/${path}`;
    }

    const hour = Math.floor(Date.now() / 3600000);

    return (
        assetsBase +
        path +
        (path.includes('?') ? '&' : '?') +
        hour +
        '&raw'
    );
}

importScripts(getAsset('sw.js'));
