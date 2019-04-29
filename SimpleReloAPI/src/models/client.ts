import { Document, model } from 'mongoose';
import TimeTrackerSchema from '../schemas/client';


export type TimeTrackerModel = Document & {
  resourceName: { type: String, required: true },
    module: String,
    build:Number,
    tfsId:String,
    workType:String,
    activity:String,
    hours:Number,
    comments:String,
    date:Date,
    MID:String,
    branch:String
};

const TimeTracker = model('tracker', TimeTrackerSchema);

export default TimeTracker;
