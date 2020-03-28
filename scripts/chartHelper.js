('use strict');

let currentOffenseCountChart = null;
let currentOffenderPropChart = null;

function drawOffenseCountChart(
  chartCanvasId,
  crimeData,
  labelHeading,
  graphTitle,
  max,
  min,
  labels,
  graphType
) {
  //make sure the 404 image is hidden before painitng the chart
  let $notFoundSpan = $('.' + chartCanvasId + 'NotFound');
  if (!$notFoundSpan.hasClass('hide')) {
    $notFoundSpan.addClass('hide');
  }

  //clear the current chartinstance if any
  if (chartCanvasId.includes('offenderProp')) {
    if (currentOffenderPropChart !== null) currentOffenderPropChart.destroy();
  } else {
    if (currentOffenseCountChart !== null) currentOffenseCountChart.destroy();
  }

  let currentChartInstance = new Chart(document.getElementById(chartCanvasId), {
    type: graphType,
    data: {
      labels: labels, //getLabelsForChart(),
      datasets: [
        {
          data: crimeData,
          label: labelHeading, // 'Monthly Crime rate',
          borderColor: '#3e95cd',
          fill: false
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            display: true,
            ticks: {
              beginAtZero: true,
              max: max,
              min: min
            }
          }
        ]
      },
      responsive: false,
      maintainAspectRatio: true,
      title: {
        display: true,
        text: graphTitle //'Crime Numbers for Alabama'
      }
    }
  });
  if (chartCanvasId.includes('offenderProp')) {
    currentOffenderPropChart = currentChartInstance;
  } else {
    currentOffenseCountChart = currentChartInstance;
  }
}

function noDataFound(canvasId) {
  // let errorSpan = document.createElement('span');
  // //add a 404 data not found message to it
  // let errorPararaph = document.createElement('p');
  // errorPararaph.setAttribute('class', 'title is-2');
  // errorPararaph.textContent = '404 Data Not Found! Please try another query.';
  // //font-awesome image
  // let errorIcon = document.createElement('i');
  // errorIcon.setAttribute('class', 'fas fa-exclamation-triangle')
  // //<i class="fas fa-exclamation-triangle"></i>
  //add to canvas
  if (canvasId.includes('offenderProp')) {
    //hide the graph if there is one. it might be from previous query
    if (currentOffenderPropChart !== null) currentOffenderPropChart.destroy();
    $('.offenderPropChartNotFound').removeClass('hide');
  } else {
    if (currentOffenseCountChart !== null) currentOffenseCountChart.destroy();
    $('.' + canvasId + 'NotFound').removeClass('hide');
  }
}
