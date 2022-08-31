export class OrderDetails
{
    orderId !: number ;
    deliverDate !: Date ;
    
    orderStatus !:String;
    
    orderStartTime !: number;
    orderEndTime !: number;

    orderPickUpLocation !: String ;
    orderDropLocation !: String ;

    CustomerName !: String ;
    CustomerMobileNumber !: String ;
}