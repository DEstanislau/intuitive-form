import { useState, useEffect } from 'react';

import api from '~/services/api';

const loadingCepData = async (setCepData, addressZip) => {
  const result = await api.get(`${addressZip}/json/`);

  setCepData(result);
};

export function useCepData(addressZip) {
  const [cepData, setCepData] = useState([]);

  useEffect(() => {
    loadingCepData(setCepData, addressZip);
  }, [addressZip]);

  return cepData;
}
