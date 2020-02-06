$(document).ready(function () {

  var config = {
      apiKey: "AIzaSyDmz6kNuBTasHmGbLU8hYFEhRxosir2CuY",
      authDomain: "timesheet-example-d6c3d.firebaseio.com",
      databaseURL: "https://timesheet-example-d6c3d.firebaseio.com/"
  };

  firebase.initializeApp(config);
  var database = firebase.database();






  // ===================================================
  // has a child been added to DB?
  // ===================================================
  database.ref().on('child_added', function(child_snapshot) {
      var employeeData = child_snapshot.val();

      const row = $('<tr>');

      const name = $('<td>').text(employeeData.name);
      const role = $('<td>').text(employeeData.role);
      var dateString = moment.unix(employeeData.startDate).format('MM/DD/YYYY'); // input: 1273816800, output: 05/14/2010
      const startDate = $('<td>').text( dateString );

      //TODO: how many months have they worked
      // now() - startDate
      // find diff, convert that to months

      var thing = moment(dateString).year();  // prints year yay!
      console.log('thing: ', thing);
      
      //====== diff of time ============
      var startD = moment('01/01/2019');
      var a = startD;
      console.log('a: ', a);
      var b = moment();
      var c = a.diff(b); // 86400000
      c = b.diff(a); // makes it positive
      // FIXME: here is printing a number like this: -34634399511
      console.log('adiffb: ', c );
      console.log('formated: ', moment.unix(c).format('MM/DD/YYYY'));


      //========= diff in months =======================
      console.log('here is 3 month diffs');
      // 31 Oct 2013 - 1 Feb 2014
      console.log( moment([2014, 1, 1]).diff(moment([2013, 9, 31]), 'months', true) );
      // var t1 = moment(dateString).diff(Date.now(), 'months', true);
      var t2 = moment(Date.now());
      var t1 = moment(dateString).diff(Date.now(), 'months', true);
      var t11 = t2.diff(moment(dateString), 'months', true);
      console.log('now & startDate: ', t2.format('MM/DD/YYYY'), dateString);
      console.log('months worked: ', t11);
      var numMonthsWorked = Math.floor(t11);
      console.log('months worked: ', t11);
      console.log('months worked floor: ', numMonthsWorked);

      
      // 2.983050847457627

      // 31 Oct 2013 - 31 Jan 2014
      console.log( moment([2014, 0, 31]).diff(moment([2013, 9, 31]), 'months', true) );
      //3

      // 31 Oct 2013 - 30 Jan 2014
      console.log( moment([2014, 0, 30]).diff(moment([2013, 9, 31]), 'months', true) );
      //2.967741935483871


      const monthsWorked = $('<td>').text('');
      const monthlyRate = $('<td>').text(employeeData.monthlyRate);
      const totalBilled = $('<td>').text('');

      row
          .append(name)
          .append(role)
          .append(startDate)
          .append(monthsWorked)
          .append(monthlyRate)
          .append(totalBilled);

      $('tbody').append(row);

  });

  $('button[type="submit"]').on('click', function (event) {
      event.preventDefault();

      var name = $('#employee-name').val();
      var role = $('#role').val();
      var startDate = $('#start-date').val();
      var monthlyRate = $('#monthly-rate').val();

      database.ref().push({
          name: name,
          role: role,
          startDate: moment(startDate, 'MM/DD/YYYY').format('X'),
          monthlyRate: monthlyRate
      });

  });

});