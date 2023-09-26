const canvas = document.getElementById('myChart');
const pieChartCanvas = document.getElementById('pieChart');
const lineChartCanvas = document.getElementById('lineChart');
const multiLineCanvas = document.getElementById('multiLine');
const barColors = ["#0074E4", "#00A15F","#FFA500","#FF007F","brown"]
const data = {
    labels: months.split(','),
    datasets: [
        {
            label: "Sales for the year 2022",
            data: sales.split(','),
            backgroundColor:  '#00A15F',
        }
    ]
}

const config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

const barChartObject = new Chart(
    canvas, 
    config
)

const pieColors = [
  "#b91d47",
  "#00aba9",
  "#2b5797",
  "#e8c3b9",
  "#1e7145"
];
configuration=  {
    type: "pie",
    data: {
      labels: names.split(','),
      datasets: [{
        backgroundColor: pieColors,
        data: salary.split(',')
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      title: {
        display: true,
        text: "Employee Salaries per month in 2022"
      }
    }
  }
}
const pieObject = new Chart(pieChartCanvas, configuration);


const lineConfiguration = {
    type: "line",
    data: {
      labels: months.split(','),
      datasets: [{
        label: 'Expenses',
        backgroundColor:"rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        pointStyle: 'circle',
        pointRadius: 10,
        pointHoverRadius: 15,
        data: expenses.split(',')
      }]
    },
    options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Expenses for the year 2022",
          }
        }
      }
  }
new Chart(lineChartCanvas, lineConfiguration);



const multiLineConfiguration = {
    type: "line",
    data: {
      labels: months.split(','),
      datasets: [{ 
        label: 'Sales',
        data: sales.split(','),
        borderColor: "green",
        // fill: false,
        yAxisID: 'y',
      }, { 
        label:'expenses',
        data: expenses.split(','),
        borderColor: "blue",
        // fill: false,
        yAxisID: 'y2',
      }]
    },
    options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: 'Sales vs Expenses'
          }
        },
        scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
            },
          }
        },
  }
const multiLineObject = new Chart(multiLineCanvas, multiLineConfiguration);
  
  