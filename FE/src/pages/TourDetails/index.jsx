import BookingTourModal from '@/components/tour/BookingTourModal';
import ItineraryDay from '@/components/tour/ItineraryDay';
import { useItineraryState } from '@/contexts/ItineraryContext';
import { useTourState } from '@/contexts/TourContext';
import { useItineraryActions } from '@/hooks/useItineraryActions';
import { useTourActions } from '@/hooks/useTourActions';
import { formatCurrency } from '@/utils/format';
import { Calendar, Map } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TourDetails = () => {
  const { id } = useParams();
  const { fetchTourById } = useTourActions();
  const { fetchItineraries } = useItineraryActions();
  const { tour } = useTourState();
  const { itineraries } = useItineraryState();
  const [isBookingTourModalOpen, setIsBookingTourModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchTourById(id);
      fetchItineraries(id);
    }
  }, [id]);

  return (
    <div className="container max-w-[1160px] mx-auto mt-10 flex flex-col gap-5 w-full px-4">
      <div className="max-w-6xl mx-auto py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Image + Video */}
        <div className="md:col-span-2 space-y-4">
          <div className="relative w-full aspect-[3/2]">
            <img
              src={tour?.tourBanner}
              alt={tour?.tourName}
              className="w-full h-full object-cover rounded-2xl shadow-md"
            />
          </div>
        </div>

        {/* Right: Info */}
        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4 border border-gray-100">
          <h1 className="text-xl font-semibold leading-snug">{tour?.tourName}</h1>

          <div className="text-sm text-gray-500">{tour?.duration}</div>

          <div className="flex items-start gap-2 text-gray-700 text-sm">
            <Calendar className="mt-1" />
            <div>
              <strong>Khởi hành đến {tour?.destination}</strong>
              <div>
                Bắt đầu:{' '}
                {tour?.startDate ? new Date(tour?.startDate).toLocaleDateString('vi-VN') : ''}
              </div>
              <div>
                Kết thúc: {tour?.endDate ? new Date(tour?.endDate).toLocaleDateString('vi-VN') : ''}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <Map className="mt-1" />
            <p>{tour?.location}</p>
          </div>
          <div className="space-y-1">
            {tour?.discount && (
              <div className="line-through text-gray-400 text-sm">
                {formatCurrency(tour?.price)}
              </div>
            )}
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(tour?.price - (tour?.discount || 0))}
            </div>
          </div>

          <button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg"
            onClick={() => setIsBookingTourModalOpen(true)}
          >
            Gửi yêu cầu
          </button>
        </div>
      </div>
      <BookingTourModal
        open={isBookingTourModalOpen}
        onClose={() => setIsBookingTourModalOpen(false)}
        tourId={id}
      />
      {tour?.description && (
        <div className="w-full">
          <h2 className="text-2xl font-bold">Mô tả</h2>
          <div className="text-gray-500">{tour?.description}</div>
        </div>
      )}
      <div className="w-full">
        <h2 className="text-2xl font-bold">Thông tin lịch trình</h2>
        {itineraries?.map((item) => (
          <ItineraryDay key={item.id} itinerary={item} />
        ))}
      </div>
    </div>
  );
};

export default TourDetails;
