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
    


const slides = document.querySelector('.carrossel-slides');
  const dots = document.querySelectorAll('.dot');
  const total = 6;
  let index = 0;
  let startX = 0;
  let endX = 0;
  let intervalo;

  function mostrarSlide() {
    slides.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  }

  function proximoSlide() {
    index = (index + 1) % total;
    mostrarSlide();
  }

  function anteriorSlide() {
    index = (index - 1 + total) % total;
    mostrarSlide();
  }

  function iniciarAutoPlay() {
    intervalo = setInterval(proximoSlide, 3000);
  }

  function pararAutoPlay() {
    clearInterval(intervalo);
  }

  // Detecta arraste (touch e mouse)
  slides.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    pararAutoPlay();
  });

  slides.addEventListener('touchend', e => {
    endX = e.changedTouches[0].clientX;
    handleGesture();
    iniciarAutoPlay();
  });

  slides.addEventListener('mousedown', e => {
    startX = e.clientX;
    pararAutoPlay();
  });

  slides.addEventListener('mouseup', e => {
    endX = e.clientX;
    handleGesture();
    iniciarAutoPlay();
  });

  function handleGesture() {
    const diff = endX - startX;
    if (Math.abs(diff) > 50) { // só muda se o arraste for suficiente
      if (diff < 0) proximoSlide();
      else anteriorSlide();
    }
  }

iniciarAutoPlay();