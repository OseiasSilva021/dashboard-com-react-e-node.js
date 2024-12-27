import  { useState, useEffect } from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Link, Typography } from '@mui/material';

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);  // Estado para armazenar as transações
  const [loading, setLoading] = useState(true);  // Estado para controle de carregamento
  const [error, setError] = useState(null);  // Estado para erros

  // Efetua a requisição para a API ao montar o componente
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:3000/transactions');  // URL da sua API
        if (!response.ok) {
          throw new Error('Erro ao carregar transações');
        }
        const data = await response.json();
        setTransactions(data);  // Armazenando os dados no estado
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);  // Finaliza o carregamento
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <Typography>Carregando...</Typography>;  // Exibe o texto enquanto carrega
  if (error) return <Typography>Erro: {error}</Typography>;  // Exibe erro caso aconteça

  return (
    <DashboardCard title="Transações Recentes">
      <Timeline
        className="theme-timeline"
        sx={{
          p: 0,
          mb: '-40px',
          '& .MuiTimelineConnector-root': {
            width: '1px',
            backgroundColor: '#efefef'
          },
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.5,
            paddingLeft: 0,
          },
        }}
      >
        {transactions.map((transaction, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent>{transaction.time}</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color={transaction.type === 'payment' ? 'success' : 'primary'} variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              {transaction.link ? (
                <Typography fontWeight="600">
                  <Link href={transaction.link} underline="none">
                    {transaction.description}
                  </Link>
                </Typography>
              ) : (
                <Typography>{transaction.description}</Typography>
              )}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </DashboardCard>
  );
};

export default RecentTransactions;
