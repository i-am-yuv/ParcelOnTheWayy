export class UserOrderDetails
{
    orderId !: number ;
    orderDate !: Date;
    orderStatus !:String;
    
    orderStartTime !: number;
    orderEndTime !: number;

    orderPickUpLocation !: String ;
    orderDropLocation !: String ;

    travellerName !: String ;
    travellerMobileNumber !: String ;
}