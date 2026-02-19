import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ComparisonChart = ({ country1, country2 }) => {
  // Sécurité renforcée
  if (!country1?.country || !country2?.country) {
    return <div className="h-full flex items-center justify-center text-gray-400 italic">Données manquantes pour le graphique</div>;
  }

  const data = {
    labels: ['Cas Totaux', 'Actifs', 'Décès'],
    datasets: [
      {
        label: country1.country,
        data: [country1.cases || 0, country1.active || 0, country1.deaths || 0],
        backgroundColor: 'rgba(53, 162, 235, 0.6)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1,
      },
      {
        label: country2.country,
        data: [country2.cases || 0, country2.active || 0, country2.deaths || 0],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return <Bar data={data} options={options} />;
};


export default ComparisonChart;