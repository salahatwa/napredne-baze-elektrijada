import { IPost } from "./IPost";
import { Moment } from "moment";

export interface IEvent extends IPost {
  startsAt: Moment;
  startTime: {
    hour: string;
    minute: string;
    second: string;
  };
  endsAt: Moment;
  endTime: {
    hour: string;
    minute: string;
    second: string;
  };
  // startsAt: Date
  // endsAt: Date
}
