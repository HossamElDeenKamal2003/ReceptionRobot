import { useState } from "react";
import "./style.css";
import img1 from "../../sliderImages/img1.JPG";
import img2 from "../../sliderImages/img2.JPG";
import img3 from "../../sliderImages/img3.JPG";
import img4 from "../../sliderImages/img4.JPG";
import img5 from "../../sliderImages/img5.JPG";
import img6 from "../../sliderImages/img6.JPG";
import img7 from "../../sliderImages/img7.JPG";
import img8 from "../../sliderImages/img8.JPG";

function Navbar() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [show, setShow] = useState("btn1");

    function handlePrev() {
        setActiveSlide(prevState => (prevState === 0 ? 2 : prevState - 1));
    }

    function handleNext() {
        setActiveSlide(prevState => (prevState === 2 ? 0 : prevState + 1));
    }

    function clickOne() {
        setShow("btn1");
        document.querySelector(".img1").src = img1;
        document.querySelector(".img2").src = img2;
        document.querySelector(".img3").src = img3;
    }

    function clickTwo() {
        setShow("btn2");
        document.querySelector(".img1").src = img4;
        document.querySelector(".img2").src = img5;
        document.querySelector(".img3").src = img6;
    }

    function clickThree() {
        setShow("btn3");
        document.querySelector(".img1").src = img7;
        document.querySelector(".img2").src = img8;
        document.querySelector(".img3").src = img1;
    }

    return (
        <div className="container mx-auto">
            <div className="flex space-x-4 mt-4">
                <button
                    onClick={clickOne}
                    className={show === "btn1" ? "bg-red-500" : "bg-blue-500"}
                >
                    Button One
                </button>
                <button
                    onClick={clickTwo}
                    className={show === "btn2" ? "bg-red-500" : "bg-blue-500"}
                >
                    Button Two
                </button>
                <button
                    onClick={clickThree}
                    className={show === "btn3" ? "bg-red-500" : "bg-blue-500"}
                >
                    Button Three
                </button>
            </div>

            <div id="controls-carousel" className="relative w-full h-full" data-carousel="static">
                <div className="relative h-56 m-3 overflow-hidden rounded-lg md:h-96">
                    <div className={activeSlide === 0 ? "" : "hidden"} data-carousel-item>
                        <img src={img1} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 img1" alt="..." />
                    </div>
                    <div className={activeSlide === 1 ? "" : "hidden"} data-carousel-item>
                        <img src={img2} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 img2" alt="..." />
                    </div>
                    <div className={activeSlide === 2 ? "" : "hidden"} data-carousel-item>
                        <img src={img3} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 img3" alt="..." />
                    </div>
                </div>
            </div>
            <button type="button" onClick={handlePrev} className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex bg-black items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" onClick={handleNext} className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    );
}

export default Navbar;
