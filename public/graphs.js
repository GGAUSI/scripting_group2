const canvas = document.getElementById('myChart');
const pieChartCanvas = document.getElementById('pieChart');
const lineChartCanvas = document.getElementById('lineChart');
const multiLineCanvas = document.getElementById('multiLine');
const barColors = ["#0074E4", "#00A15F","#FFA500","#FF007F","brown"]



document.getElementById('downloadChart').addEventListener('click', function () {
  const downloadLink = document.createElement('a');
  downloadLink.href = canvas.toDataURL('image/png');
  downloadLink.download = 'chart.png'; 
  downloadLink.click();
});


document.getElementById('printChart').addEventListener('click', function () {
 
  window.print();
});




const data = {
    labels: diseaseData.split(','),
    datasets: [
        {
            label: "Number of patients per disease",
            data: patients.split(','),
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
              beginAtZero: true,
          },
          x: {
              ticks: {
                  autoSkip: false, 
                  maxRotation: 45, 
                  minRotation: 0, 
              },
          },
      },
  },
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
      labels: labels.split(','),
      datasets: [{
        backgroundColor: pieColors,
        data: patients_sex.split(',')
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
        text: "Number of Males vs Females admitted"
      }
    }
  }
}
const pieObject = new Chart(pieChartCanvas, configuration);


