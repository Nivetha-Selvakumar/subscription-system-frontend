
"use client"
import React, { useEffect, useState } from 'react';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { GlobalStyles, useMediaQuery } from '@mui/material';
import 'dayjs/locale/en-gb'; // Import locale for DD/MM/YYYY format
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';

interface dateRangePickerProps {
    onStartSelect: any;
    onEndSelect: any;
    isSubmitting: boolean;
    initialStartDate?: Date | null; // Initial start date value
    initialEndDate?: Date | null; // Initial end date value
    reset: boolean;
    disabled?: boolean;
    isMaxDate?: boolean;
}

const getFirstDateOfPreviousMonth = () => {
    const currentDate = dayjs();
    const previousMonthDate = currentDate.subtract(1, 'month');
    return previousMonthDate.startOf('month');
};

const DatePickerComponent: React.FC<dateRangePickerProps> = ({
    onStartSelect,
    onEndSelect,
    isSubmitting,
    initialStartDate = null,
    initialEndDate = null,
    reset,
    disabled,
    isMaxDate = true,
}) => {
    const resetText = "var(--place-holder-color)";
    const [startDate, setStartDate] = useState(initialStartDate ? dayjs(initialStartDate) : null);
    const [endDate, setEndDate] = useState(initialEndDate ? dayjs(initialEndDate) : null);
    const theme = useTheme();
    const webmatches = useMediaQuery(theme.breakpoints.up('sm'));
    const [startOpen, setStartOpen] = useState(false);
    const [endOpen, setEndOpen] = useState(false);

    // Start
    const handleStartOpen = () => {
        setStartOpen(true);
    };
    const handleStartClose = () => {
        setStartOpen(false);
    };

    // End Date
    const handleEndOpen = () => {
        setEndOpen(true);
    };
    const handleEndClose = () => {
        setEndOpen(false);
    };


    const handleStartDate = (date: Dayjs | null) => {
        if (!date) {
            // Clear both startDate and endDate when the start date is cleared
            setStartDate(null);
            setEndDate(null);
            onStartSelect(null);
            onEndSelect(null);
        } else {
            setStartDate(date);
            onStartSelect(date.toDate());
            if (endDate && date.isAfter(endDate)) {
                setEndDate(null);
                onEndSelect(null);
            }
        }
        // Close the start date picker
        setStartOpen(false);
    };

    const handleEndDate = (date: Dayjs | null) => {
        setEndDate(date);
        onEndSelect(date ? date.toDate() : null);

        // Close the end date picker
        setEndOpen(false);
    };

    useEffect(() => {
        if (reset) {
            setStartDate(null);
            setEndDate(null);
            onStartSelect(null);
            onEndSelect(null);
        }
    }, [reset]);

    return (
        <>
            {/* GlobalStyles for customizing MUI components */}
            < GlobalStyles styles={{
                '.MuiPickersDay-root': {
                    fontFamily: '"Inter" !important',
                    fontSize: '12px !important',
                    fontWeight: '500 !important',
                    cursor: 'pointer',
                    '&.Mui-selected': {
                        backgroundColor: 'rgb(225, 245, 255) !important',
                        color: 'rgb(1, 87, 167) !important',
                    },
                    '&:hover': {
                        backgroundColor: '#288ad7 !important', // Ensure !important is added for hover effect
                    },
                    '.MuiDateCalendar-root': {
                        transform: 'scale(1.2) !important', // Adjust scale as needed
                        transformOrigin: 'top left', // Set origin to control scale direction
                    },
                },
            }} />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                <div className='filter-date-picker' id={'filter-date-picker-parent'}>
                    <DatePicker
                        label='Start Date'
                        value={startDate}
                        open={startOpen}
                        onClose={handleStartClose}
                        onChange={handleStartDate}
                        disabled={disabled} // Disable if `disabled` is true
                        maxDate={isMaxDate ? dayjs() : undefined}
                        format="DD MMM YYYY"
                        sx={{
                            width: '100%',
                            '& .MuiInputBase-input': {
                                fontFamily: '"Inter" !important',
                                fontSize: '12px !important',
                                fontWeight: '500 !important',
                                cursor: 'pointer'
                            },
                            "& .MuiInputBase-root.MuiOutlinedInput-root": {
                                borderRadius: '8px',
                                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                                    padding: '12px',
                                    fontSize: '14px !important',
                                    color: 'rgba(0, 16, 30, 0.6)',
                                    cursor: 'pointer'
                                }

                            },
                            "& .MuiFormLabel-root.MuiInputLabel-root": {
                                top: '-5px',
                                fontSize: '14px',
                                fontFamily: 'Inter',
                                fontWeight: '500',
                                cursor: 'pointer'
                            },
                            "& .MuiInputAdornment-root.MuiIconButton-edgeEnd": {
                                margin: 0,
                            },
                        }}
                        slotProps={{
                            popper: {
                                className: 'custom-datepicker-overlay', // Add custom class name for desktop overlay (popper)
                            },
                            actionBar: {
                                actions: ["clear", "today"], // Adding Clear and Today buttons
                            },
                            textField: {
                                onClick: handleStartOpen,
                                autoFocus: false,
                                disabled: true,
                                InputProps: {
                                    endAdornment: (
                                        <span onClick={handleStartOpen} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                            <InsertInvitationIcon sx={{ color: 'rgba(2, 10, 18, 0.54)' }} />
                                        </span>
                                    ),
                                }
                            }
                        }}
                    />

                    <DatePicker
                        label='End Date'
                        value={endDate}
                        open={endOpen}
                        onClose={handleEndClose}
                        onChange={handleEndDate}
                        minDate={startDate || undefined}  // Ensures the end date is always after the start date
                        disabled={disabled || !startDate}
                        disableFuture={false} // Also disable if `startDate` is not selected
                        format="DD MMM YYYY"
                        sx={{
                            width: '100%',
                            '& .MuiInputBase-input': {
                                fontFamily: '"Inter" !important',
                                fontSize: '12px !important',
                                fontWeight: '500 !important',
                                cursor: 'pointer'
                            },
                            "& .MuiInputBase-root.MuiOutlinedInput-root": {
                                borderRadius: '8px',
                                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                                    padding: '12px',
                                    fontSize: '14px !important',
                                    color: 'rgba(0, 16, 30, 0.6)',
                                    cursor: 'pointer'
                                }
                            },
                            "& .MuiFormLabel-root.MuiInputLabel-root": {
                                top: '-5px',
                                fontSize: '14px',
                                fontFamily: 'Inter',
                                fontWeight: '500',
                                cursor: 'pointer'
                            }
                        }}
                        slotProps={{
                            popper: {
                                className: 'custom-datepicker-overlay', // Add custom class name for desktop overlay (popper)
                            },
                            actionBar: {
                                actions: ["clear", "today"], // Adding Clear and Today buttons
                            },
                            textField: {
                                onClick: startDate ? handleEndOpen : undefined,
                                autoFocus: false,
                                disabled: true,
                                InputProps: {
                                    endAdornment: (
                                        <span
                                            onClick={startDate ? handleEndOpen : undefined}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                cursor: startDate ? 'pointer' : 'default',
                                                opacity: startDate ? 1 : 0.5
                                            }}
                                        >
                                            <InsertInvitationIcon sx={{ color: 'rgba(2, 10, 18, 0.54)' }} />
                                        </span>
                                    ),
                                }
                            }
                        }}
                    />
                </div>
            </LocalizationProvider>
        </>
    );
};

export default DatePickerComponent;


