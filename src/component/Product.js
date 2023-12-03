import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
export default function Product() {
    const columns = [
        {
            name: "Sr.No",
            selector: (row) => row.id
        },
        {
            name: "Name",
            selector: (row) => row.name
        },
        {
            name: "Email",
            selector: (row) => row.email
        },
        {
            name: "Role",
            selector: (row) => row.role
        },
        {
            name: "Action",
            cell: (row) => (
                <button className="btn btn-danger" onClick={() => handleDelete(row.id)}>Delete</button>
            )
        }

    ];
    const [data, setData] = useState([]);
    const [search, SetSearch] = useState('');
    const [filter, setFilter] = useState([]);

    const getProduct = async () => {
        try {
            const req = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
            const res = await req.json();
            setData(res);
            setFilter(res);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getProduct();
    }, []);

    useEffect(() => {
        const result = data.filter((item) => {
            return item.name.toLowerCase().match(search.toLocaleLowerCase());
        });
        setFilter(result);
    }, [search]);

    const handleDelete = (val) => {
        const newdata = data.filter((item) => item.id !== val);
        setFilter(newdata);
    }

    const tableHeaderstyle = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "14px",
                backgroundColor: "#ccc",
            },
        },
    }

    return (
        <React.Fragment>
            <DataTable
                customStyles={tableHeaderstyle}
                columns={columns}
                data={filter}
                pagination
                selectableRows
                fixedHeader
                selectableRowsHighlight
                highlightOnHover
                subHeader
                subHeaderComponent={
                    <input type="text"
                        className="w-25 form-control"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => SetSearch(e.target.value)}

                    />
                }
                subHeaderAlign="right"

            />
        </React.Fragment>
    );
}