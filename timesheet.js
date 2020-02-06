$(document).ready(function () {

  var config = {
      apiKey: "AIzaSyA7FPu1EJ9QD3xYSeMAcEwvb1KizKQIBcs",
      authDomain: "timesheet-11306.firebaseio.com",
      databaseURL: "https://timesheet-11306.firebaseio.com/"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var database = firebase.database();

  database.ref().on('child_added', function(child_snapshot) {
      var employeeData = child_snapshot.val();

      const row = $('<tr>');

      const name = $('<td>').text(employeeData.name);
      const role = $('<td>').text(employeeData.role);
      const startDate = $('<td>').text(employeeData.startDate);
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