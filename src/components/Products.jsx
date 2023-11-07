/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { useRef } from "react";
import Button from '@mui/material/Button';
import { Snackbar } from '@mui/material';

export default function Products() {
    const [products, setProducts] = useState([]);  
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    // columnsdef
    const columns = [
        { headerName: 'Name', field: 'name', sortable: true, filter: true },
        { headerName: 'Type', field: 'type.typeName', sortable: true, filter: true },
        { headerName: 'Color', field: 'color', sortable: true, filter: true },
        { headerName: 'Size', field: 'size', sortable: true, filter: true },
        { headerName: 'Units in shop', field: 'unitsInStock', sortable: true, filter: true },
        { headerName: 'Price', field: 'price', sortable: true, filter: true },
        { headerName: 'Manufacturer', field: 'manufacturer.name', sortable: true, filter: true },
        {
            cellRenderer: params =>
                <Button size="small" color="error" onClick={() => reserveProduct(params)}>
                    Varaa tuote
                </Button>,
            width: 120
        }
    ];

    const gridRef = useRef();

    useEffect(() => getProducts(), []);

    const reserveProduct = (params) => {
        //console.log("params.data._links.car.href = " + params.data._links.car.href);
        //console.log("id = " + gridRef.current.getSelectedNodes()[0].id);
        if (window.confirm('Are you sure')) {
            fetch(params.data._links.car.href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setMsg('Car deleted successfully');
                        setOpen(true);
                        getProducts();  // haetaan tietokannasta muuttunut tilanne, jossa mukana myös muiden käyttäjien muutokset
                        // staten päivitys ei toisi esille muiden käyttäjien muutoksia
                    } else
                        alert('Something went wrong in deletion: ' + response.status);
                })
                .catch(err => console.error(err)); // console.log/console.error/console.warning
        }
    }

    const getProducts = () => {
        fetch('http://localhost:8080/rest/products')
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData);
                setProducts(responseData);
            })
            .catch(err => console.error(err));
    }

    return (
        <>
            <div className="ag-theme-material" style={{ height: '800px', width: '100%', margin: 'auto' }}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={products}
                    animateRows={true}
                    rowSelection="single"
                    pagination={true}
                    paginationPageSize={10}
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                >
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={msg}
                />
            </div>

        </>
    );

}