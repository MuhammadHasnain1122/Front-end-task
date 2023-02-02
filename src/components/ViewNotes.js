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
import { useNavigate } from 'react-router-dom';

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function ViewNotes() {

    const [getData, setGetData] = useState([{}]);
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem("formValues");
        localStorage.setItem("formValues", data);
        setGetData(JSON.parse(data))
        console.log(getData, "pl")

    }, []);
 

    const navigateTo = () => {
        navigate("/")
    }
  
    const onDelete = (id) => {
      const afterDelete =  getData.filter(object => {
            return object.id !== id;
          });

    }
    return (
        <>
            <div className="  p-5 ">
                <div className="flex justify-start">
                    <Button  onClick={navigateTo}>
                        Back
                    </Button>
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
                            {getData?.map((row, key) => (

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
                                        <Button>
                                            Edit
                                        </Button>
                                        <Button onClick={onDelete(key)}>
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
