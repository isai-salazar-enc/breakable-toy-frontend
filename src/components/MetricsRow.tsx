import { TableCell, TableRow } from "@mui/material";
import { Metric } from "../types/Metric";

const MetricsRow : React.FC<Metric> = ({category, totalProducts, totalValue, averagePrice}) => {
    return (
        <TableRow key={category}>
            <TableCell><b>{category}</b></TableCell>
            <TableCell>{totalProducts}</TableCell>
            <TableCell>{totalValue.toFixed(2)}</TableCell>
            <TableCell>{averagePrice.toFixed(2)}</TableCell>
        </TableRow>
    )
}

export default MetricsRow;