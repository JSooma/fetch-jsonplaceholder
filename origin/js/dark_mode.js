const MOON = "origin/multimedia/img/darkmode.png";
const SUN = "origin/multimedia/img/lightmode.png";
const $img = document.querySelector(".main-container__img");

export default function darkmode(btnDarkMode) {
    //Hace una consulta de medios, si el usuario tiene el modo claro en sus preferencias del sistema manda un
    //atributo class con el valor light, de no ser así entonces tiene el dark y manda una clase con valor dark.
    if(matchMedia("(perfers-color-scheme: light)").matches) {
        document.documentElement.setAttribute("class", "light");
        $img.setAttribute("src", MOON);
    }else {
        document.documentElement.setAttribute("class", "dark");
        $img.setAttribute("src", SUN);
    }

     //si el elemento que origina el evento es el indicado entonces hace una condición
    //si el elemento html tiene una clase con el valor light entonces cambia el valor de la clase light por dark
    //y guarda una variable local storage con el valor dark.
    //si el elemento html no tiene una clase light entonces tiene una dark y cambia el valor de la clase dark por light
    //y guarda una variable local storage con el valor light.
    document.addEventListener("click", e => {
        if(e.target.matches(btnDarkMode) || e.target.matches(`${btnDarkMode} *`)) {
            if(document.documentElement.getAttribute("class") === "light") {
                document.documentElement.setAttribute("class", "dark");
                $img.setAttribute("src", SUN);
                localStorage.setItem("theme", "dark");
            }else {
                document.documentElement.setAttribute("class", "light");
                $img.setAttribute("src", MOON);
                localStorage.setItem("theme", "light");
            }
        }
    });

    if(localStorage.getItem("theme") === "light") {//Si el valor de la variable local storage es light entonces manda al elemento html
        document.documentElement.setAttribute("class", "light");//la clase light.
        $img.setAttribute("src", MOON);
    }else {//Si el valor de la variable local storage es dark entonces manda al elemento html la clase dark.
        document.documentElement.setAttribute("class", "dark");
        $img.setAttribute("src", SUN);
    }
}