import mainRequest from '@/api/mainRequest';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Checkout = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const searchParams = useSearchParams();
  console.log(searchParams);
  

  useEffect(() => {
    const result = async () => {
      const response = await mainRequest.get('/api/vn-pay/checksum-redirect', {
        params: searchParams,
      });
      if (response?.data?.result) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    };
    result();
  }, [searchParams]);

  return <div>{isSuccess ? 'Thanh toán thành công' : 'Thanh toán thất bại'}</div>;
};

export default Checkout;
