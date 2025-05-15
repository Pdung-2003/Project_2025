import mainRequest from '@/api/mainRequest';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const result = async () => {
      try {
        setIsLoading(true);
        const paramsObj = Object.fromEntries(searchParams.entries());
        const response = await mainRequest.get('/api/vn-pay/checksum-redirect', {
          params: paramsObj,
        });
        if (response?.data?.result) {
          toast.success('Thanh toán thành công');
          setIsSuccess(true);
        } else {
          toast.error('Thanh toán thất bại');
          setIsSuccess(false);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Thanh toán thất bại');
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
      }
    };
    result();
  }, [searchParams]);

  return (
    <div className="flex justify-center items-center h-[600px]">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      ) : isSuccess ? (
        <div
          className="flex flex-col gap-2 items-center justify-center border border-gray-300 shadow rounded-lg p-5 h-3/4 bg-white"
          style={{ textAlign: 'center', color: '#27ae60', padding: 32 }}
        >
          <CheckCircle size={64} color="#27ae60" />
          <h2 className="text-2xl font-bold">Thanh toán thành công!</h2>
          <p className="mb-5">Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xác nhận.</p>
          <a
            href="/"
            style={{
              color: '#fff',
              background: '#27ae60',
              padding: '8px 24px',
              borderRadius: 4,
              textDecoration: 'none',
            }}
          >
            Về trang chủ
          </a>
        </div>
      ) : (
        <div
          className="flex flex-col gap-2 items-center justify-center border border-gray-300 shadow rounded-lg p-5 h-3/4 bg-white"
          style={{ textAlign: 'center', color: '#e74c3c', padding: 32 }}
        >
          <XCircle size={64} color="#e74c3c" />
          <h2 className="text-2xl font-bold">Thanh toán thất bại</h2>
          <p className="mb-5">
            Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại hoặc liên hệ hỗ trợ.
          </p>
          <a
            href="/"
            style={{
              color: '#fff',
              background: '#e74c3c',
              padding: '8px 24px',
              borderRadius: 4,
              textDecoration: 'none',
            }}
          >
            Về trang chủ
          </a>
        </div>
      )}
    </div>
  );
};

export default Checkout;
