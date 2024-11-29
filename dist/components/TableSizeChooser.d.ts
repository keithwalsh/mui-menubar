import React from "react";
export interface TableSizeChooserProps {
    maxRows?: number;
    maxCols?: number;
    currentRows: number;
    currentCols: number;
    onSizeSelect: (rows: number, cols: number) => void;
}
declare const TableSizeChooser: React.FC<TableSizeChooserProps>;
export default TableSizeChooser;
