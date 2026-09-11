
// Yahan filters ka object define hai, jisme har effect ka default value, min, max aur unit store hota hai.
// Isse slider ke state ko manage karna easy ho jata hai aur image par filter apply karte waqt values ko access karna simple rehta hai.
let filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },

    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },


    saturate: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },

    huerotate: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },

    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },

    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },

    Sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },

    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },

    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    }
};


// Yeh DOM elements ko select karte hain, taaki hum image, canvas aur filter controls ko manipulate kar sakein.
let filtersdiv = document.querySelector(".filters");

const imageinput = document.querySelector("#image-input");

const imageCanvas = document.querySelector("#image-canvas");
const Canvasctx = imageCanvas.getContext("2d");

const placeholder = document.querySelector(".placeholder");

const resetbtn = document.querySelector("#reset-btn");
const downloadbtn = document.querySelector("#download-btn");
const presetContainer = document.querySelector(".presets")
let image = null;

// Yeh function ek naya filter control banata hai, jisme range slider aur label add hota hai.
// Har slider ke input event par current value update hoti hai aur filter apply ho jata hai.
function createElement(name, unit = "%", value, min, max) {

    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");

    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;

    const p = document.createElement("p");
    p.innerText = name;

    div.appendChild(p);
    div.appendChild(input);


    input.addEventListener("input", (event) => {

        filters[name].value = Number(input.value);

        applyFilters();

    });


    return div;
}


// Yahan har filter key ke liye ek slider dynamically create hota hai aur UI mein append ho jata hai.
// Isse code reusable rehta hai aur nayi filter add karna easy ho jata hai.

function createfilters(){Object.keys(filters).forEach(key => {

    const filterElement = createElement(
        key,
        filters[key].unit,
        filters[key].value,
        filters[key].min,
        filters[key].max
    );

    filtersdiv.appendChild(filterElement);

});
}

createfilters();
// Image input ka logic: user jab image select karta hai, file ko Image object mein convert karke canvas par draw kar diya jata hai.
// Placeholder hide kar ke actual image show kar diya jata hai and canvas dimensions image ke according set ho jati hai.
imageinput.addEventListener("change", (event) => {

    const file = event.target.files[0];

    const img = new Image();

    img.src = URL.createObjectURL(file);


    img.onload = () => {

        image = img;

        imageCanvas.style.display = "initial";

        imageCanvas.width = img.width;
        imageCanvas.height = img.height;

        Canvasctx.drawImage(img, 0, 0);

        placeholder.style.display = "none";

    }

});


// Yeh final filter logic hai, jo selected slider value ke basis par canvas par CSS filter apply karta hai.
// Pehle old image ko clear karta hai, phir filter string build karta hai, aur updated image ko canvas par redraw karta hai.
function applyFilters() {

    let filterString = `
        brightness(${filters.brightness.value}%)
        contrast(${filters.contrast.value}%)
        saturate(${filters.saturate.value}%)
        hue-rotate(${filters.huerotate.value}deg)
        blur(${filters.blur.value}px)
        grayscale(${filters.grayscale.value}%)
        sepia(${filters.Sepia.value}%)
        opacity(${filters.opacity.value}%)
        invert(${filters.invert.value}%)
    `;

    Canvasctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    Canvasctx.filter = filterString;

    Canvasctx.drawImage(image, 0, 0);
}


resetbtn.addEventListener("click",()=>{

    filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },

    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },


    saturate: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },

    huerotate: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },

    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },

    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },

    Sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },

    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },

    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    }
};
applyFilters();
filtersdiv.innerHTML="";

createfilters();

});


downloadbtn.addEventListener("click",()=>{
    const link = document.createElement("a");
    link.download="edited-image";
    link.href=imageCanvas.toDataURL();
    link.click();

});


// object conatining presets
const presets = {
    original: {
        brightness: 100,
        contrast: 100,
        saturate: 100,
        huerotate: 0,
        blur: 0,
        grayscale: 0,
        Sepia: 0,
        opacity: 100,
        invert: 0
    },

    vintage: {
        brightness: 110,
        contrast: 120,
        saturate: 80,
        huerotate: 0,
        blur: 0,
        grayscale: 0,
        Sepia: 40,
        opacity: 100,
        invert: 0
    },

    blackAndWhite: {
        brightness: 100,
        contrast: 120,
        saturate: 0,
        huerotate: 0,
        blur: 0,
        grayscale: 100,
        Sepia: 0,
        opacity: 100,
        invert: 0
    },

    dramatic: {
        brightness: 90,
        contrast: 150,
        saturate: 120,
        huerotate: 0,
        blur: 0,
        grayscale: 10,
        Sepia: 0,
        opacity: 100,
        invert: 0
    },

    faded: {
        brightness: 110,
        contrast: 80,
        saturate: 70,
        huerotate: 0,
        blur: 0,
        grayscale: 0,
        Sepia: 10,
        opacity: 70,
        invert: 0
    }
};

Object.keys(presets).forEach(presetName => {

    const presetbutton = document.createElement("button");

    presetbutton.classList.add("btn");
    presetbutton.innerText = presetName;

    presetbutton.addEventListener("click", () => {

        // preset ki values filters object mein daal do
        Object.keys(presets[presetName]).forEach(filterName => {

            filters[filterName].value = presets[presetName][filterName];

        });

        // sliders ko bhi new values dikhao
        Object.keys(filters).forEach(filterName => {

            const slider = document.querySelector(`#${filterName}`);

            if (slider) {
                slider.value = filters[filterName].value;
            }

        });

        // image par preset apply karo
        applyFilters();

    });

    presetContainer.appendChild(presetbutton);
});