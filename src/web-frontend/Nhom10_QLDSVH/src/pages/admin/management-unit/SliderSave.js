//    // pitch value -------------------------------------------------
//    const pitch_sliderEl = document.querySelector("#pitch-range")
//    const pitch_sliderValue = document.querySelector(".pitch-value")

//    pitch_sliderEl.addEventListener("input", (event) => {
//        const tempSliderValue = event.target.value;
//        setPitch(event.target.value);
//        const mappedValue = (tempSliderValue / 100) * (90 - (-90)) + (-90);
//        // (90 - (-90) khoảng cách giữa max và min
//        // + (-90) offset để cho slidẻ bắt đầu từ -90 thay vì 0
//        pitch_sliderValue.textContent = Math.round(mappedValue * 10) / 10;

//        const progress = (tempSliderValue / 100) * 100;

//        pitch_sliderEl.style.background = `linear-gradient(to right, #f50 ${progress}%, #ccc ${progress}%)`;
//    })

//    // yaw value -------------------------------------------------
//    const yaw_sliderEl = document.querySelector("#yaw-range")
//    const yaw_sliderValue = document.querySelector(".yaw-value")

//    yaw_sliderEl.addEventListener("input", (event) => {
//        const tempSliderValue = event.target.value;
//        setYaw(event.target.value);

//        const mappedValue = (tempSliderValue / 100) * (180 - (-180)) + (-180);
//        // (90 - (-90) khoảng cách giữa max và min
//        // + (-90) offset để cho slidẻ bắt đầu từ -90 thay vì 0
//        yaw_sliderValue.textContent = Math.round(mappedValue * 10) / 10;

//        const progress = (tempSliderValue / 100) * 100;

//        yaw_sliderEl.style.background = `linear-gradient(to right, #f50 ${progress}%, #ccc ${progress}%)`;
//    })

<div className="bg-gray-100 rounded-lg mt-4 py-4">
<div className="w-full flex justify-center items-center md:py-0 lg:py-0 sm:py-4">
    <div className="md:flex justify-center md:items-center gap-10 sm:flex sm:flex-cols">
        <div className="text-gray-700 bottom-0 font-semibold flex flex-col gap-1">
            <div>
                <span className="text-xs px-2 py-1 bg-red-500 rounded-bl-lg rounded-tr-lg text-white">Pitch</span>
            </div>
            <span className="text-sm">Góc nhìn</span>
        </div>
        <div className="flex w-64 items-center h-20">
            <style>
                {`
                input[type="range"] {
                    -webkit-appearance: none;
                    appearance: none; 
                    width: 100%;
                    cursor: pointer;
                    outline: none;
                    border-radius: 15px;
                    
                    height: 6px;
                    background: #ccc;
                  }
                  
                  input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none; 
                    height: 15px;
                    width: 15px;
                    background-color: #f50;
                    border-radius: 50%;
                    border: none;
                    transition: transform 0.2s ease-in-out; /* Add transition for smoother movement */
                }
                
                input[type="range"]::-moz-range-thumb {
                    height: 15px;
                    width: 15px;
                    background-color: #f50;
                    border-radius: 50%;
                    border: none;
                    transition: transform 0.2s ease-in-out; /* Add transition for smoother movement */
                }
                  
                  input[type="range"]::-webkit-slider-thumb:hover {
                    box-shadow: 0 0 0 10px rgba(255,85,0, .1)
                  }

                  input[type="range"]:active::-webkit-slider-thumb {
                    box-shadow: 0 0 0 13px rgba(255,85,0, .2)
                  }

                  input[type="range"]:focus::-webkit-slider-thumb {
                    box-shadow: 0 0 0 13px rgba(255,85,0, .2)
                  }
                  
                  input[type="range"]::-moz-range-thumb:hover {
                    box-shadow: 0 0 0 10px rgba(255,85,0, .1)
                  }
                  
                  input[type="range"]:active::-moz-range-thumb {
                    box-shadow: 0 0 0 13px rgba(255,85,0, .2)
                  }
                  
                  input[type="range"]:focus::-moz-range-thumb {
                    box-shadow: 0 0 0 13px rgba(255,85,0, .2)    
                  }
            `}
            </style>
            <input type="range" id="pitch-range" />
        </div>
        <div class="pitch-value text-xs font-semibold text-white bg-red-500 px-4 py-2 rounded-lg ">0</div>
    </div>
</div>

<div className="w-full flex justify-center items-center md:py-0 pt-8 sm:py-4">
    <div className="md:flex justify-center md:items-center gap-10 sm:flex sm:flex-cols">
        <div className="text-gray-700 bottom-0 font-semibold flex flex-col gap-1">
            <div>
                <span className="text-xs px-2 py-1 bg-red-500 rounded-bl-lg rounded-tr-lg text-white">Yaw</span>
            </div>
            <span className="text-sm">Góc quay</span>
        </div>
        <div className="flex w-64 items-center h-20">
            <style>
                {`
                input[type="range"] {
                    -webkit-appearance: none;
                    appearance: none; 
                    width: 100%;
                    cursor: pointer;
                    outline: none;
                    border-radius: 15px;
                    
                    height: 6px;
                    background: #ccc;
                  }
                  
                  input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none; 
                    height: 15px;
                    width: 15px;
                    background-color: #f50;
                    border-radius: 50%;
                    border: none;
                    transition: transform 0.2s ease-in-out; /* Add transition for smoother movement */
                }
                
                input[type="range"]::-moz-range-thumb {
                    height: 15px;
                    width: 15px;
                    background-color: #f50;
                    border-radius: 50%;
                    border: none;
                    transition: transform 0.2s ease-in-out; /* Add transition for smoother movement */
                }
                  
                  input[type="range"]::-webkit-slider-thumb:hover {
                    box-shadow: 0 0 0 10px rgba(255,85,0, .1)
                  }

                  input[type="range"]:active::-webkit-slider-thumb {
                    box-shadow: 0 0 0 13px rgba(255,85,0, .2)
                  }

                  input[type="range"]:focus::-webkit-slider-thumb {
                    box-shadow: 0 0 0 13px rgba(255,85,0, .2)
                  }
                  
                  input[type="range"]::-moz-range-thumb:hover {
                    box-shadow: 0 0 0 10px rgba(255,85,0, .1)
                  }
                  
                  input[type="range"]:active::-moz-range-thumb {
                    box-shadow: 0 0 0 13px rgba(255,85,0, .2)
                  }
                  
                  input[type="range"]:focus::-moz-range-thumb {
                    box-shadow: 0 0 0 13px rgba(255,85,0, .2)    
                  }
            `}
            </style>
            <input type="range" id="yaw-range" />
        </div>
        <div class="yaw-value text-xs font-semibold text-white bg-red-500 px-4 py-2 rounded-lg ">0</div>
    </div>
</div>
</div>