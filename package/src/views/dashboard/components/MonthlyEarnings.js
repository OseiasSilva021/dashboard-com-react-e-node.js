import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';

const MonthlyEarnings = () => {
  const [data, setData] = useState({
    earnings: 0,
    increase: 0,
    series: [],
  });
  const [loading, setLoading] = useState(true);  // Estado de carregamento
  const [error, setError] = useState(null);      // Estado de erro

  // Buscando os dados da API
  useEffect(() => {
    fetch('http://localhost:3000/api/monthly-earnings')  // Substitua pela URL da sua API
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar dados da API');
        }
        return response.json();
      })
      .then((data) => {
        setData({
          earnings: data.earnings,
          increase: data.increase,
          series: data.series,
        });
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';

  // Configurações do gráfico
  const optionscolumnchart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };

  // Exibindo carregamento ou erro se necessário
  if (loading) {
    return (
      <DashboardCard title="Monthly Earnings">
        <Stack justifyContent="center" alignItems="center" spacing={2}>
          <Typography variant="h5">Carregando...</Typography>
        </Stack>
      </DashboardCard>
    );
  }

  if (error) {
    return (
      <DashboardCard title="Ganhos Mensais">
        <Stack justifyContent="center" alignItems="center" spacing={2}>
          <Typography variant="h5" color="error">{`Erro: ${error}`}</Typography>
        </Stack>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard
      title="Ganhos Mensais"
      action={
        <Fab color="secondary" size="medium" sx={{color: '#ffffff'}}>
          <IconCurrencyDollar width={24} />
        </Fab>
      }
      footer={
        <Chart options={optionscolumnchart} series={[{ name: '', color: secondary, data: data.series }]} type="area" height="60px" />
      }
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="-20px">
          ${data.earnings}
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
            <IconArrowDownRight width={20} color="#FA896B" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            {data.increase}%
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            last year
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default MonthlyEarnings;
