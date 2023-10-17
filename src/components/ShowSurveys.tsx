import { useEffect, useState, useContext} from 'react'
import axios from 'axios'
import { showAlert } from '../functions'
import { ISurvey } from './ISurvey'
import './showSurvey.scss'
import FormSurvey from './FormSurvey'
import { SurveyContext } from '../contexts/SurveyContext'
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import Cookies from 'universal-cookie'
import { Navigate } from 'react-router-dom'


const ShowSurvey = () => {

    const { openModal, token } = useContext(SurveyContext) as any;

    //Si hay sesion iniciada se redirige
    const cookie = new Cookies();

    const url = 'http://localhost:3333';

    const [surveys, setSurveys] = useState<Array<ISurvey>>([]);


    useEffect(():any=>{
        getSurveys();
    },[]);

    const logout = () => {
        cookie.remove('token');

        return (
            <Navigate
            to={"/login"}
            />)        
    }

    if(!cookie.get('token')){
        logout();
    }
    

    const getSurveys = async () => {
        await axios.get(url+'/survey',{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => setSurveys(response.data.data))
        .catch(error => console.log(error))        
    }

    const deleteSurvey = async (idSurvey:number) => {
  
        await axios.delete(url+'/survey/'+idSurvey,{
            headers:{
              'Authorization': `Bearer ${token}`
            }
        })
        .then((response)=>{
            getSurveys();
            showAlert(`Encuesta eliminada con exito`, 'success');     
        })
        .catch((error) =>{
          console.log(error)
          showAlert("Error al procesar la solicitud", 'warning',error);  
        }) 
    }

    const confirmDelete = (idSurvey:number) =>{

        const MySwal = withReactContent(Swal);
        
        MySwal.fire({
            title: 'Seguro que desea eliminar esta encuesta?',
            text: "Las encuestas eliminadas no se pueden recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#777',
            confirmButtonText: 'Sí, elimiar!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteSurvey(idSurvey);
            }
          })
    }
        
    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <div className='grid'>
                            
                            <FormSurvey
                            reload={getSurveys}
                            ></FormSurvey>

                            <button className="registro-modal__button" onClick={()=>logout()}>
                                Salir
                            </button>
                        </div>                        
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <div className='table-responsive'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Identificación cliente</th>
                                        <th>Modelo del auto</th>
                                        <th>Factores</th>
                                        <th>Calificación de prueba de  manejo</th>
                                        <th>Calificación de satisfacción</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Array.isArray(surveys) && surveys ? (
                                            surveys.map((survey) => (
                                            <tr key={survey.id}>
                                                <td>{survey.id}</td>
                                                <td>{survey.customer_identification}</td>
                                                <td>{survey.car_model}</td>
                                                <td>{survey.factor.description}</td>
                                                <td>{survey.test_drive_rating}</td>
                                                <td>{survey.satisfaction_rating}</td>
                                                <td>
                                                    <button className='btn'
                                                    onClick={()=>{
                                                        openModal('Edit',survey.id,
                                                        survey.customer_identification, survey.car_model,
                                                        survey.factors_taken_into_account_when_purchasing,
                                                        survey.test_drive_rating, survey.satisfaction_rating)
                                                    }}>
                                                        <i className='fa-solid fa-edit'></i>Editar
                                                    </button>
                                                    &nbsp;
                                                    <button className='btn'
                                                    onClick={()=>{
                                                        confirmDelete(survey.id)
                                                    }}
                                                    >
                                                        <i className='fa-solid fa-trash'></i>Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6}>No hay encuestas realizadas</td>
                                            </tr>
                                        )
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </div>
            

        </div>
    )

}

export default ShowSurvey;