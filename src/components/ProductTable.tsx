import { ProductWithCategoryDTO } from '../types/ProductWithCategoryDTO';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

interface ProductTableProps{
  rows: ProductWithCategoryDTO[];
}

const ProductTable: React.FC<ProductTableProps> = ({rows}) => {

  const columns: GridColDef[] = [
    { field: 'category', headerName: 'Category'},
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'unitPrice', headerName: 'Price', type: 'number', width: 120 },
    { field: 'expirationDate',headerName: 'Expiration date', type: 'string' },
    { field: 'stock', headerName: 'Stock', type: 'number'},
    {
      field: 'actions',
      sortable: false,
      headerName: 'Actions',
      renderCell: () => (
        'Edit/Delete'
      ),
    },
  ];


  return (
    <Paper sx={{ height: 630, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        sx={{ border: 0 }}
        pageSizeOptions={[10]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
      />
    </Paper>
  );
  
};

export default ProductTable;