export type Direction = 'N' | 'S' | 'E' | 'W' | 'NW' | 'NE' | 'SW' | 'SE';

export interface City {
    name: string;
    name_native: string;
    country: string;
    continent: string;
    latitude: number;
    longitude: number;
    population: string;
    founded: string;
    landmarks: string[];
}

export type DisplayCity = Omit<City, 'landmarks' | 'latitude' | 'longitude'>;

interface Answer {
    correct: boolean;
}

export interface CorrectAnswer extends Answer {
    city: DisplayCity
}

export interface IncorrectAnswer extends Answer {
    distance: number;
    direction: Direction;
}
