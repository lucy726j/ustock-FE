import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate import 추가
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import { formatPrice, formatROR } from "../../util/util";
import myPortfolioImg from "../../img/myPortfolioImg.png";
import axios from "axios";
import { usePortfolioStore } from "../../store/usePortfolioStore";
import state from "sweetalert/typings/modules/state";

const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

type PropType = {
  data: { id: number; name: string; budget: number; ror: number }[];
  options?: EmblaOptionsType;
  portfolioName: string;
};

const EmblaCarousel: React.FC<PropType> = ({
  data,
  options,
  portfolioName,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);
  const navigate = useNavigate(); // useNavigate hook 사용
  const [useless, setUseless] = useState(false);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const change = usePortfolioStore((state) => state.change);
  const setChange = usePortfolioStore((state) => state.setChange);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi
      .slideNodes()
      .map((slideNode, index) => {
        const node = slideNode.querySelector(".embla__slide__number");
        if (node) {
          return node as HTMLElement;
        } else {
          return null;
        }
      })
      .filter((node): node is HTMLElement => node !== null);
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const scale = numberWithinRange(tweenValue, 0, 1).toString();
          const tweenNode = tweenNodes.current[slideIndex];

          if (tweenNode) {
            tweenNode.style.transform = `scale(${scale})`;
          }
        });
      });
    },
    [tweenFactor, tweenNodes]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const timeoutId = setTimeout(() => {
      setTweenNodes(emblaApi);
      setTweenFactor(emblaApi);
      tweenScale(emblaApi);
    }, 100);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale);

    return () => {
      clearTimeout(timeoutId);
      emblaApi.off("reInit", setTweenNodes);
      emblaApi.off("reInit", setTweenFactor);
      emblaApi.off("reInit", tweenScale);
      emblaApi.off("scroll", tweenScale);
      emblaApi.off("slideFocus", tweenScale);
    };
  }, [emblaApi, tweenScale, setTweenNodes, setTweenFactor]);

  const handleSlideClick = (id: number) => {
    navigate(`/portfolio/${id}`); // ID를 사용하여 라우팅
  };

  // const deleteCarousel = async (id: number) => {
  //     const res = await axios.delete(
  //         `${process.env.REACT_APP_API_URL}/v1/portfolio/${id}`,
  //         {
  //             withCredentials: true,
  //         }
  //     );
  //     if (res.status === 200) {
  //         alert("삭제성공");
  //         setChange(!change);
  //     }
  // };

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {data.map((item) => {
            const { value, color } = formatROR(item.ror); // formatROR 호출

            return (
              <div
                className="embla__slide"
                key={item.id}
                onClick={() => handleSlideClick(item.id)}
                style={{
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <div
                  className="embla__slide__number"
                  //onClick={() => handleSlideClick(item.id)}
                >
                  <div className="embla__slide__info">
                    <h3>{item.name}</h3>
                    <p
                      style={{
                        fontSize: "20px",
                        color: "black",
                      }}
                    >
                      ₩ {formatPrice(item.budget)}
                    </p>
                    <p style={{ color: color }}> {value}%</p>
                    <img src={myPortfolioImg} alt="Portfolio" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
