import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./style.module.scss";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

// react-lazy-load-image-component
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const Carousel = ({
  imageArr,
  setIndex,
  mobileHeight,
  desktopHeight,
  objectFit,
}: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [images, setImages] = useState(imageArr);
  const [imagePlaceholder, setImagePlaceholder] = useState(false);
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--carousel-desktop-height",
      desktopHeight,
    );
    document.documentElement.style.setProperty(
      "--carousel-mobile-height",
      mobileHeight,
    );
    document.documentElement.style.setProperty(
      "--carousel-object-fit",
      objectFit,
    );
    // if (imageArr.length === 0) {
    //   setImages(["/images/logo.svg"]);
    // }
    const Interval = setInterval(() => {
      // setImages(imageArr);
      handleNext();
    }, 15000);
    return () => {
      clearInterval(Interval);
    };
  });
  useEffect(() => {
    if (imageArr.length === 0) {
      setImages(["/images/logo.svg"]);
    } else {
      setImages(imageArr);
    }
    // console.log({ len: imageArr.length });
  }, [imageArr]);

  const slideVariants = {
    hiddenRight: {
      x: "10%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "-10%",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: imageLoaded ? 1 : 0,
      transition: {
        duration: 1,
      },
    },
    exit: {
      opacity: 0,
      x: "-10%",
      transition: {
        duration: 0.7,
      },
    },
  };

  const handleNext = () => {
    console.log({ images });

    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : (prevIndex + 1) % images.length,
    );
    setIndex((prevIndex: number) =>
      prevIndex === images.length - 1 ? 0 : (prevIndex + 1) % images.length,
    );
  };

  const handlePrevious = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1,
    );
    setIndex((prevIndex: number) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className={styles.carousel}>
      <div
        className={`${styles.carousel_images} ${!imageLoaded ? "skeleton" : null}`}
      >
        {/* if rllic package is not available, then start using this code again, and comment/delete the rllic code */}
        {/* <AnimatePresence mode="sync">
          <motion.img
            key={currentIndex}
            alt={"carousel"}
            src={`${imagePlaceholder ? "/images/logo.svg" : images[currentIndex]}`}
            initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
            animate="visible"
            exit="exit"
            variants={slideVariants}
            className={`${imageLoaded ? "skeleton" : null}`}
            // onLoad={() => {
            //   setImageLoaded(true);
            // }}
            onLoad={() => {
              setTimeout(() => {
                setImageLoaded(true);
              }, 100);
            }}
            onError={(e) => {
              // console.log({ e });
              setImagePlaceholder(true);
            }}
            loading="lazy"
          // style={imageLoaded ? { opacity: 1 } : { opacity: 0 }}
          />
        </AnimatePresence> */}

        {/* react-lazy-load-image-component */}
        <AnimatePresence mode="sync">
          <motion.div
            key={currentIndex}
            initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
            animate="visible"
            exit="exit"
            variants={slideVariants}
            className={`${imageLoaded ? "skeleton" : null} ${styles.img}`}
          >
            <LazyLoadImage
              // useIntersectionObserver={true}
              effect="opacity"
              key={currentIndex}
              alt={"carousel"}
              src={`${imagePlaceholder ? "/images/logo.svg" : images[currentIndex]}`}
              className={`${!imageLoaded ? "skeleton" : null}`}
              // onLoad={() => {
              //   setImageLoaded(true);
              // }}
              onLoad={() => {
                setTimeout(() => {
                  setImageLoaded(true);
                }, 100);
              }}
              onError={(e) => {
                // console.log({ e });
                setImagePlaceholder(true);
              }}
              loading="lazy"
              // style={imageLoaded ? { opacity: 1 } : { opacity: 0 }}
            />
          </motion.div>
        </AnimatePresence>
        <div className={styles.slide_direction}>
          <BsCaretLeftFill className={styles.left} onClick={handlePrevious} />

          <BsCaretRightFill className={styles.right} onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};
export default Carousel;
