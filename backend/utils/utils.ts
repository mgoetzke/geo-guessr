interface Coordinates {
    latitude: number;
    longitude: number;
}

const findBearing = (sourceCoordinates: Coordinates,
    destinationCoordinates: Coordinates) => {
    const dLat = sourceCoordinates.latitude - destinationCoordinates.latitude;
    const dLon = sourceCoordinates.longitude - destinationCoordinates.longitude;

    if (dLat > 0 && dLon > 0) {
        return 'NE';
    } else if (dLat > 0 && dLon < 0) {
        return 'NW';
    } else if (dLat < 0 && dLon > 0) {
        return 'SE';
    } else if (dLat < 0 && dLon < 0) {
        return 'SW';
    } else if (dLat > 0) {
        return 'N';
    } else if (dLat < 0) {
        return 'S';
    } else if (dLon > 0) {
        return 'E';
    } else if (dLon < 0) {
        return 'W';
    } else {
        return 'N';
    }
}

const getRadiansFromDegrees = (degrees: number) => {
    return (degrees * Math.PI) / 180;
}

const calculateRadialDistanceBetweenCoordinates = (
    sourceCoordinates: Coordinates,
    destinationCoordinates: Coordinates
) => {
    const EARTH_RADIUS_IN_METERS = 6371e3; const sourceLatitudeInRadians = getRadiansFromDegrees(
        sourceCoordinates.latitude
    );
    const destinationLatitudeInRadians = getRadiansFromDegrees(
        destinationCoordinates.latitude
    );

    const latitudeDifference = getRadiansFromDegrees(
        destinationCoordinates.latitude - sourceCoordinates.latitude
    );
    const longitudeDifference = getRadiansFromDegrees(
        destinationCoordinates.longitude - sourceCoordinates.longitude
    );
    const haversineOfCentralAngle =
        Math.pow(Math.sin(latitudeDifference / 2), 2) +
        Math.cos(sourceLatitudeInRadians) *
        Math.cos(destinationLatitudeInRadians) *
        Math.pow(Math.sin(longitudeDifference / 2), 2);

    const centralAngle = 2 * Math.atan2(
        Math.sqrt(haversineOfCentralAngle),
        Math.sqrt(1 - haversineOfCentralAngle)
    );
    const distanceInMeters = EARTH_RADIUS_IN_METERS * centralAngle;
    return Number(distanceInMeters.toFixed(3));
};


module.exports = {
    findBearing,
    calculateRadialDistanceBetweenCoordinates
};