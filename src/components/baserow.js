import Baserow from 'baserow-client';

const baserow = new Baserow({
    apiKey: process.env.NEXT_PUBLIC_BASEROW_KEY,
    showUserFieldNames: true,
  })

  export default baserow;