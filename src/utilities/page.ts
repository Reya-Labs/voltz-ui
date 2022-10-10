import { pushEvent } from "./googleAnalytics";

/**
 * Allows you to set the suffix of the page title
 * @param text - the suffix to set on the page title
 */
export const setPageTitle = (text: string) => {
  document.title = `Voltz ⚡ ${text ? `${text}` : ''}`;
  pushEvent("path_change", text);
};