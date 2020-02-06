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

      // ===== diff in months,  from start date to now ==============
      var timeNow = moment(Date.now());
      var diffMonths = timeNow.diff( moment(dateString), 'months', true );
      var howManyMonthsWorked = Math.floor(diffMonths);
      // ============================================================

      // const monthsWorked = $('<td>').text('');
      const monthsWorked = $('<td>').text(howManyMonthsWorked);
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