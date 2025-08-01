import React, {type MutableRefObject} from "react"
import "./ProductDetailsCarousel.css"
import {
    useKeenSlider,
    KeenSliderPlugin,
    KeenSliderInstance,
} from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import {Box} from "@mui/material";

function ThumbnailPlugin(
    mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
    return (slider) => {
        function removeActive() {
            slider.slides.forEach((slide) => {
                slide.classList.remove("active")
            })
        }

        function addActive(idx: number) {
            slider.slides[idx].classList.add("active")
        }

        function addClickEvents() {
            slider.slides.forEach((slide, idx) => {
                slide.addEventListener("click", () => {
                    if (mainRef.current) mainRef.current.moveToIdx(idx)
                })
            })
        }

        slider.on("created", () => {
            if (!mainRef.current) return
            addActive(slider.track.details.rel)
            addClickEvents()
            mainRef.current.on("animationStarted", (main) => {
                removeActive()
                const next = main.animator.targetIdx || 0
                addActive(main.track.absToRel(next))
                slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
            })
        })
    }
}

type ProductDetailsCarouselProps = {
    images: string[];
}

export default function ProductDetailsCarousel({images}: ProductDetailsCarouselProps) {
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
    })
    const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: 0,
            slides: {
                perView: 4,
                spacing: 5,
            },
        },
        [ThumbnailPlugin(instanceRef)]
    )

    return (
        <Box>
            <div ref={sliderRef} className="keen-slider product-carousel">
                {images.map((image, i) => (
                    <div key={i} className="keen-slider__slide">
                        <img src={image}/>
                    </div>
                ))}
            </div>

            <div ref={thumbnailRef} className="keen-slider thumbnail-carousel">
                {images.map((image, i) => (
                    <div key={i} className="keen-slider__slide">
                        <img src={image}/>
                    </div>
                ))}
            </div>
        </Box>
    )
}
