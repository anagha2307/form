import React from 'react'
import { Button, TextField, Paper, Box, Stack } from '@mui/material';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";

import { MenuItem, Select, InputLabel } from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from "yup";

function Form() {
    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        mobile: Yup.string().matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
            .required("Mobile is required"),
        dob: Yup.date().required("Date of Birth is required"),
        gender: Yup.string().required("Gender is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        course: Yup.string().required("Course is required"),
        address: Yup.string().required("Address is required"),
    });
    const formik = useFormik({
        initialValues: {
            name: '',
            mobile: '',
            gender: '',
            dob: null,
            course: '',
            email: '',
            address:''
        },
        validationSchema,      
        /* Displaying submitted values */
        onSubmit: (values,{resetForm}) => {
            alert(`Form Submitted Successfully!!
                Name: ${values.name}
                Mobile: ${values.mobile}
                Date of Birth: ${values.dob ? values.dob.format("DD/MM/YYYY") : ""}
                Gender: ${values.gender}
                Email: ${values.email}
                Course: ${values.course}
                Address: ${values.address}`);
            resetForm()
        }
    })

    return (
        <div>
            <Paper elevation={3} sx={{ p: 3, width: 500,my: 5}}>
                <form onSubmit={formik.handleSubmit}>
                <Box sx={{ display: "flex", flexDirection: 'column', gap: 3 }}>
                    {/*Form heading*/}
                    <h2 className='text-center text-primary'>Student Registration Form</h2>
                    {/*Name field*/}
                    <TextField id="name"
                        label="Name"
                        variant="outlined"
                        className='form-control'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <Stack spacing={2} direction="row">
                        {/*Mobile no. field*/}
                        <TextField id="mobile"
                            label="Mobile"
                            variant="outlined"
                            className='form-control w-50'
                            value={formik.values.mobile}
                            onChange={formik.handleChange}
                            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                            helperText={formik.touched.mobile && formik.errors.mobile} />
                        {/*Date of birth field*/}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateField label="Date of Birth"
                                className='w-50'
                                value={formik.values.dob}
                                onChange={(value) => formik.setFieldValue("dob", value)}
                                slotProps={{
                                    textField: {
                                        error: formik.touched.dob && Boolean(formik.errors.dob),
                                        helperText: formik.touched.dob && formik.errors.dob,
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </Stack>
                    {/*Gender radio button field*/}
                    <FormControl
                        error={formik.touched.gender && Boolean(formik.errors.gender)}>
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup
                            row
                            name="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                        >
                            <FormControlLabel
                                value="female"
                                control={<Radio />}
                                label="Female"
                            />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel
                                value="other"
                                control={<Radio />}
                                label="Other"
                            />
                        </RadioGroup>
                        {formik.touched.gender && formik.errors.gender && (
                            <span style={{ color: "red", fontSize: "0.8rem" }}>
                                {formik.errors.gender}
                            </span>
                        )}
                    </FormControl>
                    {/*Email text field*/}
                    <TextField id="outlined-basic"
                        name="email"
                        label="Email"
                        variant="outlined"
                        className='form-control'
                        fullWidth
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email} />
                    {/*Course dropdown*/}
                    <FormControl fullWidth error={formik.touched.course && Boolean(formik.errors.course)}>
                        <InputLabel id="demo-controlled-open-select-label">Course</InputLabel>
                        <Select
                            name="course"
                            value={formik.values.course}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={'Biology'}>Biology</MenuItem>
                            <MenuItem value={'Computer Science'}>Computer Science</MenuItem>
                            <MenuItem value={'Commerce'}>Commerce</MenuItem>
                            <MenuItem value={'Humanities'}>Humanities</MenuItem>

                        </Select>
                    </FormControl>
                    {/*Address multiline text area*/}
                    <TextField id="standard-basic" label="Address" variant="outlined"
                        multiline rows={3}
                        value={formik.values.address}
                        name="address"
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}/>
                    {/* Submit Button */}
                    <Button variant="contained" type="submit">Register</Button>
                </Box>
                </form>
            </Paper>

        </div>
    )
}

export default Form
