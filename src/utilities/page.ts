import { pushEvent } from './googleAnalytics';

/**
 * It sets the page title and pushes an event to Google Analytics
 * @param {string} text - The text to be displayed in the title bar
 * @param {string | null} [userAddress] - The user's address.
 */
export const setPageTitle = (text: string, userAddress?: string | null) => {
  document.title = `Voltz ⚡ ${text ? `${text}` : ''}`;
  pushEvent(userAddress ?? '', {
    event: 'title_change',
    eventValue: text,
  });
};
