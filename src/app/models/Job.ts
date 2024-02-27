import {IncomingJob} from "../interfaces/IncomingJob";

export class Job {
  by: string;
  id: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
  parsedTitle: string;
  text: string;
  parsedDate: Date;

  constructor(jobObject: IncomingJob) {
    this.by = jobObject?.by;
    this.id = jobObject?.id;
    this.score = jobObject?.score;
    this.time = jobObject?.time;
    this.title = jobObject?.title;
    this.type = jobObject?.type;
    this.url = jobObject?.url;

    const isPosition = this.title.toLowerCase().indexOf('is');
    this.parsedTitle = this.title.substring(0, isPosition -1);
    this.text = this.title.substring(isPosition, this.title.length);
    this.parsedDate = new Date(this.time * 1000);
  }
}
