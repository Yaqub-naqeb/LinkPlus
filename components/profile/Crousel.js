// npm install react-alice-carousel --save
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Image from "next/image";
import React from "react";
import im from '../assets/imgs/postImg/WallpaperDog-17124685.jpg'
const Crousel = () => {
  const items = [
    <div className="item"><h3 ><Image width={500} height={500} className='w-full h-full ' src={im} /></h3></div>,
    <div className="item"><h3 ><Image width={500} height={500} className='w-full h-full ' src={im} /></h3></div>,
    <div className="item"><h3 ><Image width={500} height={500} className='w-full h-full ' src={im} /></h3></div>,
    <div className="item"><h3 ><Image width={500} height={500} className='w-full h-full ' src={im} /></h3></div>,
  ];

  const responsive = {
    0: { items: 1 },
    600: { items: 2 },
    1024: { items: 1 }
  };

  return (
    <div className='w-[100%] h-[100%] '>
      <h2>Carousel Example</h2>
      <AliceCarousel
        items={items}
        responsive={responsive}
        autoPlay={true}
        autoPlayInterval={5000}
        infinite={true}
        disableButtonsControls={true}
        disableDotsControls={false}
      />
    </div>
  );
};

export default Crousel;
