// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Estilos mejorados para el contenedor de letras
lyrics.style.cssText = `
  font-size: 36px;
  font-family: 'Georgia', serif;
  color: #ffffff;
  position: absolute;
  bottom: 22%;
  width: 100%;
  text-align: center;
  z-index: 100;
  font-weight: bold;
  letter-spacing: 3px;
  text-shadow: 
    0 0 10px rgba(255, 133, 162, 0.9),
    0 0 20px rgba(255, 133, 162, 0.6),
    0 0 40px rgba(255, 133, 162, 0.4),
    2px 2px 4px rgba(0, 0, 0, 0.8);
  transition: opacity 0.8s ease-in-out;
  padding: 0 20px;
`;

function updateLyrics() {
  var time = audio.currentTime;
  var currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 6
  );

  if (currentLine) {
    var fadeInDuration = 0.8;
    var opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);
    lyrics.style.opacity = opacity;

    // Solo actualiza el texto si cambió
    if (lyrics.innerHTML !== currentLine.text) {
      lyrics.style.opacity = 0;
      setTimeout(() => {
        lyrics.innerHTML = currentLine.text;
        lyrics.style.opacity = 1;
      }, 300);
    }
  } else {
    lyrics.style.opacity = 0;
    setTimeout(() => {
      lyrics.innerHTML = "";
    }, 800);
  }
}

setInterval(updateLyrics, 300);

// Función para ocultar el título después de 216 segundos
function ocultarTitulo() {
  var titulos = document.querySelectorAll(".titulo");
  titulos.forEach(function(titulo) {
    titulo.style.animation = "fadeOut 3s ease-in-out forwards";
    setTimeout(function () {
      titulo.style.display = "none";
    }, 3000);
  });
}

setTimeout(ocultarTitulo, 216000);
