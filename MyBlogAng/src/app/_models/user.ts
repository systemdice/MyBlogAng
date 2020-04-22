export class User {
  id: number;
  Name: string; 
  Category: string;
  Price: number;
  Country: string; 
  State: string; 
  Active: boolean;   
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
}

export class Expense {

    id : number;
    Name : string;
    Purpose : string;
    Identity : string;
    TransType : string;
    TransDetails : string;
    TransStatus : string;
    Active : boolean;
    username: string;
    Who : string;
    Month : string;
    Year : string;
    TransDate : Date;
    Approval : string;
}

export class GraphData {
  Name: string;
  Who: string;
}


