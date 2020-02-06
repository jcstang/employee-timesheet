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
      // const startDate = $('<td>').text( moment(employeeData.startDate, 'MM/DD/YYYY').format('X') );
      const startDate = $('<td>').text( moment.unix(employeeData.startDate).format("MM/DD/YYYY") );

      // var dateString = moment.unix(employeeData.startDate).format("MM/DD/YYYY");
      var dateString = moment.unix(employeeData.startDate).format('MM/DD/YYYY'); // input: 1273816800, output: 05/14/2010

      console.log('dateString: ', dateString);

      //TODO: how many months have they worked
      // now() - startDate
      // var a = moment(employeeData.startDate);
      var startD = moment(dateString);
      var now = moment();
      // var b = moment([2007, 0, 29]);
      // a.to(b) // "in a day"
      console.log('how much time: ', startD.to(now));
      // console.log(a.to(now));


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