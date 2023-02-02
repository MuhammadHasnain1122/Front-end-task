import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { CardMedia } from '@mui/material'
import { json, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';



export default function ViewNotes() {
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")));


    const navigate = useNavigate();



    const navigateTo = () => {
        navigate("/")
    }

    const onDelete = (id) => {
        console.log(id, "kkk")
        const newArr = notes.filter((a, key) => {
            return key !== id;
        });

        localStorage.setItem("notes", JSON.stringify(newArr));
        setNotes(newArr)
    }

    const update = (key, item) => {

        navigate("/edit", {
            state: {
                key, item
            }
        })
    }

    return (
        <>
            <div className="  p-5 ">
                <div>
                <LoadingButton onClick={navigateTo}>
                    Go Back To Dashboard
                 </LoadingButton>
                </div>
               
                <div className="flex justify-center">
                   
                    <h1 style={{ fontSize: 40, fontWight: 40 }}>

                        View All Notes
                    </h1>
                </div>


            </div>
            <div className="flex content-center justify-center">


                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell align="right">Note</TableCell>
                                <TableCell align="right">Pictures</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {notes?.map((row, key) => (


                                <TableRow

                                >
                                    <TableCell align="right">{key}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {row?.title}
                                    </TableCell>

                                    <TableCell align="right">{row?.note}</TableCell>
                                    <TableCell align="right">
                                        <CardMedia sx={{ paddingTop: 2 }}
                                            component="img"
                                            height="140"
                                            image={row?.productImage}
                                            alt=""
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button onClick={e => update(key, row)}>
                                            Edit
                                        </Button>
                                        <Button onClick={e => onDelete(key)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}
