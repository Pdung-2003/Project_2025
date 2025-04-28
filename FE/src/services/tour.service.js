import mainRequest from "@/api/mainRequest";

export const getTours = async (params) => {
    const response = await mainRequest.get("/api/tours", { params });
    return response.data;
};