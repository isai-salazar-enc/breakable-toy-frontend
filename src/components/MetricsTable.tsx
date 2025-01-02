import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { fetchMetrics } from '../services/productService';

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

const MetricsTable: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricsProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // fetch metrics
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
  }, []);

  if (loading) {
    return <Typography variant="h6" sx={{ marginTop: 2 }}>Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error" sx={{ marginTop: 2 }}>{error}</Typography>;
  }

  if (!metrics) {
    return <Typography variant="h6" sx={{ marginTop: 2 }}>Metrics not found</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ marginY: 3 }}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell sx={{textAlign: 'center'}}><b>Total products</b></TableCell>
            <TableCell sx={{textAlign: 'center'}}><b>Total value</b></TableCell>
            <TableCell sx={{textAlign: 'center'}}><b>Average price</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Metrics By Category */}
          {Object.entries(metrics.byCategory).map(([category, data]) => (
            <React.Fragment key={category}>
              <TableRow >
                <TableCell sx={{textAlign: 'center'}}><b>{category}</b></TableCell>
                <TableCell sx={{textAlign: 'center'}}>{data.totalProducts}</TableCell>
                <TableCell sx={{textAlign: 'center'}}>{data.totalValue.toFixed(2)}</TableCell>
                <TableCell sx={{textAlign: 'center'}}>{data.averagePrice.toFixed(2)}</TableCell>
              </TableRow>
            </React.Fragment>
          ))}
          {/* Overall Metrics */}
          <TableRow>
            <TableCell sx={{textAlign: 'center'}}><b>Overall</b></TableCell>
            <TableCell sx={{textAlign: 'center'}}>{metrics.overall.totalProducts}</TableCell>
            <TableCell sx={{textAlign: 'center'}}>{metrics.overall.totalValue.toFixed(2)}</TableCell>
            <TableCell sx={{textAlign: 'center'}}>{metrics.overall.averagePrice.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MetricsTable;
