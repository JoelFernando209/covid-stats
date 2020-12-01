import { setFetch } from '../helpers/asyncHelpers.js';

export function drawBasic(columnName, target, arr) {
  return () => {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'X');
    data.addColumn('number', columnName);
  
    data.addRows(arr);
  
    var options = {
      hAxis: {
        title: 'Time'
      },
      vAxis: {
        title: columnName
      }
    };
  
    var chart = new google.visualization.LineChart(target);
  
    chart.draw(data, options);
  }
  
}

export const formatDate = (date) => {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2)
      month = '0' + month;
  if (day.length < 2)
      day = '0' + day;

  return [year, month, day].join('-');
}

export const getDates = (startDate, stopDate) => {
  const dateArray = [];
  let currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(formatDate(new Date (currentDate)));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

export const filterObj = (obj, target) => {
  const arrRes = [];
  
  obj.forEach(el => {
    arrRes.push([el.date, Math.abs(el[target])])
  })
  
  return arrRes;
}

export const fetchInfo = (arrTarget) => {
  const infoCovidEachDay = [];
  let itemsProcessed = 0;
  
  arrTarget.forEach(el => {
    let data = setFetch(`https://covid-19-statistics.p.rapidapi.com/reports/total?date=${el}`)
    .then(obj => data = obj)
    .then(() => infoCovidEachDay.push(data))
  })
  
  return infoCovidEachDay;
}