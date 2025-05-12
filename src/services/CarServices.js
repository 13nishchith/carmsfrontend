import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:9091/api/cars";

export const listAllCars = () => axios.get(REST_API_BASE_URL);
export const createCars = (car) => axios.post(REST_API_BASE_URL, car);
export const updateCars = (carId, car) => axios.put(REST_API_BASE_URL + "/" + carId, car);
export const getCarsById = (carId) => axios.get(REST_API_BASE_URL+ "/" + carId);
export const deleteCarsById = (carId) => axios.delete(REST_API_BASE_URL + "/" + carId);
