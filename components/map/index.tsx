import React, { useMemo } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { axiosInstance } from '@/Service/axiosInstance';
import {Rootmaptable } from '@/Typescript/maptableinter';
import { endpoint } from '../../pages/api/endpoint';
import { useQuery } from '@tanstack/react-query';
import { Rootmap } from '@/Typescript/mapinter';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import dynamic from 'next/dynamic';


const index = () => {

// map table 
const payload = {
    lat1
    : 
    38.805470223177466,
    lat2
    : 
    29.7453016622136,
    lng1
    : 
    -111.48925781250001,
    lng2
    : 
    -126.65039062500001,
    searchKeyword
    : 
    "",
    status
    : 
    "sold",
    zoom
    : 
    7
};

const columns: GridColDef[] = [
  { field: 'property name', headerName: 'property name', width: 70 },

  { field: 'address', headerName: 'Address', width: 70 },

  { field: 'state', headerName: 'State', width: 130 },

  { field: 'city', headerName: 'City', width: 130 },

  { field: 'price', headerName: 'Price', type: 'any', width: 90, },

  { field: 'cap', headerName: 'Cap.', type: 'any', width: 90, },

  { field: 'term', headerName: 'Term', type: 'any', width: 90, },

  { field: 'lease_type_data.', headerName: 'Lease Type', width: 130 },

  { field: 'property_type', headerName: 'Property Type', width: 130 },

  { field: 'days_to_close', headerName: 'Days on market', width: 90, },

  { field: 'increases', headerName: 'Increases', width: 90, },

  { field: 'status', headerName: 'Status', width: 90, },
]




// const requestOptions = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(payload),
// };


const {error:errors,data:tablemapData}=useQuery({
  queryKey:['tablema'],
  queryFn:async()=>{
    const res=await axiosInstance.post<Rootmaptable>(
      endpoint.pageEndpoint.tablemapend,payload
       )
       console.log("res table data",res.data.data);
       
       return res?.data.data
  }
})

  

console.log("map table",tablemapData);



// function getStaticProps() {
//   let posts = [];
//   try {
//     const res = await fetch('');
//     posts = await res.json();
//   } catch (error) {
//     console.error('Failed to fetch posts:', error);
//   }
//   return { props: { posts } };
// }


const fetchTablemap= useMemo(()=>{
  return tablemapData?.map((ele,idx:number)=>{
    return {...ele?.more_data, id:ele?.more_data?._id}
  }
  ) || []
},[tablemapData])


console.log("table",tablemapData)


//  map 

const DynamicMap=dynamic (()=>import ('./googleMap'),{
  ssr:false
})

const payloadmap={
  lat1
: 
38.805470223177466,
lat2
: 
29.7453016622136,
lng1
: 
-111.48925781250001,
lng2
: 
-126.65039062500001,
page_limit
: 
20,
page_no
: 
1,
searchKeywor
: 
"",
status
: 
"sold",
zoom
: 
7
}


const {error:error,data:mapData}=useQuery({
  queryKey:['maps'],
  queryFn:async()=>{
    const res=await axiosInstance.post<Rootmap>(
      endpoint.pageEndpoint.mapend,payloadmap
       )
       console.log("res map data",res?.data.data);
       
       return res?.data.data
  }
})
console.log(mapData,"map")

const fetchemap=mapData?.data?.map((ele)=>{


 

  return (
    {...ele,cluster_id:ele.cluster_id}
  )
}
)
console.log("mapdatas",mapData);


 
  return (
   <>
      <Grid container spacing={2}>
{/* table for map */}
        <Grid item xs={6}>
          <div style={{ height: 400, width: '100%' }}>
            {
              tablemapData ?  <DataGrid sx={{ color: 'blue', backgroundColor: 'burlywood' }}
              rows={fetchTablemap }
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />:null
            }
           
          </div>
           
       
        </Grid>
{/* google map */}


     <Grid item xs={6}>
   
      <DynamicMap/>
        </Grid> 
       
       
      </Grid>

   </>
  )
}

export default index
