import PageTitle from "../../components/page_title/PageTitle";
import Card from "../../components/card/Card";
import Banner from "../../components/banner/Banner";
import { APP_NAME } from "../../constants/config";
import apiClient from "../../api/apiClient";
import { useEffect, useState } from "react";

const cardTitles = [
  'Registered User',
  'Active Users',
  'Site Staff',
  'Total Deposits',
  'Total Withdraw',
  'Total Referral',
  'Total Send',
  'Total Investment',
  'Deposit Bonus',
  'Investment Bonus',
  'Total Ticket'
];

const backgroundColors = [
  '#f44336', // red
  '#e91e63', // pink
  '#9c27b0', // purple
  '#673ab7', // deep purple
  '#3f51b5', // indigo
  '#2196f3', // blue
  '#009688', // teal
  '#4caf50', // green
  '#ff9800', // orange
  '#ff5722', // deep orange
  '#ff5722', // deep orange
  '#795548', // brown
  '#607d8b'  // blue grey
];

function getColor(index) {
  return backgroundColors[index % backgroundColors.length];
}

function getRandomColor(index) {
  // Ensures reproducibility by mapping index to color array
  return backgroundColors[index % backgroundColors.length];
}

export default function Dashboard() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient.get('/api/v1/dashboard')
      .then(response => {
        setCards(response.data?.stats);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load dashboard data');
        setLoading(false);
      });
  }, []);

  
  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;


  return (
    <div className="main-content">
      <PageTitle title={`${APP_NAME}  Dashboard`} />
      <div className="container-fluid">
        <Banner />

        <div className="row">
          {/* {cardTitles.map((title, index) => (
            <Card key={index} title={title} count={10} backgroundColor={getRandomColor(index)} />
          ))} */}

          {cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              count={card.count}
              backgroundColor={getColor(index)}
              actionLink={card.action}
            />
          ))}


        </div>
      </div>
    </div>
  );
}
