const $tbody = document.querySelector(".main-container__tbody");
const $table = document.querySelector(".main-container__table");
const $p = document.querySelectorAll(".main-container__p")[1];
const $fragment = document.createDocumentFragment();
let aux = 0;
let jsonArray = [];

const userData = async () => {
    try {
        /*Hago la petición mediante el método global de Fetch y bloqueo el código con await hasta que retorne la petición.
        se hace la conversión de la petición a formato json y bloqueo el código con await hasta que termine de hacerlo.*/
        let request = await fetch("https://jsonplaceholder.typicode.com/users");
        let json = await request.json();

        /*Si la propiedad "ok" en la promesa asignada a la variable request es falsa, entonces, habrá una excepcion
        la cual va a retornar un objeto con los atributos status y request
        los cuales van a tener como valor el status de la petición y el texto que devuelva como mensaje,
        esto hace que se rompa el try y pase al catch.*/
        if(!request.ok) throw{status: request.status, statusText: request.statusText};

        /*Los datos convertidos a JSON vienen en una estructura de 
        arreglo de objetos, estos son convertidos a un arreglo de arreglos para su manejo en el DOM.
        Los objetos son convertidos en arreglos mediante el método "values" del constructor Object."*/
        for(let i = 0; i < json.length; i++) {
            jsonArray[i] = Object.values(json[i]);
        }

        for(let i = 0; i < json.length; i++) {
            const $tr = document.createElement("tr");//Se crea un elemento tr y se le da la clase correspondiente
            $tr.setAttribute("class", "main-container__tr");
            for(let j = 0; j <= 3; j++) {
                const $td = document.createElement("td");//Se crea un elemento td, se le asigna la clase correspondiente
                $td.setAttribute("class", "main-container__td");//y se le inserta contenido.
                $td.textContent = jsonArray[i][j];
                if(aux === 0) {//Si aux es igual a 0 significa que se está insertando el ID.
                    $td.setAttribute("data-td", "Id");//Se le asigna un data-attribute al td.
                }else if(aux == 1){//Si aux es igual a 1 significa que se está insertando el Nombre.
                    $td.setAttribute("data-td", "Nombre");
                }else if(aux === 2) {//Si aux es igual a 3 significa que se está insertando el Nombre de ususario.
                    $td.setAttribute("data-td", "Nombre de usuario");
                }else if(aux === 3) {//Si aux es igual a 4 significa que se está insertando el Email.
                    $td.setAttribute("data-td", "Email");
                }

                aux++;//Itera uno más.
                $tr.appendChild($td);//se le inserta al elemento tr los elementos td.
            }

            aux = 0;//Se recetea la variable auxiliar.
            $fragment.appendChild($tr);//Se insertan los tr al fragmento.
        }

        $tbody.appendChild($fragment);//Se inserta el fragmento al DOM.

    }catch(err)  {//Manejo del error, catch recibe como parametro lo devuelto con la excepcion "throw".
        let message = err.statusText || `Ocurrió un error ${err.status} :c`;
        $table.classList.add("none");
        $p.textContent = message;
        $p.classList.remove("none");
    }
    /*La variable message es igual a un operador corto circuito, si lo que hay en "err.statusText" está vacío
    entonces la variable es igual a la segunda opción.
    La tabla es escondida, se le inserta contenido al parrafo en el DOM y se le remueve la clase none.*/
}

export default userData;// Se exporta la función "userData".
