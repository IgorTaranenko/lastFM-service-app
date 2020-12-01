import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const API_KEY = "bc68ff8a6f3e8c34ff947136b3b882ac";
interface SearchedTrack {
    results: { trackmatches: {track: Array<Object>} },
}
@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
    constructor(private http: HttpClient) { }
    searchForm: FormGroup;
    searchedTracks: Array<Object> = [];
    isLoading: boolean = false;
    notFound: boolean = false;

    ngOnInit(): void {
        this.searchForm = new FormGroup({
            trackName: new FormControl('', [Validators.required, Validators.minLength(2)]),
            artistName: new FormControl('')
        });
    }
    searchTrack() {
        const trackName: string = this.searchForm.value.trackName;
        let API_URL: string = "";

        this.searchedTracks = [];
        this.isLoading = true;

        if (this.searchForm.value.artistName) {
            const artistName = this.searchForm.value.artistName;
            API_URL = `http://ws.audioscrobbler.com/2.0/?method=track.search&artist=${artistName}&track=${trackName}&api_key=${API_KEY}&format=json`;
        } else {
            API_URL = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${trackName}&api_key=${API_KEY}&format=json`;
        }
        this.http.get<SearchedTrack>(API_URL).subscribe(data => {
            setTimeout(() => {
                this.isLoading = false;
                this.searchedTracks = data.results.trackmatches.track;
                console.log(this.searchedTracks);
            },500);
        });
    }

}
