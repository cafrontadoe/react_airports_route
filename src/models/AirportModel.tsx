export default interface AirportModel {    
        id: string;
        lat: number;
        lng: number;
        label: string;
        city: string;
        state: string;
        country: string;
        woeid: string;
        tz: string;
        phone: string;
        type: string;
        email: string;
        url: string,
        runway_length: string | null,
        elev?: string | null,
        icao: string,
        direct_flights: string,
        carriers: string
}