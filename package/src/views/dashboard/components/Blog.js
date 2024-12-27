import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CardContent, Typography, Grid, Rating, Tooltip, Fab } from '@mui/material';
import { Stack } from '@mui/system';
import { IconBasket } from '@tabler/icons-react';
import BlankCard from '../../../components/shared/BlankCard';

const Blog = () => {
    // Estado para armazenar os produtos
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Função para buscar os dados da API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
            const response = await fetch('http://localhost:3000/products');
            //  // Substitua pela sua URL de API
                if (!response.ok) {
                    throw new Error('Erro ao buscar os produtos.');
                }
                const data = await response.json()
                
                setProducts(data);
                 // Certifique-se de que o formato da resposta seja compatível
            } catch (error) {
                
                console.error('Erro:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Indicador de carregamento
    if (loading) {
        return <Typography>Carregando produtos...</Typography>;
    }

    return (
        <Grid container spacing={3}>
            {products.map((product, index) => (
            
                <Grid item sm={12} md={4} lg={3} key={index}>
                    <BlankCard>
                        <Typography component={Link} to="/">
                            <img src={product.photo} alt={product.title} width="100%" />
                        </Typography>
                        <Tooltip title="Add To Cart">
                            <Fab
                                size="small"
                                color="primary"
                                sx={{ bottom: '75px', right: '15px', position: 'absolute' }}
                            >
                                <IconBasket size="16" />
                            </Fab>
                        </Tooltip>
                        <CardContent sx={{ p: 3, pt: 2 }}>
                            <Typography variant="h6">{product.title}</Typography>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                                <Stack direction="row" alignItems="center">
                                    <Typography variant="h6">${product.price}</Typography>
                                    <Typography color="textSecondary" ml={1} sx={{ textDecoration: 'line-through' }}>
                                        ${product.salesPrice}
                                    </Typography>
                                </Stack>
                                <Rating name="read-only" size="small" value={product.rating} readOnly />
                            </Stack>
                        </CardContent>
                    </BlankCard>
                </Grid>
            ))}
        </Grid>
    );
};

export default Blog;
