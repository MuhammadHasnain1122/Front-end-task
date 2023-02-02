import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Avatar } from "@mui/material"
import { Breadcrumb, Col, Form, Input, Label, Row } from 'reactstrap';
import { LoadingButton } from '@mui/lab';
import { useLocation, useNavigate } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import Dashboard from './Dashboard';

export default function AddNotes() {

    const { state } = useLocation();
    console.log(state, "ooo")
    let notes = JSON.parse(localStorage.getItem("notes"));
    const currentAction = state?.item ? "edit" : "add";
    const [data, setData] = useState({
        title: state?.item ? state.item.title : "",
        note: state?.item ? state.item.note : "",
        productImage: state?.item ? state.item.productImage : ""
    });
    function handleFormState(key, value) {
        setData({
            ...data,
            [key]: value,
        });
    }
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState([]);

    const onSubmit = () => {

        localStorage.setItem("notes", JSON.stringify([...notes, data]))
        notes = JSON.parse(localStorage.getItem("notes"));
     
    }

 

    const navigateTo = () => {
        navigate("/view")
    }

    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader.result);
            setData({ ...data, 'productImage': reader.result })
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }



    return (
        <>


            <div className="flex justify-center content-center pt-11 ">
                <div className="flex flex-col space-y-5">
                    <h1 >Title</h1>
                    <TextField name="title" id="outlined-basic" defaultValue={data.title} label="title" variant="outlined" onChange={(e) => handleFormState('title', e.target.value)} />
                    <h1 >Note</h1>
                    <TextareaAutosize name="notes" minRows={5} defaultValue={data.note} placeholder="note" variant="outlined" sx={{ border: "1px solid black", color: "red" }} onChange={(e) => handleFormState('note', e.target.value)} />
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
                                getBase64(e.target.files[0])
                                // handleFormState('productImage', e.target.files[0]);
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </div>
                    <CardMedia sx={{ paddingTop: 2 }}
                        component="img"
                        height="140"
                        image={data?.productImage}
                        alt=""
                    />

                    <div className="flex justify-center space-x-4 pt-3">

                        <LoadingButton sx={{
                            color: "white",
                            backgroundColor: "blue"
                        }} type="submit" onClick={(e) => onSubmit(e)}>submit</LoadingButton>

                    </div>
                </div>

            </div>
        </>
    )
}
