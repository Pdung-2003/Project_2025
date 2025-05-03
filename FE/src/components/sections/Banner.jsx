import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
  return (
    <Carousel
      animationHandler={'slide'}
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
    >
      {BANNER_DATA.map((banner) => (
        <div key={banner.id} className="w-full aspect-[3.9] select-none">
          <img src={banner.image} alt={banner.title} className="object-cover" sizes="100vw" />
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;

const BANNER_DATA = [
  {
    id: 1,
    title: 'Banner 1',
    image: 'images/banner.jpg',
    link: 'https://www.bestprice.vn/du-lich',
  },
  {
    id: 2,
    title: 'Banner 2',
    image: 'images/banner.jpg',
    link: 'https://www.bestprice.vn/du-lich',
  },
  {
    id: 2,
    title: 'Banner 2',
    image: 'images/banner.jpg',
    link: 'https://www.bestprice.vn/du-lich',
  },
];
