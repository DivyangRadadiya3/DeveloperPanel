import React, { useEffect, useState } from "react";
import { Box, FormControl, Select, MenuItem, InputLabel } from "@mui/material";

const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function ContestTypeDropDown({ contestTypeData, onHandleChange, value }) {
  const safeContestTypeData = Array.isArray(contestTypeData) ? contestTypeData : [];

  return (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel id="contest-type-label">Contest Type</InputLabel>
      <Select
        labelId="contest-type-label"
        value={value || ''} 
        onChange={onHandleChange}
        label="Contest Type"
        MenuProps={MenuProps}
        size="small"
      >
        {safeContestTypeData.map((contestType) => (
          <MenuItem key={contestType._id} value={contestType}>
            {contestType.name} 
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default ContestTypeDropDown;
