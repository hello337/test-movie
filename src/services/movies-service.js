export default class MoviesService {
    apiBase = 'http://online.smartsoft.ro:3333/api/vod';

    getResource = async (url) => {
        const res = await fetch(`${this.apiBase}${url}`);
        if(await res.status === 404) {
            setTimeout(async () => await this.getResource(url), 10000)
        };
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`)
        }
        return await res.json();
    };

    getPopular = async () => {
        const res = await this.getResource(`/popular`);
        return res.data.map(this._transformAsset);
    };

    getGenres = async () => {
        const res = await this.getResource(`/category`);
        return res.data.genres;
    }
    getAssetsByGenre = async (id, page) => {
        const res = await this.getResource(`/category/${id}/assets?page=${page}`);
        return res.data.results.map(this._transformAsset);
    }

    getAsset = async (id) => {
        const res = await this.getResource(`/asset/${id}`);
        return res.data;
    }

    _transformAsset = (asset) => {
        return {
            poster: asset.poster_path,
            id: asset.id,
            title: asset.original_title,
            overview: asset.overview,
            imdb: asset.vote_average
        }
    }
}