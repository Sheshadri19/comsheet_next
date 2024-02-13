import { axiosInstance } from '@/Service/axiosInstance'
import { Rootmap } from '@/Typescript/mapinter'
import React, { useState } from 'react'
import { endpoint } from '../../pages/api/endpoint'
import { useQuery } from '@tanstack/react-query'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import { Box, Button } from '@mui/material'
import 'leaflet/dist/leaflet.css';

import { Icon } from 'leaflet'
import { FullscreenControl } from 'react-leaflet-fullscreen'
import { assets } from '@/Json/Assets'
import "react-leaflet-fullscreen/styles.css";
interface position {
  lat: number,
  long: number
}


const googleMap = () => {


  const payloadmap = {
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

  const myicons = new Icon({
    iconUrl: assets.icons,
    iconSize: [32, 32]

  })
  const { error: error, data: mapData } = useQuery({
    queryKey: ['maps'],
    queryFn: async () => {
      const res = await axiosInstance.post<Rootmap>(
        endpoint.pageEndpoint.mapend, payloadmap
      )
      console.log("res map data", res?.data.data);

      return res?.data.data
    }
  })
  console.log(mapData, "map")

  const fetchemap = mapData?.data?.map((ele) => {

    return (
      { ...ele, cluster_id: ele.cluster_id }
    )
  }
  )
  console.log("mapdatas", mapData);

  const position = [51.505, -0.09]

  const [mapclick, setmapClick] = useState(false)
  



  return (

    <>

<Button onClick={() => setmapClick(!mapclick)} sx={{bgcolor:'#f76f54', color:'black'}} >Map view</Button>

      {!mapclick ?

        (
          <>
            <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={true}
              style={{
                height: '51vh'
              }}
            >
              <TileLayer
                key="stretview"
                attribution="Tiles &copy;"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />

              {fetchemap?.map((item, idx) => {
                return (
                  <>
                    <Marker position={[item.location.lat, item.location.lng]} icon={myicons} >
                      <Popup>

                        Property : {item.more_data.property_name} <br />
                        address{item.more_data.address} <br />
                        City :{item.more_data.city} <br />
                        Region :   {item.more_data.region} <br />
                        Zipcode : {item.more_data.zipcode}

                      </Popup>

                    </Marker>
                  </>
                )
              })

              }

              <FullscreenControl />
            </MapContainer>
          </>

        )

        : (

          <>

            <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={true}
              style={{
                height: '51vh'
              }}
            >

              <TileLayer
                key="mapview"
                attribution='&copy; Avik'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {fetchemap?.map((item, idx) => {
                return (
                  <>
                    <Marker position={[item.location.lat, item.location.lng]} icon={myicons} >
                      <Popup>

                        Property : {item.more_data.property_name} <br />
                        address{item.more_data.address} <br />
                        City :{item.more_data.city} br
                        Region :   {item.more_data.region} <br />
                        Zipcode : {item.more_data.zipcode}

                      </Popup>

                    </Marker>
                  </>
                )
              })

              }

              <FullscreenControl />
            </MapContainer>


          </>
        )
      }

    </>

  )

}

export default googleMap
