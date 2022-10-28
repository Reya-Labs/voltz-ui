import { DataLayerEventPayload, pushEvent } from './googleAnalytics';

/**
 * Allows you to set the suffix of the page title
 * @param text - the suffix to set on the page title
 */
export const setPageTitle = (text: string) => {
  document.title = `Voltz ⚡ ${text ? `${text}` : ''}`;
  const payload: DataLayerEventPayload = {
    event: 'title_change',
    eventValue: text,
  };
  pushEvent(payload);
};
