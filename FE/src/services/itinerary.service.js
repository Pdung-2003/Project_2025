import mainRequest from "@/api/mainRequest";

export const getItinerariesByTourId = async (tourId) => {
    const response = await mainRequest.get(`/api/itineraries/tour/${tourId}`);
    return response.data;
};

export const createItinerary = async (body) => {
    const response = await mainRequest.post('/api/itineraries', body, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};


export const deleteItinerary = async (id) => {
    const response = await mainRequest.delete(`/api/itineraries/${id}`);
    return response.data;
};