import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

const MySelectStatus = () => {
    const [status, setStatus] = useState("")

    const handleChange = (event:any) => {
        setStatus(event.target.value)
    }

    return(
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleChange}
            >
                <MenuItem value={"published"}>Published</MenuItem>
                <MenuItem value={"draft"}>Draft</MenuItem>
            </Select>
        </FormControl>
    )
}

export default MySelectStatus