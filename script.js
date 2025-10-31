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


