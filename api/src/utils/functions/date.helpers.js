import moment from 'moment';

export const formatToDateTime = (date) => {
  if (!date) {
    return null;
  }

  return moment(date).format('YYYY-MM-DD HH:mm');
};

export const addDays = (date, days) => {
  return moment(date).add(days, 'days').toDate();
};
