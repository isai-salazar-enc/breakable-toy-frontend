import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { fetchMetrics } from '../services/productService';
import MetricsRow from './MetricsRow';

interface MetricsProps {
  overall: {
    totalProducts: number;
    totalValue: number;
    averagePrice: number;
  };
  byCategory: Record<string, {
    totalProducts: number;
    totalValue: number;
    averagePrice: number;
  }>;
}

interface MetricsTableProps {
  productsSize: number;
}

const MetricsTable: React.FC<MetricsTableProps> = ({productsSize}) => {
  const [metrics, setMetrics] = useState<MetricsProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // -- fetch metrics --
  useEffect(() => {
    const getMetrics = async () => {
      try {
        const data = await fetchMetrics();
        setMetrics(data);
      } catch (err) {
        setError('Error while fetching metrics');
      } finally {
        setLoading(false);
      }
    };

    getMetrics();
  }, [productsSize]);

  // -- Handle render when loading, error or empty metrics --
  if (loading) { return <Typography variant="h6" sx={{ marginTop: 2 }}>Loading...</Typography>;}
  if (error) { return <Typography variant="h6" color="error" sx={{ marginTop: 2 }}>{error}</Typography>;}
  if (!metrics) { return <Typography variant="h6" sx={{ marginTop: 2 }}>Metrics not found</Typography>;}

  return (
    <TableContainer component={Paper} sx={{ marginY: 3 }}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell><b>Total products</b></TableCell>
            <TableCell><b>Total value</b></TableCell>
            <TableCell><b>Average price</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Metrics By Category */}
          {Object.entries(metrics.byCategory).map(([category, data]) => (
            <MetricsRow key={category} category={category} {...data} />
          ))}
          {/* Overall Metrics */}
          <MetricsRow key='Overall' category='Overall' {...metrics.overall} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MetricsTable;
