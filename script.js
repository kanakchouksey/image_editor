
const filters = {
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

    exposure: {
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


let filtersdiv = document.querySelector(".filters");

const imageinput = document.querySelector("#image-input");

const imageCanvas = document.querySelector("#image-canvas");
const Canvasctx = imageCanvas.getContext("2d");

const placeholder = document.querySelector(".placeholder");

let image = null;


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
        
        applyfilter(name);

    });


    return div;
}


Object.keys(filters).forEach(key => {

    const filterElement = createElement(
        key,
        filters[key].unit,
        filters[key].value,
        filters[key].min,
        filters[key].max
    );

    filtersdiv.appendChild(filterElement);

});


// Image input

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


function applyfilter(name) {
let filterName = name;

    if (name == "huerotate") {
        filterName = "hue-rotate";
    }


    Canvasctx.filter =
        `${filterName}(${filters[name].value}${filters[name].unit})`;

    Canvasctx.drawImage(image, 0, 0);

}
