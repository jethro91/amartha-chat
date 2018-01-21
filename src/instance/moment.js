import * as momentLib from 'moment';

let instanceMoment;

const createInstanceMoment = function () {
  if (!instanceMoment) {
    instanceMoment = momentLib;
  }
  return instanceMoment;
};

const moment = createInstanceMoment();

export default moment;
