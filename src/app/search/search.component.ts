import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APIService, SearchedTrack } from '../api.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.less']
})

export class SearchComponent implements OnInit {
    constructor(private _apiService: APIService) { }
    searchForm: FormGroup;
    searchedTracks: Array<SearchedTrack> = [];
    isLoading: boolean = false;
    notFound: boolean = false;

    ngOnInit(): void {
        this.searchForm = new FormGroup({
            trackName: new FormControl('', [Validators.required, Validators.minLength(2)]),
            artistName: new FormControl('')
        });
    }
    searchTrack() {
        this.isLoading = true;
        this.searchedTracks = [];
        if (this.searchForm.value.artistName) {
            this._apiService.searchTrack(this.searchForm.value.trackName, this.searchForm.value.artistName);
        } else {
            this._apiService.searchTrack(this.searchForm.value.trackName).subscribe(data => {
                this.searchedTracks = data;
                this.isLoading = false;
            });
        }
    }

}
