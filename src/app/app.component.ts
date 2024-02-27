import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from "./components/header/header.component";
import {LoadmorebuttonComponent} from "./components/loadmorebutton/loadmorebutton.component";
import {NgForOf, NgIf} from "@angular/common";
import {NgxSpinnerModule} from "ngx-spinner";
import {LoadingComponent} from "./components/loading/loading.component";
import {CardComponent} from "./components/card/card.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, HeaderComponent, LoadmorebuttonComponent, NgIf, NgxSpinnerModule, LoadingComponent, CardComponent, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  jobList: number[] = [];
  displayedCards: number[] = [];
  loading = false;
  showLoadMoreButton = true;

  additionalCardAmount = 6;

  jobsUrl = "https://hacker-news.firebaseio.com/v0/jobstories.json"
  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    this.fetchJobList();
  }

  fetchJobList(){
    this.http.get<number[]>(this.jobsUrl, {responseType: "json"})
      .subscribe((response: number[]) => {
        this.jobList = response;
        this.loadInitialCards();
      })
  }

  loadInitialCards(){
    this.displayedCards = this.jobList.slice(0,9);
  }

  loadMoreCards(){
    this.loading = true;
    setTimeout(() => {
      const moreCards = this.jobList.slice(this.displayedCards.length, this.displayedCards.length + this.additionalCardAmount)
      if (this.jobList.length === this.displayedCards.length) {
        this.showLoadMoreButton = false;
      }
      this.displayedCards = [...this.displayedCards, ...moreCards];
      this.loading = false;
    }, 2000);
  }

}
