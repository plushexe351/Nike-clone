import React, { useContext, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Search,
  ShoppingCart,
} from "react-feather";
import heroImg from "../assets/hero-img.png";
import featured1 from "../assets/featured1.png";
import featured2 from "../assets/featured2.png";
import featured3 from "../assets/featured3.png";
import trending1 from "../assets/trending1.png";
import trending2 from "../assets/trending2.png";
import trending3 from "../assets/trending3.png";
import latest1 from "../assets/latest1.png";
import latest2 from "../assets/latest2.png";
import latest3 from "../assets/latest3.png";
import vid from "../assets/dont-miss-vid.mov";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const Navigate = useNavigate();
  const goToProductsPage = () => {
    Navigate("/products");
  };
  return (
    <main id="landingPage">
      <section>
        <div className="hero-img">
          <video src={vid} autoPlay loop onClick={goToProductsPage}></video>
          <figcaption>
            <p id="hero-img--tagline">Jordan Apparel</p>
            <h1 id="hero-img--title">EARTH TONES</h1>
            <p id="hero-img--description">
              Ground your look in earthy tones inspired by outdoor courts.
              Details like knits, ripcords, and cargo pockets add rich texture
              to your fit.
            </p>
            <button id="btn--shop" onClick={goToProductsPage}>
              Shop
            </button>
          </figcaption>
        </div>
      </section>

      <section id="featured">
        <div className="section-title">Featured</div>
        <div className="featured-products-container">
          <div className="featured" onClick={goToProductsPage}>
            <img src={featured1} alt="" />
            <figcaption>
              <p>For Leading With Style</p>
              <a href="/login" className="link">
                Explore
              </a>
            </figcaption>
          </div>
          <div className="featured" onClick={goToProductsPage}>
            <img src={featured2} alt="" />
            <figcaption>
              <p>For Street Heat</p>
              <a href="/" className="link">
                Explore
              </a>
            </figcaption>
          </div>
          <div className="featured" onClick={goToProductsPage}>
            <img src={featured3} alt="" />
            <figcaption>
              <p>For Your 90s Vibes</p>
              <a href="/" className="link">
                Explore
              </a>
            </figcaption>
          </div>
        </div>
      </section>
      <section id="trending">
        <header>
          <div className="section-title">Trending This Week</div>
          <div className="pagination">
            <div className="pagination-title">Shop</div>
            <div className="navigate left">
              <ChevronLeft />
            </div>
            <div className="navigate right">
              <ChevronRight />
            </div>
          </div>
        </header>
        <div className="trending-products-container">
          <div className="trending" onClick={goToProductsPage}>
            <img src={trending1} alt="" />
            <figcaption>
              <p>For Basketball Freaks</p>
              <a href="/" className="link">
                Explore
              </a>
            </figcaption>
          </div>
          <div className="trending" onClick={goToProductsPage}>
            <img src={trending2} alt="" />
            <figcaption>
              <p>Discover AirMax Styles</p>
              <a href="/" className="link">
                Explore
              </a>
            </figcaption>
          </div>
          <div className="trending" onClick={goToProductsPage}>
            <img src={trending3} alt="" />
            <figcaption>
              <p>Your Favorite Jordans</p>
              <a href="/" className="link">
                Explore
              </a>
            </figcaption>
          </div>
          <div className="trending" onClick={goToProductsPage}>
            <img src={trending3} alt="" />
            <figcaption>
              <p>For Leading With Style</p>
              <a href="/" className="link">
                Explore
              </a>
            </figcaption>
          </div>
          <div className="trending" onClick={goToProductsPage}>
            <img src={trending3} alt="" />
            <figcaption>
              <p>For Leading With Style</p>
              <a href="/" className="link">
                Explore
              </a>
            </figcaption>
          </div>
          <div className="trending" onClick={goToProductsPage}>
            <img src={trending3} alt="" />
            <figcaption>
              <p>For Leading With Style</p>
              <a href="/" className="link">
                Explore
              </a>
            </figcaption>
          </div>
          <div className="trending" onClick={goToProductsPage}>
            <img src={trending3} alt="" />
            <figcaption>
              <p>For Leading With Style</p>
              <a href="/" className="link">
                Explore
              </a>
            </figcaption>
          </div>
        </div>
      </section>

      <section id="latest">
        <div className="section-title">The Latest</div>
        <div className="latest-products-container">
          <div className="latest" onClick={goToProductsPage}>
            <img src={latest1} alt="" />
            <figcaption>
              <p>For Leading With Style</p>
              <a href="/" className="link">
                Shop
              </a>
            </figcaption>
          </div>
          <div className="latest" onClick={goToProductsPage}>
            <img src={latest2} alt="" />
            <figcaption>
              <p>For Leading With Style</p>
              <a href="/" className="link">
                Shop
              </a>
            </figcaption>
          </div>
          <div className="latest" onClick={goToProductsPage}>
            <img src={latest3} alt="" />
            <figcaption>
              <p>For Leading With Style</p>
              <a href="/" className="link">
                Shop
              </a>
            </figcaption>
          </div>
        </div>
      </section>
      <section>
        <div className="hero-img">
          <img
            src={heroImg}
            onClick={goToProductsPage}
            alt="Lifestyle Running Shoes"
          ></img>
          <figcaption>
            <p id="hero-img--tagline">Lifestyle Running Shoes</p>
            <h1 id="hero-img--title">EXTRA-ORDINARY</h1>
            <p id="hero-img--description">
              Ground your look in earthy tones inspired by outdoor courts.
              Details like knits, ripcords, and cargo pockets add rich texture
              to your fit.
            </p>
            <button id="btn--shop" onClick={goToProductsPage}>
              Shop
            </button>
          </figcaption>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
