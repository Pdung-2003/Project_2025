import mainRequest from "@/api/mainRequest";

export const getMyBookings = async () => {
    const response = await mainRequest.get('/api/bookings/my-booking');
    return response.data;
}
