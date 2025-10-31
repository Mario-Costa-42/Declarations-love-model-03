 const startDate = new Date("2020-12-22T00:00:00"); // <-- altere a data aqui

    function updateCounter() {
      const now = new Date();
      let diff = now - startDate;

      const totalSeconds = Math.floor(diff / 1000);

      const years = Math.floor(totalSeconds / (3600 * 24 * 365.25));
      const months = Math.floor((totalSeconds % (3600 * 24 * 365.25)) / (3600 * 24 * 30.44));
      const days = Math.floor((totalSeconds % (3600 * 24 * 30.44)) / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      document.getElementById("years").innerHTML =
        `<span>${years}</span> anos <span>${months}</span> meses <span>${days}</span> dias`;

      document.getElementById("time").innerHTML =
        `<span>${hours}</span> horas <span>${minutes}</span> minutos <span>${seconds}</span> segundos`;

      document.getElementById("date").innerHTML = `Desde ${startDate.toLocaleDateString("pt-BR")}`;
    }

    updateCounter();
    setInterval(updateCounter, 1000);
    

//script do carrossel 

const slides = document.getElementById("slides");
    const total = slides.children.length;
    let index = 0;
    let auto;

    const dotsContainer = document.getElementById("dots");
    for (let i = 0; i < total; i++) {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");
      dotsContainer.appendChild(dot);
    }
    const dots = dotsContainer.children;

    function updateCarousel() {
      slides.style.transform = `translateX(-${index * 100}%)`;
      [...dots].forEach((d, i) => d.classList.toggle("active", i === index));
    }

    function nextSlide() {
      index = (index + 1) % total;
      updateCarousel();
    }

    function prevSlide() {
      index = (index - 1 + total) % total;
      updateCarousel();
    }

    document.getElementById("next").onclick = () => {
      clearInterval(auto);
      nextSlide();
      startAuto();
    };
    document.getElementById("prev").onclick = () => {
      clearInterval(auto);
      prevSlide();
      startAuto();
    };

    function startAuto() {
      auto = setInterval(nextSlide, 3000);
    }
    startAuto();


// parte da mensagem

 // Criar estrelas cintilantes
        const starsContainer = document.getElementById('stars');
        const starCount = 50;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Posição aleatória
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            
            // Tamanho aleatório
            const size = Math.random() * 3;
            
            // Duração da animação aleatória
            const duration = 3 + Math.random() * 7;
            const delay = Math.random() * 5;
            
            star.style.left = `${left}%`;
            star.style.top = `${top}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.animationDuration = `${duration}s`;
            star.style.animationDelay = `${delay}s`;
            
            starsContainer.appendChild(star);
        }

// Fim da parte da mensagem

// raspe para revelar

const svg = document.getElementById('svgStage');
    const maskImage = document.getElementById('maskImage');

    const maskCanvas = document.createElement('canvas');
    const MASK_W = 800, MASK_H = 800;
    maskCanvas.width = MASK_W; maskCanvas.height = MASK_H;
    const mctx = maskCanvas.getContext('2d');

    function clearMask() {
      mctx.clearRect(0,0,MASK_W,MASK_H);
      mctx.fillStyle = 'black';
      mctx.fillRect(0,0,MASK_W,MASK_H);
      updateMaskImage();
    }

    clearMask();

    function updateMaskImage(){
      const url = maskCanvas.toDataURL('image/png');
      maskImage.setAttribute('href', url);
    }

    function drawHeartOnMask(x, y, s){
      mctx.save();
      mctx.beginPath();
      const topCurveHeight = s * 0.3;
      mctx.moveTo(x, y + topCurveHeight);
      mctx.bezierCurveTo(x, y, x - s/2, y, x - s/2, y + topCurveHeight);
      mctx.bezierCurveTo(x - s/2, y + (s+topCurveHeight)/2, x, y + (s+topCurveHeight)/1.1, x, y + s);
      mctx.bezierCurveTo(x, y + (s+topCurveHeight)/1.1, x + s/2, y + (s+topCurveHeight)/2, x + s/2, y + topCurveHeight);
      mctx.bezierCurveTo(x + s/2, y, x, y, x, y + topCurveHeight);
      mctx.closePath();
      mctx.fillStyle = 'white';
      mctx.fill();
      mctx.restore();
      updateMaskImage();
    }

    function clientToSvg(evt){
      const pt = svg.createSVGPoint();
      if (evt.touches && evt.touches[0]) { pt.x = evt.touches[0].clientX; pt.y = evt.touches[0].clientY; }
      else { pt.x = evt.clientX; pt.y = evt.clientY; }
      const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
      return { x: svgP.x, y: svgP.y };
    }

    let painting = false;
    const BRUSH_SIZE = 80;

    function pointerDown(e){
      painting = true; if (e.type === 'touchstart') e.preventDefault();
      const p = clientToSvg(e);
      drawHeartOnMask(p.x, p.y, BRUSH_SIZE);
    }
    function pointerMove(e){
      if (!painting) return;
      const p = clientToSvg(e);
      drawHeartOnMask(p.x, p.y, BRUSH_SIZE);
    }
    function pointerUp(){ painting = false; }

    svg.addEventListener('pointerdown', pointerDown);
    svg.addEventListener('pointermove', pointerMove);
    window.addEventListener('pointerup', pointerUp);

    svg.addEventListener('touchstart', pointerDown, {passive:false});
    svg.addEventListener('touchmove', pointerMove, {passive:false});
    window.addEventListener('touchend', pointerUp);

    svg.addEventListener('dragstart', e=>e.preventDefault());

// Fim do raspe para revelar

//tocar audio

document.addEventListener("DOMContentLoaded", function() {
  const song = document.getElementById('song01');
  song.volume = 0.9;
  song.play().catch(() => {}); // evita erro se autoplay for bloqueado
});

//chuva de corações

 function createHeart() {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤';
            
            // Posição aleatória no topo
            heart.style.left = Math.random() * 100 + 'vw';
            
            // Duração aleatória da animação
            const duration = Math.random() * 8 + 8;
            heart.style.animationDuration = duration + 's';
            
            // Tamanho aleatório
            const size = Math.random() * 20 + 18;
            heart.style.fontSize = size + 'px';
            
            // Atraso aleatório
            heart.style.animationDelay = Math.random() * 5 + 's';
            
            // Opacidade um pouco maior para cores mais fortes
            heart.style.opacity = Math.random() * 0.3 + 0.7;
            
            document.getElementById('heartsContainer').appendChild(heart);
            
            // Remover o coração após a animação
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, duration * 1000);
        }
        
        function startHearts() {
            // Criar corações em intervalos regulares
            setInterval(createHeart, 800);
        }
        
        // Iniciar quando a página carregar
        window.onload = startHearts;