import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";


const Tablerow = ({row, handleClick, isItemSelected, labelId, thresholdValue }) => {
  return (
    <TableRow
      hover
      onClick={(event) => handleClick(event, row.name)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.name}
      selected={isItemSelected}
      sx={{ cursor: "pointer" }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          inputProps={{
            "aria-labelledby": labelId,
          }}
        />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        {row.Measure}
      </TableCell>
      <TableCell align="left">{row.DimensionName}</TableCell>
      <TableCell align="left">{row.ColumnName}</TableCell>
      <TableCell
        align="left"
        style={{
          backgroundColor:
            row.LoadTime == thresholdValue ? "red" : "transparent",
        }}
      >
        {row.LoadTime != 0 ? (
          // Display the response data instead of the button
          <span>{row.LoadTime}</span>
        ) : (
          // Show the button if no response data
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
      </TableCell>
      <TableCell align="left">{row.isMeasureUsedInVisual}</TableCell>
      <TableCell align="left">{row.PageName}</TableCell>
      <TableCell align="left">{row.VisualName}</TableCell>
    </TableRow>
  );
};

export default Tablerow;
