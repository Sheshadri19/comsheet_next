import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from 'next/link'
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { axiosInstance } from "@/Service/axiosInstance";
// import { propertyData } from "./api/function";
import { Root } from "@/Typescript/PropertyDatainterface";
import { endpoint } from "./api/endpoint";
import { Backdrop, Box, Button, Fade, FormControl, Grid, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Typography } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { propType } from "@/Typescript/PropertyTypeInterface";
import { title } from "process";
import React, { useCallback, useState } from "react";
import { BorderAllRounded } from "@mui/icons-material";
import { state } from "@/Typescript/Stateinterface";
import { Regioninter } from "@/Typescript/regioninterface";
import { Roottenant } from "@/Typescript/tenancyinterface";
import { RootLease } from "@/Typescript/LeaseInterface";

const inter = Inter({ subsets: ["latin"] });




// {
//   field: 'fullName',
//   headerName: 'Full name',
//   description: 'This column has a value getter and is not sortable.',
//   sortable: false,
//   width: 160,
//   valueGetter: (params: GridValueGetterParams) =>
//     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
// },




export default function Home() {

  // sold property table

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 70 },

    { field: 'property name', headerName: 'Property Name', width: 70 },

    { field: 'state', headerName: 'State', width: 130 },

    { field: 'city', headerName: 'City', width: 130 },

    { field: 'price', headerName: 'Price', type: 'any', width: 90, },

    { field: 'cap', headerName: 'Cap.', type: 'any', width: 90, },

    { field: 'term', headerName: 'Term', type: 'any', width: 90, },

    { field: 'lease_type_data.', headerName: 'Lease Type', width: 130 },

    { field: 'property_type', headerName: 'Property Type', width: 130 },

    { field: 'days_to_close', headerName: 'Days on market', type: 'any', width: 90, },

    { field: 'increases', headerName: 'Increases', type: 'any', width: 90, },

    { field: 'status', headerName: 'Status', type: 'any', width: 90, },
  ]



  const { isLoading, error, data } = useQuery({
    queryKey: ['property'],
    queryFn: async () => {
      const res = await axiosInstance.post<Root>(
        endpoint.pageEndpoint.propsoldlist
      )

      console.log("respon", res.data.data.docs);
      return res.data.data.docs

    }
  })

  console.log(data);


  const respon = data?.map((item: any, index: number) => {
    item["index"] = index;
    console.log("in", index);

    return (
      item
    )
  }
  )




  // Property Table


  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;



  const { isPending, error: err, data: propty } = useQuery({
    queryKey: ['propertyType'],
    queryFn: async () => {
      const resp = await axiosInstance.get<propType>(
        endpoint.pageEndpoint.propsType
      )

      console.log("proptype data", resp.data.data);
      return resp?.data?.data

    }
  })


  const datares = propty?.map((ele) => {



    return {
      ...ele,
      id:ele?._id
    }
  })


  // modal for property type


  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',

    boxShadow: 24,
    p: 4,


  }


  // price 

  // const [min,setMin]=useState(0)
  // const [max,setMax]=useState(0)





  // const [minMaxState, setMinMaxState] = useState({
  //   min: 0,
  //   max: 0
  // })

  // const updateMinMax = useCallback((value: typeof minMaxState) => {
  //   setMinMaxState(value)
  // }, []);



  // modal

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);




  console.log("Resoponse ", respon);


  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const getpricecalc = (num1: number, num2: number) => {
    const data = respon?.filter((item) => item.price >= num1 && item.price <= num2)
    return data
  }



  // All State

  const { error: er, data: stateall } = useQuery({
    queryKey: ['states'],
    queryFn: async () => {
      const resState = await axiosInstance.get<state>(
        endpoint.pageEndpoint.allstate
      )

      console.log("state all", resState.data.data);
      return resState.data.data

    }
  })

  const statedata = stateall?.map((ele) => {

    return {...ele,id:ele?._id}

  })


  // all Region 

  const { error: ero, data: regionall } = useQuery({
    queryKey: ['regi'],
    queryFn: async () => {
      const resRegi = await axiosInstance.get<Regioninter>(
        endpoint.pageEndpoint.regi
      )

      console.log("region all", resRegi.data.data);
      return resRegi.data.data

    }
  })

  const regions = regionall?.map((ele) => {
  
    return {...ele,_id:ele?._id}

  })

  // Tenancy Data


  const { error: erorr, data: tenancell } = useQuery({
    queryKey: ['tenan'],
    queryFn: async () => {
      const resTenant = await axiosInstance.get<Roottenant>(
        endpoint.pageEndpoint.tenantcend
      )

      console.log("tenant all", resTenant.data.data);
      return resTenant.data.data

    }
  })

  const tenants = tenancell?.map((ele) => {
  

    return {...ele,_id:ele?._id}

  })


  // Lease Type Data


  const { error: eror, data: leaseData } = useQuery({
    queryKey: ['laease'],
    queryFn: async () => {
      const resLease = await axiosInstance.get<RootLease>(
        endpoint.pageEndpoint.leaseend
      )

      console.log("tenant all", resLease.data.data);
      return resLease.data.data

    }
  })

  const leases = leaseData?.map((ele) => {
    
    return {...ele,_id:ele?._id}

  })





  return (
    <>
      <Box sx={{ width: '100%', bgcolor: '#b3cbf2' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {/* property type */}
          <Grid item xs={2} lg={2}>
            {
              datares ? (

                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={datares }
                  disableCloseOnSelect
                  getOptionLabel={(option) => option?.title}
                  renderOption={(props, option, { selected }) => (

                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8, color: 'blue' }}
                        checked={selected}
                      />
                      {option?.title}
                    </li>

                  )}
                  style={{ width: 150 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Property Type" placeholder="Select Type" />
                  )
                  } />


              ) : (
                <> </>
              )

            }
          </Grid>


          {/* Price  */}

          <Grid item xs={2} lg={2}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={respon as string[]}
              sx={{ width: 120 }}
              renderInput={(params) => (
                <TextField {...params} label="Price" />

              )}
            />

          </Grid>


          {/* State data */}
          <Grid item xs={2} lg={2}>
            {
              statedata ? (

                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={statedata}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option?.title}
                  renderOption={(props, option, { selected }) => (

                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8, color: 'blue' }}
                        checked={selected}
                      />
                      {option?.title}
                    </li>

                  )}
                  style={{ width: 150 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select State" placeholder="Select Type" />
                  )
                  } />


              ) : (
                <> </>
              )

            }
          </Grid>

          {/* Region data */}
          <Grid item xs={2} lg={2}>
            {
              regionall ? (

                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={regionall}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option?.title}
                  renderOption={(props, option, { selected }) => (

                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8, color: 'blue' }}
                        checked={selected}
                      />
                      {option?.title}
                    </li>

                  )}
                  style={{ width: 150 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Region" placeholder="Select Type" />
                  )
                  } />


              ) : (
                <> </>
              )

            }
          </Grid>
          {/* Tenancy Data */}
          <Grid item xs={2} lg={2}>
        { 
        tenants?(
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={tenants}
              getOptionLabel={(option) => option.title}
              sx={{ width: 120 }}
              renderInput={(params) => <TextField {...params} label="Tenancy" />}
            />)
            :(
              <>
              
              </>
            )
        }
          </Grid>

          <Grid item xs={2}>
            <Link href="/mapp"><Button variant="contained" sx={{ bgcolor: 'black' }}>Map View</Button></Link>
          </Grid>
          {/* Lease Data grid */}
          <Grid item xs={2} lg={2}>

          </Grid>



          <Grid item xs={4} lg={4}>
            {

           leases?(

           
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={leases}
              getOptionLabel={(option) => option.title}
              sx={{ width: 130 }}
              renderInput={(params) => <TextField {...params} label="Lease Type" />}

            />
            ):(
              <>
              
              </>
            )

          }
          </Grid>




        </Grid>
      </Box>


      {
        data ?



          <div style={{ height: 400, width: '100%' }}>
            <DataGrid sx={{ color: 'blue', backgroundColor: 'burlywood' }}
              rows={respon as string[]}
              columns={columns}
              getRowId={(row) => row._id}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
          : <></>
      }

    </>
  )
}
