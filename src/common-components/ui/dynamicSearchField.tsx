"use client";
import React, { useState, useEffect } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

interface FieldProps {
  label: string;
  type: string;
  name: string;
  onChange?: (value: string) => void;
  maxLength?: number;
  disabled?: boolean;
  client?: boolean;
  style?: React.CSSProperties;
  value?: string;
}

export default function DynamicSearchField({
  onChange,
  disabled = false,
}: FieldProps) {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<FieldProps[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (value.startsWith(" ") && searchText.length === 0) {
      // To restrict the search with initial space
      return;
    }

    setSearchText(value);
    if (onChange) {
      onChange(value);
    }
  };

  const handleClear = () => {
    setSearchText("");
    setResults([]);
    if (onChange) {
      onChange(""); // Notify parent component that search has been cleared
    }
  };

  useEffect(() => { }, [results]);

  return (
    <>
      <div className="search-container" id = {'dynamic-field-search-parent-container'}>
        <div
          className="search-input"
          style={{ display: "flex", alignItems: "center" }}
          id = {'search-input-container'}
        >
          <TextField
            variant="outlined"
            placeholder="Search"
            value={searchText}
            onChange={handleChange}
            // disabled={disabled}
            sx={{
              width: "100%",
              height: "40px",
              display: "flex",
              alignItems: "center",
              border: "1px solid rgba(0, 15, 11, 0.08) !important",
              borderRadius: "8px",
              backgroundColor: "rgb(255, 255, 255)",
              fontFamily: "Inter",
              "& .MuiOutlinedInput-input": {
                color: searchText ? "rgba(0, 0, 0, 0.60)" : "inherit",
              },
              "& .MuiInputBase-input": {
                fontFamily: "Inter",
                fontSize: 14,
              },
              "& div fieldset": {
                border: "none",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{
                    minWidth: "30px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  id= {'input-adorsment-startAdornment'}
                >
                  <SearchIcon id = {'search-icon'} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    minWidth: "30px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  id= {'input-adorsment-endadornment'}
                >
                  {searchText && (
                    <IconButton onClick={handleClear} sx={{ padding: "10px" }} id = {'clear-icon-parent'}>
                      <ClearIcon id = {'clear-icon'} />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
              style: { paddingTop: "0", paddingBottom: "0", height: "40px" },
            }}
            id="text-field-input"
          />
        </div>
      </div>
    </>
  );
}
