import * as React from "react";
//import styles from './CardLinks.module.scss';
import { ICardLinksProps } from "./ICardLinksProps";
//import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import styles from "./CardLinks.module.scss";

//single item
interface ICardlink {
  Title: string;
  QuickLink: string;
  Logo: string;
  Number: number;
}
//multiple items
interface IAllCardLinks {
  AllLinks: ICardlink[];
}

export default class BookList extends React.Component<
  ICardLinksProps,
  IAllCardLinks
> {
  constructor(props: ICardLinksProps, state: IAllCardLinks) {
    super(props);
    this.state = {
      AllLinks: [],
    };
  }

  componentDidMount() {
    //alert ("Componenet Did Mount Called...");
    //console.log("First Call.....");
     this.getAllCardLinks();
  }
  
  public getAllCardLinks = () => {
    console.log("This is link Detail function");
    //api call
    let listurl = `${this.props.SiteURL}/_api/lists/GetByTitle('${this.props.listName}')/items`;
    console.log(listurl);

    this.props.context.spHttpClient
      .get(listurl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        response.json().then((responseJSON: any) => {
          //console.log(responseJSON);
          this.setState({ AllLinks: responseJSON.value });
        });
        console.log(this.state.AllLinks);
      });
  };
  public render(): React.ReactElement<ICardLinksProps> {
    return (
      <div>
        <h1>Quick Links</h1>
        {
          <div className={styles["welcome"]}>
            {this.state.AllLinks.map((mylink) => {
              return (
                <>
                  <div className={styles["card"]}>
                    {
                      <img
                        src={
                          window.location.origin +
                          JSON.parse(mylink.Logo).serverRelativeUrl
                        }
                        alt=""
                        width={50}
                        height={50}
                      />
                    }
                  </div>{" "}
                  <p>{mylink.Title}</p>
                </>
              );
            })}
          </div>
        }
      </div>
    );
  }
}
