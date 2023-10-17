import { createContext, useState } from "react"
import Cookies from "universal-cookie";

export const SurveyContext = createContext({});


export default function SurveyProvider ({children}:any) {
    const [showModal, setShowModal] = useState(false);
    const cookie = new Cookies()

    const [token, setToken] = useState(cookie.get('token'));

    const openModal = (option?:string ,id?:number, customerIdentification?:string, carModel?:string,
        factorsTakenIntoAccountWhenPurchasing?:number, testDriveRating?:number,
        satisfactionRating?:number) => {
          setShowModal(true);
          setOption(option || 'Create');
          setIdSurvey(id);
          setCustomerIdentification(customerIdentification || '');
          setCarModel(carModel || '');
          setFactorsTakenIntoAccountWhenPurchasing(factorsTakenIntoAccountWhenPurchasing);
          setTestDriveRating(testDriveRating);
          setSatisfactionRating(satisfactionRating);
        };
      
      const [option, setOption] = useState<string>('Create');
      const [idSurvey, setIdSurvey] = useState<number>();
      const [customerIdentification, setCustomerIdentification] = useState<string>('');
      const [carModel, setCarModel] = useState<string>('');
      const [factorsTakenIntoAccountWhenPurchasing, setFactorsTakenIntoAccountWhenPurchasing] = useState<number>();
      const [testDriveRating, setTestDriveRating] = useState<number | undefined>();
      const [satisfactionRating, setSatisfactionRating] = useState<number| undefined>();

    return(

        <SurveyContext.Provider
            value={{
                token, setToken,
                showModal, setShowModal,
                openModal,
                option, setOption,
                idSurvey, setIdSurvey,
                customerIdentification, setCustomerIdentification,
                carModel, setCarModel,
                factorsTakenIntoAccountWhenPurchasing, setFactorsTakenIntoAccountWhenPurchasing,
                testDriveRating, setTestDriveRating,
                satisfactionRating, setSatisfactionRating
            }}
        >
            {children}
        </SurveyContext.Provider>
    )
}