import { TimeTrackerModel } from './../models/client';
import { Schema } from 'mongoose';






const TimeTrackerSchema = new Schema(
  {
    resourceName: String,
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
  }
);

export default TimeTrackerSchema;
