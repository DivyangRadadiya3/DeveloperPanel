import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { TextField, Select } from "@mui/material";
import { useState } from "react";

export default function InputField({
  value,
  onChange,
  placeholder,
  type = "text",
  name,
}) {
  const [rank, setRank] = useState("");

  const handleChange = (event) => {
    setRank(event.target.value);
  };
  return (
    <>
      <Box
        sx={{
          "& .MuiSelect-select": {
            paddingRight: 1,
            paddingLeft: 1,
            paddingTop: 1,
            paddingBottom: 1,
          },
          "& fieldset": { borderRadius: 2 },
        }}
      >
        <TextField
          id={name} // Use the name as the id for accessibility
          label={placeholder} // Use placeholder as the label
          size="small"
          variant="outlined"
          type={type}
          value={value}
          onChange={onChange}
          name={name}
          fullWidth 
        />
      </Box>
    </>
  );
}
