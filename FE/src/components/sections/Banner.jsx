import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
  return (
    <Carousel
      animationHandler={'fade'}
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
    >
      {BANNER_DATA.map((banner) => (
        <div key={banner.id} className="w-full aspect-[3.9] select-none">
          <img
            src={banner.image}
            alt={banner.title}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
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
    image:
      'https://owa.bestprice.vn/images/slide/qua-tang-tu-cac-cuc-du-lich-home-67ecf4623a8a6.jpg',
    link: 'https://www.bestprice.vn/du-lich',
  },
  {
    id: 2,
    title: 'Banner 2',
    image:
      'https://owa.bestprice.vn/images/slide/qua-tang-tu-cac-cuc-du-lich-home-67ecf4623a8a6.jpg',
    link: 'https://www.bestprice.vn/du-lich',
  },
  {
    id: 2,
    title: 'Banner 2',
    image:
      'https://owa.bestprice.vn/images/slide/qua-tang-tu-cac-cuc-du-lich-home-67ecf4623a8a6.jpg',
    link: 'https://www.bestprice.vn/du-lich',
  },
];
