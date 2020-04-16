class WebTorrentView extends Croquet.View {
    constructor(model) {
        super(model);

        // https://github.com/webtorrent/webtorrent/blob/master/docs/api.md#client--new-webtorrentopts
        this._client = new WebTorrent();
        this._hashingClient = new WebTorrent();

        this.subscribe("torrent", "add", this._add);
        this.subscribe("torrent", "seed", this._seed);
    }

    getMagnetURI(files, callback) {
        // https://github.com/webtorrent/webtorrent/blob/master/docs/api.md#clientseedinput-opts-function-onseed-torrent-
        this._hashingClient.seed(files, torrent => {
            const {magnetURI} = torrent;

            // https://github.com/webtorrent/webtorrent/blob/master/docs/api.md#torrentdestroycallback
            torrent.destroy(() => {
                callback(magnetURI);
            });
        });
    }

    seed(files, options, callback) {
        this.getMagnetURI(files, magnetURI => {
            // https://github.com/webtorrent/webtorrent/blob/master/docs/api.md#clientgettorrentid
            const _torrent = this._client.get(magnetURI);

            if(_torrent) {
                // https://github.com/webtorrent/webtorrent/blob/master/docs/api.md#torrentdestroycallback
                _torrent.destroy(() => {
                    // https://github.com/webtorrent/webtorrent/blob/master/docs/api.md#clientseedinput-opts-function-onseed-torrent-
                    this._client.seed(...arguments);
                });
            }
            else {
                // https://github.com/webtorrent/webtorrent/blob/master/docs/api.md#clientseedinput-opts-function-onseed-torrent-
                this._client.seed(...arguments);
            }
        });
    }
    _seed({files, options, callback}) {
        this.seed(files, options, callback);
    }

    add(torrentId, options, callback) {
        // https://github.com/webtorrent/webtorrent/blob/master/docs/api.md#clientgettorrentid
        const torrent = this._client.get(torrentId);
        if(!torrent) {
            // https://github.com/webtorrent/webtorrent/blob/master/docs/api.md#clientaddtorrentid-opts-function-ontorrent-torrent-
            this._client.add(...arguments);
        }
        else {
            callback = callback || options;
            callback(torrent);
        }
    }
    _add({torrentId, options, callback}) {
        this.add(torrentId, options, callback);
    }

    detach() {
        // https://github.com/webtorrent/webtorrent/blob/master/docs/api.md#clientdestroyfunction-callback-err-
        this._client.destroy();
        this._hashingClient.destroy();
        
        super.detach();
    }
}

export default WebTorrentView;