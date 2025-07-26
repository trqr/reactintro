import React, {useState} from "react"
import "./CardCarousel.css"
import {useKeenSlider} from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

type CardCarouselProps = {
    images: string[];
    handleClick: () => void;
}

export default function CardCarousel({images, handleClick}: CardCarouselProps) {
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slides: {
            perView: 1,
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })


    return (
        <>
            <div className="navigation-wrapper card-carousel" onClick={() => handleClick()}>
                <div ref={sliderRef} className="keen-slider">
                    {images.map((image, index) => (
                        <div key={index} className="keen-slider__slide number-slide${index}"><img src={image}/></div>))}
                </div>
                {loaded && instanceRef.current && (
                    <div className="arrows-wrapper">
                        <Arrow
                            left
                            onClick={(e: any) =>
                                e.stopPropagation() || instanceRef.current?.prev()
                            }
                            disabled={currentSlide === 0}
                        />

                        <Arrow
                            onClick={(e: any) =>
                                e.stopPropagation() || instanceRef.current?.next()
                            }
                            disabled={
                                currentSlide ===
                                instanceRef.current.track.details.slides.length - 1
                            }
                        />
                    </div>
                )}
            </div>
        </>
    )
}

function Arrow(props: {
    disabled: boolean
    left?: boolean
    onClick: (e: any) => void
}) {
    const disabled = props.disabled ? " arrow--disabled" : ""
    return (
        <svg
            onClick={props.onClick}
            className={`arrow ${props.left ? "arrow--left" : "arrow--right"} ${disabled}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {props.left ? (
                <polyline points="15 18 9 12 15 6"/>
            ) : (
                <polyline points="9 18 15 12 9 6"/>
            )}
        </svg>
    )
}
