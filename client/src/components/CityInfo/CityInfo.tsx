import './CityInfo.css';
import { DisplayCity } from '../../../../types/types';


type Props = {
    cityInfo: DisplayCity;
}

export const CityInfo = (props: Props): JSX.Element => {
    const {cityInfo} = props;

    return (
        <div className="Card">
            <div className="Card-Header">
                <span>{cityInfo.name}</span>
            </div>
            <div className="Card-Body">
                <span>Country: {cityInfo.country}</span>
                <span>Continent: {cityInfo.continent}</span>
                <span>Founded: {cityInfo.founded}</span>
                <span>Population: {cityInfo.population}</span>
            </div>
        </div>
    );
}

export default CityInfo;

