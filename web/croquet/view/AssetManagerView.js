class AssetManagerView extends Croquet.View {
    constructor(model) {
        super(model);

        this.subscribe('asset-manager', 'put', this.put);
        this.subscribe('asset-manager', 'get', this.get);
    }

    fromBase64url(base64) {
        return new Uint8Array(atob(base64.padEnd((base64.length + 3) & ~3, "=")
            .replace(/-/g, "+")
            .replace(/_/g, "/")).split('').map(c => c.charCodeAt(0)));
    }

    toBase64url(bits) {
        return btoa(String.fromCharCode(...new Uint8Array(bits)))
            .replace(/=/g, "")
            .replace(/\+/g, "-")
            .replace(/\//g, "_");
    }

    async hashBuffer(buffer) {
        // MS Edge does not like empty buffer
        if (buffer.length === 0) return "47DEQpj8HBSa-_TImW-5JCeuQeRkm5NMpJWZG3hSuFU";
        const bits = await window.crypto.subtle.digest("SHA-256", buffer);
        return this.toBase64url(bits);
    }

    url(hash) {
        return `https://croquet.io/files/v1/sessiondata/${hash}`;
    }


    put({file, callback}) {
        file.arrayBuffer()
            .then(arrayBuffer => {
                this.hashBuffer(arrayBuffer)
                    .then(hash => {
                        fetch(this.url(hash), {
                            method : 'PUT',
                            body : file,
                        }).then(success => {
                            callback(hash);
                        });
                    });
            })
    }

    get({hash, callback}) {
        fetch(this.url(hash))
            .then(response => {
                callback(response);
            });
    }
}

export default AssetManagerView;