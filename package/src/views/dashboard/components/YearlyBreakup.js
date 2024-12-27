import  { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';

const YearlyBreakup = () => {
  const [data, setData] = useState({
    total: 0,
    increase: 0,
    lastYearData: [],
    series: [],
  });

  // Buscando os dados da API usando fetch
  useEffect(() => {
    // Substitua pela URL da sua API
    fetch('http://localhost:3000/api/breakup')
      .then((response) => {
        // Verificando se a resposta é válida (status 200)
        if (!response.ok) {
          throw new Error('Erro ao buscar dados da API');
        }
        return response.json(); // Convertendo a resposta para JSON
      })
      .then((data) => {
        // Supondo que a API retorna um objeto com as propriedades abaixo
        setData({
          total: data.total, // Total de vendas ou valor desejado
          increase: data.increase, // Percentual de aumento
          lastYearData: data.lastYearData, // Dados do ano passado (2022, 2023, etc)
          series: data.series, // Dados para o gráfico
        });
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API:", error);
      });
  }, []);

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;

  // Configurações do gráfico
  const optionscolumnchart = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, '#F9F9FD'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };

  return (
    <DashboardCard title="Breakup Anual">
      <Grid container spacing={3}>
        {/* coluna */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            ${data.total}
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
              <IconArrowUpLeft width={20} color="#39B69A" />
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600">
              {data.increase}%
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              last year
            </Typography>
          </Stack>
          <Stack spacing={3} mt={5} direction="row">
            {data.lastYearData.map((year, index) => (
              <Stack direction="row" spacing={1} alignItems="center" key={index}>
                <Avatar
                  sx={{
                    width: 9,
                    height: 9,
                    bgcolor: index === 0 ? primary : primarylight,
                    svg: { display: 'none' },
                  }}
                ></Avatar>
                <Typography variant="subtitle2" color="textSecondary">
                  {year}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Grid>
        {/* coluna */}
        <Grid item xs={5} sm={5}>
          <Chart
            options={optionscolumnchart}
            series={data.series}
            type="donut"
            height="150px"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default YearlyBreakup;
