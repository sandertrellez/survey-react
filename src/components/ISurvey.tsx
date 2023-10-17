export interface ISurvey {
    id: number;
    customer_identification: string;
    car_model: string;
    factors_taken_into_account_when_purchasing: string;
    test_drive_rating: number;
    satisfaction_rating: number;
    factor:{
        description:string
    }
}
