import {useEffect, useState, useContext } from 'react';
import './FormSurvey.scss';
import axios from 'axios'
import { IFactor } from './IFactor';
import Rating from './Rating';
import { SurveyContext } from '../contexts/SurveyContext';
import { showAlert } from '../functions';

const FormSurvey = ({reload}:any) => {

  const {
    showModal, setShowModal, openModal, option, idSurvey, customerIdentification,
    setCustomerIdentification, setCarModel, testDriveRating,
    setTestDriveRating, satisfactionRating, setSatisfactionRating,
    carModel, factorsTakenIntoAccountWhenPurchasing,
    setFactorsTakenIntoAccountWhenPurchasing, token
  
  } = useContext(SurveyContext) as any;
  
  const closeModal = () => setShowModal(false);

  const url = 'http://localhost:3333';

  const [factors, setFactors] = useState<Array<IFactor>>([]);

  useEffect(()=>{
      getFactors();
  },[]);

  const getFactors = async () => {
      await axios.get(url+'/factor',{
          headers:{
              'Authorization': `Bearer ${token}`
          }
      })
      .then(response => setFactors(response.data.data))
      .catch(error => console.log(error))        
  }

    const saveSurvey = async () => {

      const data = {
        customerIdentification,
        carModel,
        factorsTakenIntoAccountWhenPurchasing,
        testDriveRating,
        satisfactionRating
      }

      const method = (option === "Create")?'POST':'PUT';
      const url2 = url+'/survey'+((option === "Create")?'':'/'+idSurvey);

      console.log(url2)
      await axios({method,url:url2, data,
        headers:{
            'Authorization': `Bearer ${token}`
        }
      })
      .then((response)=>{
        reload();
        showAlert(`Encuesta ${(option === "Create")?'creada':'editada'} con exito`, 'success');     
        closeModal()
      })
      .catch((error) =>{
        console.log(error)

        const errorMessages = error.response.data.message.map((error: { message: any; }) => 
        `<li>${error.message}</li>`)
        .join('');
        showAlert("Error al procesar la solicitud", 'warning',errorMessages);

      }) 
    }

  return (
    <div className="registro-modal">
      <button className="registro-modal__button" onClick={()=>openModal()}>
        Nueva encuesta
      </button>
      {showModal && (
        <div className="registro-modal__modal">
          <div className="registro-modal__modal-content">
            <span className="registro-modal__modal-close" onClick={closeModal}>
              &times;
            </span>
            <h2>{option==='Create'?'Nueva encuesta':'Editar encuesta'}</h2>
            <form>
              <div className="registro-modal__modal-form">

                <div className="registro-modal__modal-form-row">
                  <label htmlFor="customerIdentification">Identificación cliente</label>
                  <input type="text" id="customerIdentification" value={customerIdentification}
                  onChange={(e)=>setCustomerIdentification(e.target.value)} required/>
                </div>

                <div className="registro-modal__modal-form-row">
                  <label htmlFor="carModel">Modelo del automóvil</label>
                  <input type="text" id="carModel" value={carModel}
                  onChange={(e)=>setCarModel(e.target.value)} required/>
                </div>

                <div className="registro-modal__modal-form-row">
                  <label htmlFor="factorsTakenIntoAccountWhenPurchasing">Factor</label>
                  <select id="factorsTakenIntoAccountWhenPurchasing"
                  onChange={(e)=>{
                    setFactorsTakenIntoAccountWhenPurchasing(e.target.value)
                  }}
                  value={factorsTakenIntoAccountWhenPurchasing} required>
                    <option></option>
                    {factors.map((option, index) => (
                      <option key={index} value={option.id}>
                        {option.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="registro-modal__modal-form-row">
                  <label htmlFor="testDriveRating">Calificación de prueba de manejo</label>
                  <Rating
                    count={5}
                    size={24}
                    value={testDriveRating}
                    setRating={setTestDriveRating}
                    color="#CCC"
                    activeColor="#F4B400"
                  />
                </div>

                <div className="registro-modal__modal-form-row">
                  <label htmlFor="satisfactionRating">Calificación de satisfacción</label>
                  <Rating
                    count={5}
                    size={24}
                    value={satisfactionRating}
                    setRating={setSatisfactionRating}
                    color="#CCC"
                    activeColor="#F4B400"
                  />
                </div>
              </div>
              <input type='button' className="registro-modal__modal-register-button"
                onClick={()=>{
                  saveSurvey()
                }} value={"Guardar"} />
            </form>
          </div>
        </div>
      )}

      

    </div>
  );
};

export default FormSurvey;
