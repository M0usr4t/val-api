import { Key, useEffect, useState } from "react";
import "./maps.css";
import { fetchApiData } from "../../api/API-fetch";
import { Button, Modal,Image } from "semantic-ui-react";


export const MapsPage = () => {
    const [maps, setMaps] = useState<any>(null);
    const [showMiniMap, setShowMiniMap] = useState(false);
    const [selectedMap, setMapSelected] = useState<any>(null);
    const [closeMap, setCloseMap] = useState<any>(null);
    
    const handleMapClicked = (map: any) => {
        setMapSelected(map);
        setShowMiniMap(true);
    }

    const handleCloseMap =() =>{
        setMapSelected(null);
        setShowMiniMap(false);
    }


    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchApiData
            ('https://valorant-api.com/v1/maps');
            setMaps(data.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (maps !== null) {
            console.log(maps)
        }
    }, [maps]);

    
    return (
        <div className="maps-page">
        {maps !== null &&
          maps?.map(
            (
              map: { displayName: any; coordinates: any; displayIcon: any; splash: any },
              index: Key | null | undefined
            ) => {
              return (
                <div className="maps-info-wrapper" key={index}>    
                    <div className="map-info">
                        <h1 className="map-name">{map.displayName}</h1>
                        <h3 className="map-coordinates">{map.coordinates}</h3>
                        <Button className="mini-map-button" variant="primary" onClick={() => handleMapClicked(map)}>
                            View In-game Mini Map
                        </Button>
                    </div>
                    <div className="map-image">
                        <Image className="map-display-icon" src={map.splash} />
                    </div>
                </div>
              );
            }
          )}
  
        {selectedMap && (
          <div className="in-game-map">
            <div className="mini-map-icon-container">
              {selectedMap.displayIcon !== null ? (
              <Image className="mini-map-display-icon" src={selectedMap.displayIcon} />
              ) : (
                <p className="no-mini-map"> No Mini Map Available </p>
              )
              }
            </div>
            <Button variant="primary" onClick={handleCloseMap} className="close-button">
              X
            </Button>
          </div>
        )}
      </div>
    )
}