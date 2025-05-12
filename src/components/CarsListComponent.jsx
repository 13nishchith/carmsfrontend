import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { listAllCars,deleteCarsById } from '../services/CarServices'

const CarsListComponent = () => {
  const [cars, setCars] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    getAllCars()
  }, [])

  function getAllCars() {
    listAllCars()
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewCars() {
    navigator("/add-cardetails")
  }

  function updateNewCars(carId) {
    navigator(`/update-cardetails/${carId}`)
  }

  function removeCars(carId) {
    console.log(carId);

    deleteCarsById(carId)
      .then((response) => {
        alert("Car Details Deleted Successfully")
        console.log(response.data);
        getAllCars();
      })
      .catch((error) => {
        console.error(error);
      })
  }

  return (
    <div className="container">
      <h2 className="text-center">Car Specifications</h2>
      <button
        type="button"
        className="btn btn-primary mb-2"
        onClick={addNewCars}
      >
        Add New Car Details
      </button>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Car Id</th>
            <th>Car Make</th>
            <th>Car Model</th>
            <th>Manufacture Year</th>
            <th>Color</th>
            <th>FuleType</th>
            <th>Transmission</th>
            <th>Mileage</th>
            <th>Price</th>
            <th>Car Type</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => 
            <tr key={car.carId}>
              <td>{car.carId}</td>
              <td>{car.carMake}</td>
              <td>{car.carModel}</td>
              <td>{car.manufactureYear}</td>
              <td>{car.color}</td>
              <td>{car.fuleType}</td>
              <td>{car.transmission}</td>
              <td>{car.mileage}</td>
              <td>{car.price}</td>
              <td>{car.carType}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => updateNewCars(car.carId)}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeCars(car.carId)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}  

export default CarsListComponent