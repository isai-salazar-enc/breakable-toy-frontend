import { ProductWithCategoryDTO } from '../types/ProductWithCategoryDTO';
import { DataGrid, GridCellParams, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import MetricsTable from './MetricsTable';

interface ProductTableProps{
  rows: ProductWithCategoryDTO[];
}

const ProductTable: React.FC<ProductTableProps> = ({rows}) => {

  const columns: GridColDef[] = [
    { field: 'category', headerName: 'Category'},
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'unitPrice', headerName: 'Price', type: 'number', width: 100 },
    { field: 'expirationDate',headerName: 'Expiration date', type: 'string' },
    { field: 'stock',
        headerName: 'Stock', 
        type: 'number',
        // Manage stock color
        cellClassName: (params: GridCellParams) => {
          const stock = params.value as number;
          if (stock < 5) return 'cell-low-stock';
          if (stock < 10) return 'cell-warning-stock';
          return '';
        },
    },
    {
      field: 'actions',
      sortable: false,
      headerName: 'Actions',
      renderCell: () => (
        'Edit/Delete'
      ),
    },
  ];

    const manageRowColors = (params: GridRowParams) => {
      const expirationDate = new Date(params.row.expirationDate);
      const today = new Date();
      const oneWeekLater = new Date(today);
      oneWeekLater.setDate(today.getDate() + 7);
      const twoWeeksLater = new Date(today);
      twoWeeksLater.setDate(today.getDate() + 14);
    
      let rowClass = '';
      if (params.row.stock === 0) {
        rowClass += ' row-out-of-stock';
      }

      // Apply expiration-related color if there's an expiration date
      if (params.row.expirationDate) {
        if (expirationDate < oneWeekLater) {
          rowClass += ' row-expiring-sooner';
        } else if (expirationDate < twoWeeksLater) {
          rowClass += ' row-expiring-soon';
        } else if (expirationDate > twoWeeksLater) {
          rowClass += ' row-normal-exp';
        }
      } else {
        rowClass += ' no-exp';
      }

      if (params.row.stock < 10 && params.row.stock > 0) {
        rowClass += ' row-low-stock';
      }

      return rowClass.trim(); 
    };

  return (
    <Paper sx={{ height: 640, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        sx={{
          textAlign: 'center',
          '& .no-exp': {
            backgroundColor: 'none',
          },
          '& .row-expiring-soon': {
            backgroundColor: '#fff3cd', // Yellow
          },
          '& .row-normal-exp': {
            backgroundColor: '#d4edda', // Green
          },
          '& .row-expiring-sooner': {
            backgroundColor: '#f5c6cb', // Light red

          },
          '& .row-out-of-stock': {
            textDecoration: 'line-through',
          },
          '& .cell-low-stock':{
            color: '#eb0518' // Red
          },
          '& .cell-warning-stock':{
            color: '#eb7b05' // Orange
          },
          '& .MuiDataGrid-cell': {
            textAlign: 'left', // Align text in all cells to the left
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            textAlign: 'left', // Align text in column headers to the left
          },
        }}
        pageSizeOptions={[10]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        getRowClassName={manageRowColors}
      />
      <MetricsTable />
    </Paper>
  );
  
};

export default ProductTable;