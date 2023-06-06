import * as React from 'react';
//import styles from './ShowProfile.module.scss';
import { IShowProfileProps } from './IShowProfileProps';
import styles from './ShowProfile.module.scss';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http'; //SPHttpClientConfiguration is declared but its value is never read.
import * as moment from 'moment';
//import * as moment from 'moment';
//import { escape } from '@microsoft/sp-lodash-subset';
//import * as moment from "moment";


//single item
interface ICardListItem {// 'IBookListItem' 
  Title: string;
  Description: string;
  Salary: number;
  DOB: any;
  Shift: string;
  ProfileImage: string;
  Manager: {
    Picture: any;
    Title: string,
    EMail: string,
   
  };
  MarriedStatus: boolean;
};
//multiple items
interface IAllItems {
  // 'IAllItems' 
  AllEmployee:  ICardListItem[]
}
export default class List extends React.Component<
  IShowProfileProps,
  IAllItems
> {
  constructor(props: IShowProfileProps, state: IAllItems) {
    super(props);
    this.state = {
      AllEmployee: [],
    }
  };

  componentDidMount() {
    //alert ("Componenet Did Mount Called...");
    //console.log("First Call.....");
     this.getAllBookDetails();
  }

  public getAllBookDetails = () => {
    console.log("This is Book Detail function");
    //api call
    let selectColumns =
      "Title,DOB,Salary,Description,Shift,Manager/Title,Manager/EMail,ProfileImage";
    let expandColumns = "Manager";

   /*  let listURL = `${this.props.listUrl}/_api/web/lists/getbytitle('${this.props.listName}')/items?$select=${selectColumns}&$expand=${expandColumns}`;
    console.log(listURL); */
    let listURL = `${this.props.listUrl}/_api/web/lists/getbytitle('${this.props.listName}')/items?$select=${selectColumns}&$expand=${expandColumns}`;
    console.log(listURL);
    this.props.context.spHttpClient
      .get(listURL, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        response.json().then((responseJSON: any) => {

          //console.log(responseJSON);
          this.setState({ AllEmployee: responseJSON.value, })
        });
        console.log(this.state.AllEmployee);
      });
  }

  public render(): React.ReactElement<IShowProfileProps> {
    return (
      <div className={styles["container"]}><h1>Employee Info</h1>
        { <div className={styles["welcome"]} >
        {this.state.AllEmployee.map((emp) => {
            /* const date = new Date(emp.DOB);
            const formattedDate = date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric"
            }); */
            return (
              <div className={styles["card"]}>
               {  <img
                  src={
                   
                      window.location.origin +
                        JSON.parse(emp.ProfileImage).serverRelativeUrl
                  }
                  alt=""
                  width={50}
                  height={50}
                /> }
              <img
                  src={`${this.props.context.pageContext.web.serverRelativeUrl}/_layouts/15/userphoto.aspx?accountname=${emp.Manager.Picture}`}
                  alt=""
                  width={50}
                  height={50}
                />
                <p>{emp.Title}</p>
                <p>{emp.Shift}</p>
                <p>{emp.Salary}</p>
                <p> {" "} {emp.MarriedStatus ? "Yes,Married" : "No, not Married"}</p>
                {/* <p>{formattedDate}</p> */}
                <p>Description: {emp.Description}</p>
              <p>{moment(emp.DOB).format("LL")}</p>
                <p>Manager Name: {emp.Manager.Title}</p>
               
              </div>);
          })}
        </div>}
      </div>
    )
  }
}










//function emp(value: ICardListItem, index: number, array: ICardListItem[]): unknown //{
 // throw new Error('Function not implemented.');
//}
/*return ( 
  <><div> <h2>EMPLOYEE INFO</h2></div><div className={styles.container}> {this.state.AllEmployee.map(emp => {
    return (
      <>
        <div className={styles.welcome}>
          
              
              <h4>Full Name:<h3>{emp.Title}</h3></h4>
              /<h4>Profile: <h3> {emp.Profile}alt="" </h3></h4>
              <h4>Description:<h3> {emp.Description}</h3></h4>
              <h4>DOB:<h3> {emp.DOB}</h3></h4>
              <h4>Salary:<h3>{emp.Salary}</h3></h4>
              <h4>Shift:<h3>{emp.Shift}</h3></h4>
              <h4>Married Status:<h3> {" "} {emp.MarriedStatus ? "YES":"No"}</h3></h4>
              <h4>Manager:<h3>{emp.Manager}</h3></h4>
            </div> 
          
      </>
    );
  })}

  </div></>)
}
}*/