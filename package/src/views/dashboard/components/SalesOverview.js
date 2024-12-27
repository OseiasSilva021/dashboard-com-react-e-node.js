import React, { useEffect, useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import Typography from '@mui/material/Typography';

const SalesOverview = () => {
    const [month, setMonth] = React.useState('1');
    const [salesData, setSalesData] = useState(null);  // Estado para armazenar os dados
    const [loading, setLoading] = useState(true);      // Estado de carregamento
    const [error, setError] = useState(null);          // Estado de erro

    const handleChange = (event) => {
        setMonth(event.target.value);
    };

    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    // Função para buscar os dados da API
    const fetchSalesData = async (month) => {
        try {
            setLoading(true); // Inicia o carregamento
            setError(null); // Reseta o erro anterior

            // URL da sua API que retorna os dados do gráfico (troque pela sua URL)
            const response = await fetch(`http://localhost:3000/api/sales/${month}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar dados de vendas');
            }
            const data = await response.json();
            
            // Atualiza o estado com os dados recebidos
            setSalesData(data);
        } catch (err) {
            setError(err.message);  // Armazena o erro
        } finally {
            setLoading(false); // Finaliza o carregamento
        }
    };

    // Busca os dados ao carregar e sempre que o mês mudar
    useEffect(() => {
        fetchSalesData(month);
    }, [month]);

    if (loading) return <Typography>Carregando...</Typography>;  // Exibe enquanto carrega
    if (error) return <Typography>Erro: {error}</Typography>;  // Exibe se houver erro

    const optionscolumnchart = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [primary, secondary],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },
        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 4,
        },
        xaxis: {
            categories: salesData ? salesData.dates : [],  // Dados dinâmicos para as datas
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
        },
    };

    const seriescolumnchart = [
        {
            name: 'Ganhos nesse mês',
            data: salesData ? salesData.earnings : [],  // Dados dinâmicos para os ganhos
        },
        {
            name: 'Gastos nesse mês',
            data: salesData ? salesData.expenses : [],  // Dados dinâmicos para as despesas
        },
    ];

    return (
        <DashboardCard title="Vendas Em Geral" action={
            <Select
                labelId="month-dd"
                id="month-dd"
                value={month}
                size="small"
                onChange={handleChange}
            >
                <MenuItem value="1">Março 2023</MenuItem>
                <MenuItem value="2">Abril 2023</MenuItem>
                <MenuItem value="3">Maio 2023</MenuItem>
            </Select>
        }>
            <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="bar"
                height="370px"
            />
        </DashboardCard>
    );
};

export default SalesOverview;
