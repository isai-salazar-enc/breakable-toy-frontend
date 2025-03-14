import { ProductWithCategoryDTO } from '../types/ProductWithCategoryDTO';
import { DataGrid, GridCellParams, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Product } from '../types/Product';

interface ProductTableProps{
  rows: ProductWithCategoryDTO[];
  onClickEditOpen: (product: Product) => void;
  onClickDelete: (id:number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({rows, onClickEditOpen, onClickDelete}) => {

  const columns: GridColDef[] = [
    { field: 'category', headerName: 'Category'},
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'unitPrice', headerName: 'Price', type: 'number', width: 100, headerAlign: 'left' },
    { field: 'expirationDate',headerName: 'Expiration date', type: 'string' },
    { field: 'stock', headerName: 'Stock', type: 'number', headerAlign: 'left',
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
      width: 180,
      headerName: 'Actions',
      renderCell: (params: GridCellParams) => {
        return (
          <div>
            {/* Edit Button */}
            <Button variant='contained' onClick={() => onClickEditOpen(params.row as Product)}>Edit</Button>
            
            {/* Delete Button */}
            <Button 
              variant='contained'
              color="error" 
              onClick={() => onClickDelete(params.row.id as number)} 
              sx={{ marginLeft: 1 }}
            >
              Delete
            </Button>
          </div>
        );
      },
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
        pageSizeOptions={[10]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        getRowClassName={manageRowColors}
      />
    </Paper>
  );
  
};

export default ProductTable;