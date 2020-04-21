import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import shopPic from "../../Assets/img/shopSoRude1.png";
import shopPic2 from "../../Assets/img/shopSoRude2.png";
import shopPic3 from "../../Assets/img/shopSoRude3.png";
import Button from "react-bootstrap/Button";

const ShopCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img className="d-block w-100" src={shopPic} alt="First slide" />
        <Carousel.Caption>
          <h3>Visit ShopSoRude.com</h3>
          <Button href="https://shopsorude.com/" target="_blank" variant="info">
            Shop Now
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={shopPic2} alt="Second slide" />

        <Carousel.Caption>
          <h3>Visit ShopSoRude.com</h3>
          <Button href="https://shopsorude.com/" target="_blank" variant="info">
            Shop Now
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={shopPic3} alt="Third slide" />

        <Carousel.Caption>
          <h3>Visit ShopSoRude.com</h3>
          <Button href="https://shopsorude.com/" target="_blank" variant="info">
            Shop Now
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default ShopCarousel;
