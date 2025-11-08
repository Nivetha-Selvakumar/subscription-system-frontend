// DatePickerComponent.tsx
"use client";
import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { GlobalStyles, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";

interface DateRangePickerProps {
    // new preferred names
    onStartChange?: (date: Date | null) => void;
    onEndChange?: (date: Date | null) => void;
    // legacy names kept for compatibility
    onStartSelect?: (date: Date | null) => void;
    onEndSelect?: (date: Date | null) => void;

    isSubmitting?: boolean;
    initialStartDate?: Date | null;
    initialEndDate?: Date | null;
    reset?: boolean;
    disabled?: boolean;
    isMaxDate?: boolean;
}

const DatePickerComponent: React.FC<DateRangePickerProps> = ({
    onStartChange,
    onEndChange,
    onStartSelect,
    onEndSelect,
    isSubmitting,
    initialStartDate = null,
    initialEndDate = null,
    reset = false,
    disabled = false,
    isMaxDate = true,
}) => {
    const [startDate, setStartDate] = useState<Dayjs | null>(
        initialStartDate ? dayjs(initialStartDate) : null
    );
    const [endDate, setEndDate] = useState<Dayjs | null>(
        initialEndDate ? dayjs(initialEndDate) : null
    );

    const theme = useTheme();
    useMediaQuery(theme.breakpoints.up("sm"));

    const [startOpen, setStartOpen] = useState(false);
    const [endOpen, setEndOpen] = useState(false);

    const callStart = (d: Date | null) => {
        // call both new and legacy handlers if present
        onStartChange && onStartChange(d);
        onStartSelect && onStartSelect(d);
    };
    const callEnd = (d: Date | null) => {
        onEndChange && onEndChange(d);
        onEndSelect && onEndSelect(d);
    };

    const handleStartDate = (date: Dayjs | null) => {
        if (!date) {
            setStartDate(null);
            setEndDate(null);
            callStart(null);
            callEnd(null);
        } else {
            setStartDate(date);
            callStart(date.toDate());
            if (endDate && date.isAfter(endDate)) {
                setEndDate(null);
                callEnd(null);
            }
        }
        setStartOpen(false);
    };

    const handleEndDate = (date: Dayjs | null) => {
        setEndDate(date);
        callEnd(date ? date.toDate() : null);
        setEndOpen(false);
    };

    useEffect(() => {
        if (reset) {
            setStartDate(null);
            setEndDate(null);
            callStart(null);
            callEnd(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]);

    useEffect(() => {
        // keep internal state in sync when parent changes initial props
        setStartDate(initialStartDate ? dayjs(initialStartDate) : null);
        setEndDate(initialEndDate ? dayjs(initialEndDate) : null);
    }, [initialStartDate, initialEndDate]);

    return (
        <>
            <GlobalStyles
                styles={{
                    ".MuiPickersDay-root": {
                        fontFamily: '"Inter" !important',
                        fontSize: "12px !important",
                        fontWeight: "500 !important",
                        cursor: "pointer",
                        "&.Mui-selected": {
                            backgroundColor: "rgb(225, 245, 255) !important",
                            color: "rgb(1, 87, 167) !important",
                        },
                        "&:hover": {
                            backgroundColor: "#288ad7 !important",
                        },
                    },
                }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <DatePicker
                        label="Start Date"
                        value={startDate}
                        open={startOpen}
                        onClose={() => setStartOpen(false)}
                        onChange={handleStartDate}
                        disabled={disabled}
                        maxDate={isMaxDate ? dayjs() : undefined}
                        format="DD MMM YYYY"
                        slotProps={{
                            textField: {
                                onClick: () => setStartOpen(true),
                                disabled: true,
                                InputProps: {
                                    endAdornment: (
                                        <span onClick={() => setStartOpen(true)} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                                            <InsertInvitationIcon sx={{ color: "rgba(2, 10, 18, 0.54)" }} />
                                        </span>
                                    ),
                                },
                            },
                            actionBar: { actions: ["clear", "today"] },
                        }}
                        sx={{
                            width: "100%",
                            "& .MuiInputBase-root": { borderRadius: 2 },
                        }}
                    />

                    <DatePicker
                        label="End Date"
                        value={endDate}
                        open={endOpen}
                        onClose={() => setEndOpen(false)}
                        onChange={handleEndDate}
                        minDate={startDate || undefined}
                        disabled={disabled || !startDate}
                        format="DD MMM YYYY"
                        slotProps={{
                            textField: {
                                onClick: startDate ? () => setEndOpen(true) : undefined,
                                disabled: true,
                                InputProps: {
                                    endAdornment: (
                                        <span
                                            onClick={startDate ? () => setEndOpen(true) : undefined}
                                            style={{ display: "flex", alignItems: "center", cursor: startDate ? "pointer" : "default", opacity: startDate ? 1 : 0.5 }}
                                        >
                                            <InsertInvitationIcon sx={{ color: "rgba(2, 10, 18, 0.54)" }} />
                                        </span>
                                    ),
                                },
                            },
                            actionBar: { actions: ["clear", "today"] },
                        }}
                        sx={{
                            width: "100%",
                            "& .MuiInputBase-root": { borderRadius: 2 },
                        }}
                    />
                </div>
            </LocalizationProvider>
        </>
    );
};

export default DatePickerComponent;
