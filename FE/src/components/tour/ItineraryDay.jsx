import { ChevronDown, ChevronUp } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const ItineraryDay = ({ itinerary }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex justify-between items-center py-3"
      >
        <h2 className="text-lg font-semibold">
          {itinerary.dayNumberOfTour}: {itinerary.title}
        </h2>
        {isOpen ? (
          <ChevronUp className="text-gray-500" />
        ) : (
          <ChevronDown className="text-gray-500" />
        )}
      </button>

      {isOpen && (
        <div className="pl-2 space-y-4 text-sm text-gray-700">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: itinerary?.activityDescription }}
          />
          {itinerary?.images &&
            itinerary?.images?.map((image) => (
              <div className="space-y-2" key={image?.id}>
                <img
                  src={image?.url}
                  alt={image?.title}
                  className="w-full h-auto rounded-xl shadow"
                />
                {itinerary?.title && (
                  <p className="text-center text-xs text-gray-500 italic">{itinerary?.title}</p>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ItineraryDay;

ItineraryDay.propTypes = {
  itinerary: PropTypes.object.isRequired,
};
