function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: new Array(),
    timeOutEvents: new Array(),
  };
}

function createEmployeeRecords(array) {
  return array.map((employee) => createEmployeeRecord(employee));
}

function createTimeInEvent(employeeRecord, dateTime) {
  const [date, hour] = dateTime.split(" ");
  const timeInEvent = {
    type: "TimeIn",
    date: date,
    hour: parseInt(hour, 10),
  };
  employeeRecord.timeInEvents.push(timeInEvent);
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTime) {
  const [date, hour] = dateTime.split(" ");
  const timeOutEvent = {
    type: "TimeOut",
    date: date,
    hour: parseInt(hour, 10),
  };
  employeeRecord.timeOutEvents.push(timeOutEvent);
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateTime) {
  const timeOutHour = employeeRecord.timeOutEvents.filter(
    (event) => event.date === dateTime
  )[0].hour;
  const timeinHour = employeeRecord.timeInEvents.filter(
    (event) => event.date === dateTime
  )[0].hour;
  return (timeOutHour - timeinHour) / 100;
}

function wagesEarnedOnDate(employeeRecord, dateTime) {
  return (
    hoursWorkedOnDate(employeeRecord, dateTime) * employeeRecord.payPerHour
  );
}

function allWagesFor(employeeRecord) {
  const allDates = employeeRecord.timeInEvents.map((event) => event.date);
  const totalWages = allDates.reduce((total, date) => {
    return total + wagesEarnedOnDate(employeeRecord, date);
  }, 0);
  return totalWages;
}

function calculatePayroll(employees) {
  const payroll = employees.reduce(
    (total, employee) => total + allWagesFor(employee),
    0
  );
  return payroll;
}
