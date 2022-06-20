let marcar = ["O", "X"]; 
let turnoJugador1 = 0;
let turnoJugador2 = 1;
let celdasUsadas = 0;
let finPartida = false;
let mensajefinJuego = document.getElementById("mensajeFinJuego");
let reiniciarJuego = document.getElementById("reiniciarJuego");
let matriz = Array.from(document.getElementsByClassName("celda"));

matriz.forEach(x => x.addEventListener("click", marcarCelda));

function marcarCelda(event)
{
    let fichaMarcada = event.target;
    if(!finPartida && fichaMarcada.innerHTML == "" && celdasUsadas % 2 == 0)
    {
        fichaMarcada.innerHTML = marcar[turnoJugador1];
        celdasUsadas += 1;
        comparar();

       if(celdasUsadas < 9 && finPartida == false)
        {
        Maquina();
        celdasUsadas += 1;
        comparar();
        }
    }
    ganador();
    if(celdasUsadas == 9 && finPartida == false)
    {
        mensajefinJuego.innerHTML = "El juego termino en Empate.";
    }
}


function ganador()
{
    if(finPartida == true && celdasUsadas % 2 == 0)
    {
        mensajefinJuego.innerHTML = "Gano el Jugador con la ficha X";
    }
    if(finPartida == true && celdasUsadas % 2 != 0)
    {
        mensajefinJuego.innerHTML = "Gano el Jugador con la ficha 0";
    }
}

function Maquina()
{
    function aleatorio(max, min)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let celdaPorMarcar = matriz.map(x => x.innerHTML);
    let p = -1;

    if(celdaPorMarcar[4] == "")
    {
        p = 4;
    }else /*if(celdaPorMarcar[0] == "")
    {
        p = 0;
    }else if(celdaPorMarcar[2] == "")
    {
        p = 2;
    }else if(celdaPorMarcar[6] == "")
    {
        p = 6;
    }else if(celdaPorMarcar[8] == "")
    {
        p = 8;
    }else */
    {                  
        let a = aleatorio(0, matriz.length -1);
        while(celdaPorMarcar[a] != "")
        {
            a = aleatorio(0, matriz.length -1);
        }
        p = a;
    }
    matriz[p].innerHTML = marcar[turnoJugador2];
}


reiniciarJuego.addEventListener("click", reiniciar)

function reiniciar()
{
    celdasUsadas = 0;
    finPartida = false;
    matriz.forEach(x => x.innerHTML = "");
    mensajefinJuego.innerHTML = "<br/>";
}



function comparar()
{
    let contador = 0;
    let espacio = matriz.map(x => x.innerHTML);

    if(espacio[0] != "" && espacio[0] == espacio[1] && espacio[0] == espacio[2]) //fila 1 -> 0.1.2
    {
        contador = 1;
    }else if(espacio[3] != "" && espacio[3] == espacio[4] && espacio[3] == espacio[5]) //fila 2 -> 3.4.5
    {
        contador = 2;
    }else if(espacio[6] != "" && espacio[6] == espacio[7] && espacio[6] == espacio[8]) //fila 3 -> 6.7.8
    {
        contador = 3;
    }else if(espacio[0] != "" && espacio[0] == espacio[3] && espacio[0] == espacio[6]) //columna 1 -> 0.3.6
    {
        contador = 4;
    }else if(espacio[1] != "" && espacio[1] == espacio[4] && espacio[1] == espacio[7]) //columna 2 -> 1.4.7
    {
        contador = 5;
    }else if(espacio[2] != "" && espacio[2] == espacio[5] && espacio[2] == espacio[8]) //columna 3 -> 2.5.8
    {
        contador = 6;
    }else if(espacio[0] != "" && espacio[0] == espacio[4] && espacio[0] == espacio[8]) //diagonal 1 -> 0.4.8
    {
        contador = 7;
    }else if(espacio[2] != "" && espacio[2] == espacio[4] && espacio[2] == espacio[6]) //diagonal 2 -> 2.4.6
    {
        contador = 8;
    }
    if(contador >= 1)
    {
        finPartida = true;
    }
}
