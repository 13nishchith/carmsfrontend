import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { createCars, getCarsById, updateCars } from '../services/CarServices'

const CarsComponent = () => {

    const [carMake, setCarMake] = useState('')
    const [carModel, setCarModel] = useState('')
    const [manufactureYear, setManufactureYear] = useState('')
    const [color, setColor] = useState('')
    const [fuleType, setFuleType] = useState('')
    const [transmission, setTransmission] = useState('')
    const [mileage, setMileage] = useState('')
    const [price, setPrice] = useState('')
    const [carType, setCarType] = useState('')

    const {carId} = useParams();

    const [errors, setErrors] = useState({
        carMake:'',
        carModel:'',
        manufactureYear:'',
        color:'',
        fuleType:'',
        transmission:'',
        mileage:'',
        price:'',
        carType:''
    })

    const navigator = useNavigate();

    useEffect(() => {
      if(carId){
        getCarsById(carId).then((response) => {
            setCarMake(response.data.carMake);
            setCarModel(response.data.carModel);
            setManufactureYear(response.data.manufactureYear);
            setColor(response.data.color);
            setFuleType(response.data.fuleType);
            setTransmission(response.data.transmission);
            setMileage(response.data.mileage);
            setPrice(response.data.price);
            setCarType(response.data.carType);   
        }).catch(error => {
          console.error(error);
        })
      }
    }, [carId])

    function saveOrUpdateEmployee(c){
      c.preventDefault();
      if(validateForm()){
        const car = {carMake, carModel, manufactureYear, color, fuleType, transmission, mileage, price, carType}
        console.log(car);
        if(carId){
          updateCars(carId, car).then((response) => {
            console.log(response.data);
            navigator('/cars')
            alert("Car data submitted successfully!")
            c.preventDefault();
          }).catch(error => {
            console.error(error);
          })
        }else{
          createCars(car).then((response) => {
          console.log(response.data);
          navigator('/cars')
          alert("Car data submitted successfully!")
          c.preventDefault();
        }).catch(error => {
          console.error(error);
        })
      }
        
      }
      
    }

    const validateForm = () => {
      let valid = true;
      const errorCopy = {...errors}

      if (carMake && typeof carMake === 'string') {
        const trimmedMake = carMake.trim();
        
        if (trimmedMake.length === 0) {
          errorCopy.carMake = 'Car make is required';
          valid = false;
        }
        else if (/^\d+$/.test(trimmedMake)) {
          errorCopy.carMake = 'Car make cannot be numbers';
          valid = false;
        }
        else if (!/^[a-zA-Z\s]+$/.test(trimmedMake)) {
          errorCopy.carMake = 'Only letters and spaces allowed';
          valid = false;
        }
        else if (trimmedMake.length < 2 || trimmedMake.length > 50) {
          errorCopy.carMake = 'Car make must be 2-50 characters';
          valid = false;
        }
        else {
          errorCopy.carMake = '';
        }
      } else {
        errorCopy.carMake = 'Car make is required';
        valid = false;
      }

      if (carModel && typeof carModel === 'string') {
        const trimmedModel = carModel.trim();
        
        if (trimmedModel.length === 0) {
          errorCopy.carModel = 'Car model is required';
          valid = false;
        } 
        else if (/^\d+$/.test(trimmedModel)) {
          errorCopy.carModel = 'Car model cannot be numbers';
          valid = false;
        }
        else if (trimmedModel.length > 50) {
          errorCopy.carModel = 'Car model must be 50 characters or less';
          valid = false;
        }
        else if (!/[a-zA-Z]/.test(trimmedModel)) {
          errorCopy.carModel = 'Must contain at least one letter';
          valid = false;
        }
        else {
          errorCopy.carModel = '';
        }
      } else {
        errorCopy.carModel = 'Car model is required';
        valid = false;
      }

      if (manufactureYear && typeof manufactureYear === 'string') {
        const trimmedYear = manufactureYear.trim();
        const currentYear = new Date().getFullYear();
        
        // Check for 4 digits and valid year range (1900-current year)
        if (/^\d{4}$/.test(trimmedYear)) {
          const yearNum = parseInt(trimmedYear, 10);
          if (yearNum >= 1900 && yearNum <= currentYear) {
            errorCopy.manufactureYear = '';
          } else {
            errorCopy.manufactureYear = `Year must be between 1900-${currentYear}`;
            valid = false;
          }
        } else {
          errorCopy.manufactureYear = 'Must be a 4-digit year (YYYY format)';
          valid = false;
        }
      } else {
        errorCopy.manufactureYear = 'Manufacture year is required';
        valid = false;
      }
    

      if (color && typeof color === 'string') {
        const trimmedColor = color.trim();
        
        if (trimmedColor.length === 0) {
          errorCopy.color = 'Color is required';
          valid = false;
        } 
        else if (/^\d+$/.test(trimmedColor)) {
          errorCopy.color = 'Color cannot be numbers';
          valid = false;
        }
        else if (trimmedColor.length > 30) {
          errorCopy.color = 'Color must be 30 characters or less';
          valid = false;
        }
        else if (!/^[a-zA-Z\s]+$/.test(trimmedColor)) {
          errorCopy.color = 'Only letters and spaces allowed';
          valid = false;
        }
        else {
          errorCopy.color = '';
        }
      } else {
        errorCopy.color = 'Color is required';
        valid = false;
      }

      if (mileage && typeof mileage === 'string') {
        const mileageRegex = /^\d+\s?(km|miles)$/i;
        if (mileageRegex.test(mileage.trim())) {
          errorCopy.mileage = '';
        } else {
          errorCopy.mileage = 'Must be a number followed by "km" or "miles" (e.g., 15000 km)';
          valid = false;
        }
      } else {
        errorCopy.mileage = 'Mileage is required';
        valid = false;
      }
    

      if (price !== null && price !== undefined && !isNaN(price)) {
        // First check if price is zero or negative
        if (price <= 50000) {
          errorCopy.price = "Price must be greater than 50000";
          valid = false;
        } else {
          // Convert to string to check digit lengths
          const priceStr = price.toString();
          const parts = priceStr.split(".");

          // Check integer part (max 7 digits) and fraction part (exactly 2 digits)
          if (
            parts[0].length <= 7 &&
            (parts.length === 1 || parts[1].length === 2)
          ) {
            errorCopy.price = "";
          } else {
            errorCopy.price =
              "Price must have max 7 whole digits and exactly 2 decimals";
            valid = false;
          }
        }
      } else {
        errorCopy.price = "Price must be a valid number";
        valid = false;
      }
      setErrors(errorCopy);
      return valid;
    }

    function pageTitle(){
      if(carId){
        return <h2 className='text-center'>Update Car information</h2>;
      }else{
        return <h2 className='text-center'>Add Car information</h2>;
      }
    }

  return (
    <div className="container back-ground-image">
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">CarMake:</label>
                <input
                  type="text"
                  placeholder="Enter Car Making Company Name"
                  name="carMake"
                  value={carMake}
                  className={`form-control ${
                    errors.carMake ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setCarMake(e.target.value)}
                ></input>
                {errors.carMake && (
                  <div className="invalid-feedback">{errors.carMake}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">CarModel:</label>
                <input
                  type="text"
                  placeholder="Enter Car Model Name"
                  name="carModel"
                  value={carModel}
                  className={`form-control ${
                    errors.carModel ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setCarModel(e.target.value)}
                ></input>
                {errors.carModel && (
                  <div className="invalid-feedback">{errors.carModel}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">ManufactureYear:</label>
                <input
                  type="text"
                  placeholder="Enter Car Manufacture Year"
                  name="manufactureYear"
                  value={manufactureYear}
                  className={`form-control ${
                    errors.manufactureYear ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setManufactureYear(e.target.value)}
                ></input>
                {errors.manufactureYear && (
                  <div className="invalid-feedback">
                    {errors.manufactureYear}
                  </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">color:</label>
                <input
                  type="text"
                  placeholder="Enter Car Body Color"
                  name="color"
                  value={color}
                  className={`form-control ${errors.color ? "is-invalid" : ""}`}
                  onChange={(e) => setColor(e.target.value)}
                ></input>
                {errors.color && (
                  <div className="invalid-feedback">{errors.color}</div>
                )}
              </div>
              {/* <div className="form-group mb-2">
                <label className="form-label">fuleType:</label>
                <select
                  name="fuleType"
                  value={fuleType}
                  className={`form-control ${
                    errors.fuleType ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setFuleType(e.target.value)}
                >
                  <option value="">Select Fule Type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Gasoline">Gasoline</option>
                </select>
                {errors.fuleType && (
                  <div className="invalid-feedback">{errors.fuleType}</div>
                )}
              </div> */}
              <div className="form-group mb-2">
  <label className="form-label">Fuel Type:</label>
  <div>
    {["Petrol", "Diesel", "Electric", "Hybrid", "Gasoline"].map((type) => (
      <div className="form-check form-check-inline" key={type}>
        <input
          className={`form-check-input ${errors.fuleType ? "is-invalid" : ""}`}
          type="radio"
          name="fuleType"
          id={`fuleType-${type}`}
          value={type}
          checked={fuleType === type}
          onChange={(e) => setFuleType(e.target.value)}
        />
        <label className="form-check-label" htmlFor={`fuleType-${type}`}>
          {type}
        </label>
      </div>
    ))}
    {errors.fuleType && (
      <div className="invalid-feedback d-block">{errors.fuleType}</div>
    )}
  </div>
</div>

              <div className="form-group mb-2">
                <label className="form-label">Transmission:</label>
                <select
                  name="transmission"
                  value={transmission}
                  className={`form-control ${
                    errors.transmission ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setTransmission(e.target.value)}
                >
                  <option value="">Select Transmission</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
                {errors.transmission && (
                  <div className="invalid-feedback">{errors.transmission}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">mileage:</label>
                <input
                  type="text"
                  placeholder="Enter total kilometers/miles driven" 
                  name="mileage"
                  value={mileage}
                  className={`form-control ${
                    errors.mileage ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setMileage(e.target.value)}
                ></input>
                {errors.mileage && (
                  <div className="invalid-feedback">{errors.mileage}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">price:</label>
                <input
                  type="text"
                  placeholder="Enter Car price"
                  name="price"
                  value={price}
                  className={`form-control ${errors.price ? "is-invalid" : ""}`}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
                {errors.price && (
                  <div className="invalid-feedback">{errors.price}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">carType:</label>
                <select
                  name="carType"
                  value={carType}
                  className={`form-control ${
                    errors.carType ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setCarType(e.target.value)}
                >
                  <option value="">Select carType</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Truck">Truck</option>
                  <option value="Van">Van</option>
                  <option value="Other">Other</option>
                </select>
                {errors.carType && (
                  <div className="invalid-feedback">{errors.carType}</div>
                )}
              </div>
              <button
                className="btn btn-success"
                onClick={saveOrUpdateEmployee}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarsComponent