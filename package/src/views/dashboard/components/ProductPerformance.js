import { useState, useEffect } from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';

const ProductPerformance = () => {
    const [products, setProducts] = useState([]);  // Estado para armazenar os produtos
    const [loading, setLoading] = useState(true);  // Estado de carregamento
    const [error, setError] = useState(null);  // Estado de erro

    // Efetua a requisição para a nova API de produtos
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products'); // Nova URL da sua API
                if (!response.ok) {
                    throw new Error('Erro ao carregar produtos');
                }
                const data = await response.json();
                setProducts(data);  // Atualiza o estado com os produtos recebidos
            } catch (err) {
                setError(err.message);  // Armazena o erro, se houver
            } finally {
                setLoading(false);  // Finaliza o carregamento
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <Typography>Carregando...</Typography>;  // Exibe enquanto carrega
    if (error) return <Typography>Erro: {error}</Typography>;  // Exibe se ocorrer erro

    return (
        <DashboardCard title="Performance de Produtos">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>Id</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>Assigned</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>Name</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>Priority</Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>Budget</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                        {product.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {product.name}
                                            </Typography>
                                            <Typography color="textSecondary" sx={{ fontSize: "13px" }}>
                                                {product.post}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {product.pname}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{ px: "4px", backgroundColor: product.pbg, color: "#fff" }}
                                        size="small"
                                        label={product.priority}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6">${product.budget}k</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default ProductPerformance;
