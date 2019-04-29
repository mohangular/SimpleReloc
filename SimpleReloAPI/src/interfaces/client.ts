import Benefit from './benefit';

export default class {
  resourceName: { type: String, required: true };
  module: String;
  build:Number;
  tfsID:String;
  workType:String;
  activity:String;
  hours:Number;
  comments:String;
  date:Date;
  MID:String;
  branch:String;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

