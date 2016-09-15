var unanet = require('unanet-client');

var opts = {
  userName: 'ggodoy',
  password: 'ggo0601',
  url: 'https://hugellc.unanet.biz/hugellc/action/time/view?timesheetkey=247501'
};

return unanet.getActiveTimesheets(opts, function(err, timesheets) {
  if (err) {
    return console.error('could not get timesheets', err);
  }
  console.log(timesheets);

  return unanet.getTimesheet(timesheets[0].id, opts, function(err, timesheet) {
    if (err) {
      return console.error('could not get timesheet', err);
    }
    return console.log(JSON.stringify(timesheet, null, 2));
  });
});