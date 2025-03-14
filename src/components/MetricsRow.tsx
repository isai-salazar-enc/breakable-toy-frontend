import { TableCell, TableRow } from "@mui/material";
import { Metric } from "../types/Metric";

interface MetricsRowProps {
    label: string,
    data: Metric,
}

const MetricsRow : React.FC<MetricsRowProps> = ({label, data}) => {
    return (
        <TableRow key={label}>
            <TableCell><b>{label}</b></TableCell>
            <TableCell>{data.totalProducts}</TableCell>
            <TableCell>{data.totalValue.toFixed(2)}</TableCell>
            <TableCell>{data.averagePrice.toFixed(2)}</TableCell>
        </TableRow>
    )
}

export default MetricsRow;