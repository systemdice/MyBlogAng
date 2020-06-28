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
      fatherName  : string;
  motherName: string;
  gender: string;
  hobbies: string[];
      contactNumber  : string;
      joiningYear  : string;
      schoolYear  : string;
      studentType  : string;
      emailAddress  : string;
      emgContactNumber  : string;
      currAddress  : string;
      permAddress  : string;
      healthDetails  : string;
      langKnown  : string;
      totalAmt  : string;
      selectedCountryControl : string;
      selectedCountryControlT2 : string;
      selectedCountryControlT3 : string;
      selectedCountryControlT4 : string;
      dateStart : string;
      dateEnd : string;
      className  : string;
      file : string;
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




