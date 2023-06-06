import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICardLinksProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;

  SiteURL:string;
  componentTitle:string;
  listName:string;
  context:WebPartContext;
}
