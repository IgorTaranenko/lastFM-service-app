import { Component, OnInit } from '@angular/core';
import { APIService, Track, Tracks } from '../api.service';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})

export class HomeComponent implements OnInit {

    constructor(private _apiService: APIService) { }
    tracks;
    isLoading: boolean = false;

    ngOnInit(): void {
        this._apiService.getTracks().subscribe(data => {
            console.log(data);
            this.tracks = data;
        })
    }

}
