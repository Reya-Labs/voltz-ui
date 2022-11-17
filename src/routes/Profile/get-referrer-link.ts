import axios from 'axios';

export const getReferrerLink = async (account: string) => {
  const baseUrl = process.env.REACT_APP_REFERRAL_AND_SIGNATURE_SERVICE_URL;
  if (!baseUrl || !account) {
    return undefined;
  }

  try {
    const data = (
      await axios.get<{
        status?: string;
        description?: string;
        refers_with_code?: string;
        wallet_address?: string;
      }>(`${baseUrl}/get-refers-with/${account}`)
    )?.data;

    if (!data) {
      return undefined;
    }
    const status = data.status ? parseInt(data.status, 10) : 200;
    if (status !== 200 || !data.refers_with_code) {
      return undefined;
    }
    const link = `${window.location.origin}/?invitedBy=${data.refers_with_code}`;
    debugger;
    return link;
  } catch (e) {
    return undefined;
  }
};
