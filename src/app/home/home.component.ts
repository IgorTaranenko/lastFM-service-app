import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
const API_KEY = "bc68ff8a6f3e8c34ff947136b3b882ac";
const API_GET_URL = `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${API_KEY}&format=json`;

export interface Tracks {
    tracks: Object
}
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})

export class HomeComponent implements OnInit {

    constructor(private http: HttpClient) { }
    tracks;
    isLoading: boolean = false;

    ngOnInit(): void {
        this.http.get<Tracks>(API_GET_URL).subscribe(data => {
            setTimeout(() => {
                this.tracks = data;
                this.tracks = this.tracks.tracks.track;
                let count = 0;
                for (let i of this.tracks) {
                    i.imageLink = i.image[0]["#text"];
                }
                console.log(this.tracks);
            }, 1000);
        });
    }

}
