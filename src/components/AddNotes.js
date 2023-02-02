import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import {Avatar} from "@mui/material"
import { Col, Form, Input, Label, Row } from 'reactstrap';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

export default function AddNotes() {

    const [data, setData] = useState({
        title: '',
        note: '',
        productImage: null
    });
    function handleFormState(key, value) {
        setData({
            ...data,
            [key]: value,
        });
    }
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState([]);
    const [loader, setLoader] = useState(false);

    const onSubmit =  () => {
        setLoader(true)

        setFormValues((prevFormValues) => [...prevFormValues, data]);
        const noteData = { ...data };
        const formData = new FormData();


        Object.entries(noteData).forEach(([key, value]) => {
            if (value && typeof value === 'object' && !(value instanceof Date) && !(value instanceof File)) {
              console.log(`key is ${key} and values is ${value}`);
              formData.append(key, JSON.stringify(value));
            } else {
              formData.append(key, value);
            }
          });

        localStorage.setItem('branchId', formData)
        setLoader(false)
    }

    useEffect(() => {
        localStorage.setItem("formValues", JSON.stringify(formValues));
        console.log(formValues)
      }, [formValues]);
    
      const navigateTo = () => {
        navigate("/view")
      }
    return (
        <>
            <div className="flex justify-center content-center pt-11 ">
                <div className="flex flex-col space-y-5">
                    <h1 >Title</h1>
                    <TextField name="title" id="outlined-basic" label="title" variant="outlined" onChange={(e) => handleFormState('title', e.target.value)} />
                    <h1 >Note</h1>
                    <TextareaAutosize name="notes" minRows={5} placeholder="note" variant="outlined" sx={{ border: "1px solid black", color: "red" }} onChange={(e) => handleFormState('note', e.target.value)} />
                    <h1 >Choose Image</h1>
                    <div className="pt-2">
                    <TextField
                        fullWidth
                        type="file"
                        id="outlined-required"
                        label="Product Image"
                        InputProps={{
                            startAdornment: <Avatar alt="Remy Sharp" src={data.productImage} />,
                        }}
                        onChange={(e) => {
                            const file = e.target.files[0];

                            if (!file) return;

                            handleFormState('productImage', e.target.files[0]);
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    </div>
                   
                    <div className="flex justify-center space-x-4 pt-3">

                        <LoadingButton loading={loader} sx={{
                            color: "white",
                            backgroundColor: "blue"
                        }} type="submit" onClick={(e) => onSubmit(e)}>submit</LoadingButton>
                        <Button sx={{
                            color: "white",
                            backgroundColor: "blue"
                        }} onClick={navigateTo}>view</Button>
                    </div>
                </div>

            </div>
        </>
    )
}
