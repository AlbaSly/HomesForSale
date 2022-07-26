import { LocationsModel } from "../../models/Locations.model";
import { ResolveResponse, RejectResponse } from "../../interfaces/response.interface";
import { LocationCreation, LocationModification } from '../../interfaces/controllers/location.interface';

export class LocationController {
    constructor() {}

    public CreateLocation(location: LocationCreation): Promise<ResolveResponse | RejectResponse> {
        return new Promise(async (resolve: (info: ResolveResponse) => void, reject: (reason: RejectResponse) => void) => {
            try {
                const locationCreated = await LocationsModel.create(location);

                resolve({
                    msg: 'Location created',
                    data: {
                        locationCreated
                    }
                });
            } catch (error: any) {
                reject({
                    msg: 'An error has occurred during location creation',
                    error: true,
                    errorDetails: error
                });
            }
        });
    }

    public UpdateLocation(location: LocationModification): Promise<ResolveResponse | RejectResponse> {
        return new Promise(async (resolve: (info: ResolveResponse) => void, reject: (reason: RejectResponse) => void) => {
            try {
                const locationFound = await LocationsModel.findOne({
                    where: {
                        property: location.property
                    }  
                });

                if (!locationFound) {
                    reject({
                        msg: 'Location not found',
                        error: false
                    });

                    return;
                }

                let {property, ...locationObj} = location;

                Object.assign(locationFound, locationObj);

                await locationFound.save();

                resolve({
                    msg: 'Location updated'
                });
            } catch (error: any) {
                reject({
                    msg: 'An error has occurred during location modification',
                    error: true,
                    errorDetails: error
                });
            }
        });
    }

    public GetLocation(id_property: string): Promise<ResolveResponse | RejectResponse> {
        return new Promise(async (resolve: (info: ResolveResponse) => void, reject: (reason: RejectResponse) => void) => {
            try {
                const locationFound = await LocationsModel.findOne({
                    where: {
                        property: id_property
                    }
                });

                if (!locationFound) {
                    reject({
                        msg: 'Location not found',
                        error: false
                    });
                    return;
                }

                resolve({
                    msg: 'Location obtained',
                    data: {
                        locationFound
                    }
                });
            } catch (error: any) {
                reject({
                    msg: 'An error has occurred while getting location',
                    error: true,
                    errorDetails: error
                });
            }
        });
    }
}