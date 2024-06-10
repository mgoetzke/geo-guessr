const { calculateRadialDistanceBetweenCoordinates: findDistanceTest, findBearing: findDirectionTest } = require('../utils/utils');

describe.skip('Utility Functions', () => {
    describe('findBearing', () => {
        it('should return correct bearing for NE direction', () => {
            const sourceCoordinates = { latitude: 10, longitude: 10 };
            const destinationCoordinates = { latitude: 20, longitude: 20 };
            expect(findDirectionTest(sourceCoordinates, destinationCoordinates)).toBe('NE');
        });
        it('should return correct bearing for N direction', () => {
            const sourceCoordinates = { latitude: 10, longitude: 10 };
            const destinationCoordinates = { latitude: 20, longitude: 10 };
            expect(findDirectionTest(sourceCoordinates, destinationCoordinates)).toBe('N');
        });
        // etc for all directions
    });

    describe('calculateRadialDistanceBetweenCoordinates', () => {
        it('should calculate radial distance between coordinates', () => {
            const sourceCoordinates = { latitude: 40, longitude: -74 };
            const destinationCoordinates = { latitude: 41, longitude: -75 };
            const distance = findDirectionTest(
                sourceCoordinates,
                destinationCoordinates
            );
            expect(distance).toBeCloseTo(139000, 2);
        });
    });
});

describe.skip('Main app', () => {
    describe('start game', () => {
        // calls for random city
        // calls for random landmark
    });

    describe('handle correct guess', () => {
        // returns true if same as current
    });

    describe('handle correct guess', () => {
        // returns distance and direction if false
    });
})