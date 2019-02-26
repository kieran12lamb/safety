var description = document.getElementsByName('Description')
var failureMode = document.getElementsByName('FailureMode')
var failureEffect =  document.getElementsByName('FailureEffect')
var severity = document.getElementsByName('Severity')
var occurence = document.getElementsByName('Occurence')
var detectibility = document.getElementsByName('Detectibility')
var count = 0
var labelArray = [0,]
var values = []
var colours = []
var stackedBar
var canvas = document.createElement('canvas');
document.getElementById('chartContainer').appendChild(canvas);

var inputs = [
  document.getElementsByName('Description')[0],
  document.getElementsByName('FailureMode')[0],
  document.getElementsByName('FailureEffect')[0],
  document.getElementsByName('Severity')[0],
  document.getElementsByName('Occurence')[0],
  document.getElementsByName('Detectibility')[0]
]

function addRow(){
  var table = document.getElementById("FMEA_Table");
  var newSize = table.rows.length
  var row = table.insertRow(newSize);
  var cell = row.insertCell(0);
  cell.innerHTML =count
  count = count+1
  labelArray.push(count)
  for(i=0;i<=6;i++){
    var cell = row.insertCell(i+1);
    if (i!= 6) {
      cell.innerHTML =inputs[i].value
    }else{
      cell.innerHTML =inputs[3].value*inputs[4].value*inputs[5].value
      values.push(cell.innerHTML)
      colours.push(getColours(cell.innerHTML))
      console.log(colours);
      stackedBar.destroy()
      drawGraph()
    }
  }
  for(i=0;i<6;i++){
    if (i<3) {
      inputs[i].value=""
    }else{
      inputs[i].value=1
    }
  }

}


function drawGraph(){
   stackedBar = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: labelArray,
          datasets: [{
              label: 'RPN',
              data: values,
              borderWidth: 1,
              backgroundColor: colours,
          }],
        },
        options: {
            scales: {
                xAxes: [{
                    stacked: true,
                    maxBarThickness: 70,
                    scaleLabel: {
                      display: true,
                      labelString: 'Index',
                      fontSize:20
                    }
                }],
                yAxes: [{
                    stacked: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'RPN',
                      fontSize:20
                    }
                }]
            }
        }
    });
}

function getColours(val) {
  if(val<=250){
    return "green"
  }else if(val>250 && val <=750){
    return "orange"
  }else{
    return "red"
  }
}

drawGraph();
