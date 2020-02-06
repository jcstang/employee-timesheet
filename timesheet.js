$(document).ready(function () {

  var config = {
      apiKey: "AIzaSyDmz6kNuBTasHmGbLU8hYFEhRxosir2CuY",
      authDomain: "timesheet-example-d6c3d.firebaseio.com",
      databaseURL: "https://timesheet-example-d6c3d.firebaseio.com/"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var database = firebase.database();

  var someDate = "02/23/1999";
  var someFormat = "MM/DD/YYYY";
  var convertedDate = moment(someDate, someFormat);
  console.log(convertedDate.format("MM/DD/YY"));

  database.ref().on('child_added', function(child_snapshot) {
      var employeeData = child_snapshot.val();

      const row = $('<tr>');

      const name = $('<td>').text(employeeData.name);
      const role = $('<td>').text(employeeData.role);
      const startDate = $('<td>').text( moment(employeeData.startDate, 'MM/DD/YYYY').format('X') );
      console.log('date: ', employeeData.startDate);
      console.log('dateChanged: ' + moment(employeeData.startDate, 'MM/DD/YYYY').format('MM/DD/YYYY') );
      console.log('hello: ', moment(employeeData.startDate, 'MM/DD/YYYY').format('X'));


      var someDate = "02/23/1999";
      var someFormat = "MM/DD/YYYY";
      var convertedDate = moment(employeeData.startDate, someFormat);
      var dateString = moment.unix(employeeData.startDate).format("MM/DD/YYYY");

    var dateString = moment.unix(employeeData.startDate).format('MM/DD/YYYY'); // input: 1273816800, output: 05/14/2010

      console.log('stuff', dateString);
      console.log(convertedDate);


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