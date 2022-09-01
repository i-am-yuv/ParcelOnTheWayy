export class UserOrderDetails
{
    orderId !: number ;
    travellerId !: number ;
    deliverDate !: Date ;
    orderStatus !:String;
    
    orderStartTime !: number;
    orderEndTime !: number;

    orderPickUpLocation !: String ;
    orderDropLocation !: String ;

    travellerName !: String ;
    travellerMobileNumber !: String ;
}