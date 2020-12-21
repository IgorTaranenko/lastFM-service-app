import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, delay } from 'rxjs/operators';

const API_KEY = "bc68ff8a6f3e8c34ff947136b3b882ac";
const API_GET_URL = `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&format=json`;

export interface Tracks {
    tracks: {
        track: Array<Object>
    }
}
export interface Track {
    name: string,
    artist: {name: string, url: string},
    image: Array<Object>,
}
export interface SearchedTracks {
    results: {
        trackmatches: {
            track: Array<Object>
        }
    }
}
export interface SearchedTrack {
    name: string,
    artist: string
}

@Injectable({
    providedIn: 'root'
})

export class APIService {

    constructor(private http: HttpClient) {}

    getTracks() {
        return this.http.get<Tracks>(API_GET_URL)
            .pipe(
                delay(600),
                map((data) => {
                    return data.tracks.track.map((item:Track) => {
                        return {
                            name: item.name,
                            artist: item.artist.name,
                            img: item.image[0]["#text"],
                            link: item.artist.url
                        }
                    })
                })    
            );
    }

    searchTrack(trackName: string, artistName?: string) {
        let API_URL: string = "";
        
        if (artistName) {
            API_URL = `http://ws.audioscrobbler.com/2.0/?method=track.search&artist=${artistName}&track=${trackName}&format=json`;
        } else {
            API_URL = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${trackName}&format=json`;
        }
        return this.http.get<SearchedTracks>(API_URL)
            .pipe(
                delay(600),
                map((data) => {
                    return data.results.trackmatches.track.map((item: SearchedTrack) => {
                        return {
                            name: item.name,
                            artist: item.artist
                        }
                    });
                })
            );
    }
}
