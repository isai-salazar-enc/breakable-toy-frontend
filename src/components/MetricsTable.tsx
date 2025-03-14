import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import MetricsRow from './MetricsRow';
import { useMetrics } from '../hooks/useMetrics';

interface MetricsTableProps {
  productsSize: number;
}

const MetricsTable: React.FC<MetricsTableProps> = ({productsSize}) => {
  const { metrics, loading, error } = useMetrics(productsSize);

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
            <MetricsRow key={category} label={category} data={data} />
          ))}
          {/* Overall Metrics */}
          <MetricsRow key='Overall' label='Overall' data={metrics.overall} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MetricsTable;
