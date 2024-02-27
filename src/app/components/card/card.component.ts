import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Job} from "../../models/Job";
import {IncomingJob} from "../../interfaces/IncomingJob";
import {NgIf} from "@angular/common";
import {LoadingComponent} from "../loading/loading.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [HttpClientModule, NgIf, LoadingComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{

  @Input() jobNumber: number = 0;
  jobInfo: Job | null = null;
  loading = false;
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    if (!this.jobNumber)
      return;
    this.getSingleJob();
  }

  getDate(){
    const jobMonth = (this.jobInfo?.parsedDate.getMonth() || new Date().getMonth()) + 1
    const jobMonthPlusLeadingZero = jobMonth < 10 ? `0${jobMonth}` : jobMonth;

    const jobDay = (this.jobInfo?.parsedDate.getDate() || new Date().getDate());
    const jobDayPlusLeadingZero = jobDay < 10 ? `0${jobDay}` : jobDay;

    return `${jobMonthPlusLeadingZero}/${jobDayPlusLeadingZero}/${this.jobInfo?.parsedDate.getFullYear()}`;
  }

  getSingleJob(){
    this.loading = true;
    const jobUrl = `https://hacker-news.firebaseio.com/v0/item/${this.jobNumber}.json`;
    this.http.get<IncomingJob>(jobUrl, {responseType: "json"})
      .subscribe((response: IncomingJob) => {
        this.jobInfo = new Job(response);
        this.loading = false;
      })
  }

  openJobUrl(){
    const url = this.jobInfo?.url || `https://news.ycombinator.com/item?id=${this.jobInfo?.id}`;
    window.open(url, "_blank");
  }

}
