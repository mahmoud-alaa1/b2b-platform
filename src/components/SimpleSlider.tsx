"use client";
import Slider from "react-slick";

export default function SimpleSlider({
  advertisements,
}: {
  advertisements: IAdvertisement[];
}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Slider className="h-screen w-full" {...settings}>
      {advertisements.map((ad) => (
        <div key={ad.id} className="w-full h-full relative ">
          <img src={ad.imagUrl} alt={ad.title} className="inset-0 z-100 absolute" />
        </div>
      ))}
      <ul></ul>
    </Slider>
  );
}
