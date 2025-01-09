import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";

const Extra3 = () => {
  const originalData = [
    { id: 1, name: "Paras", age: 11, date: "01/31/20" },
    { id: 2, name: "Dev", age: 21, date: "02/30/20" },
    { id: 3, name: "Dinesh", age: 13, date: "01/31/20" },
    { id: 4, name: "Paarth", age: 13, date: "01/30/20" },
    { id: 5, name: "Harman", age: 23, date: "02/21/21" },
  ];

  const [data, setData] = useState(originalData);
  const [filters, setFilters] = useState({ name: "", age: "", date: "" });

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "age", headerName: "Age", width: 100 },
    { field: "date", headerName: "Date", width: 150 },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);

    // Apply filters
    const filteredData = originalData.filter((row) => {
      const nameMatch = row.name
        .toLowerCase()
        .includes(updatedFilters.name.toLowerCase());
      const ageMatch =
        updatedFilters.age === "" ||
        row.age === parseInt(updatedFilters.age, 10);
      const dateMatch = row.date.includes(updatedFilters.date);
      return nameMatch && ageMatch && dateMatch;
    });

    setData(filteredData);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <TextField
          label="Name"
          variant="outlined"
          size="small"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <TextField
          label="Age"
          variant="outlined"
          size="small"
          name="age"
          value={filters.age}
          onChange={handleFilterChange}
          type="number"
        />
        <TextField
          label="Date"
          variant="outlined"
          size="small"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
        />
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={data} columns={columns} pageSize={5} />
      </div>
    </div>
  );
};

export default Extra3;
