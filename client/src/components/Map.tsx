import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl =
    "https://gist.githubusercontent.com/alexwebgr/10249781/raw/2df84591a9e1fb891bcfde3a3c41d6cfc70cb5ee/world-topo.json"

type Props = {
    handleMapClick: ({ countryName, latitude, longitude }: { countryName: string, latitude: number, longitude: number }) => void;
}

export default function MapChart(props: Props) {
    const  {handleMapClick} = props;
    const handleClick = (geo: any) => () => {
        handleMapClick({countryName: geo.name, latitude: geo.lat, longitude: geo.lon})
    };

    return (
        <ComposableMap projectionConfig={{
            scale: 85,
            }}
            width={600}
            height={300}>
            <Geographies geography={geoUrl}>
                {({ geographies }) =>
                    geographies.map((geo) => (
                        <Geography key={geo.rsmKey}
                            onClick={handleClick(geo.properties)}
                            geography={geo} 
                            fill="#FF5533"
                            stroke="#000000" 
                            style={{
                                default: { outline: "none" },
                                hover: { outline: "none" },
                                pressed: { outline: "none" },
                            }} />
                    ))
                }
            </Geographies>
        </ComposableMap>
    )
}
