(function () {
  const root = document.getElementById('fourier');
  if (!root) return;

  const canvas = root.querySelector('#div2-waveCanvas');
  const stage = root.querySelector('.div2-stage');
  if (!canvas || !stage) return;

  const ctx = canvas.getContext('2d');

  let width = 0, height = 0, centerY = 0, centerX = 0;

  const logoRadius = 75;
  const colorChaos = '#ff3b3b';
  const colorsOrder = ['#00f2ff', '#4facfe', '#7000ff'];

  const state = {
    phase: 'intro',
    leftProgress: 0,
    rightProgress: 0,
    time: 0,
    isDetailsExpanded: false,
    currentRotation: 0
  };

  function resizeToStage() {
    const rect = stage.getBoundingClientRect(); // common pattern for “fit parent” sizing [web:12]
    const dpr = window.devicePixelRatio || 1;

    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    centerX = width / 2;
    centerY = height / 2;
  }

  window.addEventListener('resize', resizeToStage);
  resizeToStage();

  function getChaoticWave(x, t) {
    const f = 0.008;
    return (
      Math.sin(x * f + t) * 40 +
      Math.sin(x * f * 2.5 + t * 1.5) * 20 +
      Math.sin(x * f * 5 + t * 2) * 10
    );
  }

  function getSimpleSine(x, t, freqMult, speedMult) {
    const f = 0.01;
    return Math.sin(x * f * freqMult + t * speedMult) * 30;
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // 1) Left wave
    if (state.phase !== 'intro') {
      const startX = 0;
      const endX = centerX - logoRadius / 2;
      const currentHeadX = startX + (endX - startX) * state.leftProgress;

      ctx.beginPath();
      ctx.strokeStyle = colorChaos;
      ctx.lineWidth = 3;
      ctx.shadowBlur = 15;
      ctx.shadowColor = colorChaos;
      ctx.globalAlpha = 1;

      for (let x = startX; x <= currentHeadX; x += 3) {
        const y = centerY + getChaoticWave(x, state.time);
        if (x === startX) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // 2) Right waves
    if (state.rightProgress > 0) {
      const angles = [-15 * (Math.PI / 180), 0, 15 * (Math.PI / 180)];
      const speeds = [1.2, 1.0, 0.8];
      const freqs = [1.5, 1.0, 2.0];

      const originX = centerX + logoRadius / 2;
      const originY = centerY;
      const maxDist = width;
      const currentWaveLength = maxDist * state.rightProgress;

      angles.forEach((angle, i) => {
        ctx.save();
        ctx.translate(originX, originY);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.strokeStyle = colorsOrder[i];
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = colorsOrder[i];
        ctx.globalAlpha = 1;

        for (let x = 0; x <= currentWaveLength; x += 3) {
          const y = getSimpleSine(x + originX, state.time, freqs[i], speeds[i]);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();
      });
    }

    state.time -= 0.02;
    requestAnimationFrame(draw);
  }

  function startSequence() {
    const tl = anime.timeline({ easing: 'easeOutExpo' }); // standard pattern [web:1]

    tl.add({
      targets: [root.querySelector('.main-headline'), root.querySelector('.sub-headline')].filter(Boolean),
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: anime.stagger(200)
    }).add({
      targets: root.querySelector('.div2-logo-container'),
      scale: [0, 1],
      opacity: [0, 1],
      duration: 1200,
      easing: 'easeOutElastic(1, .5)',
      complete: () => {
        state.phase = 'injecting';
        startSignalInjection();
      }
    }, '-=500');

    anime({
      targets: root.querySelector('.div2-logo-container'),
      borderColor: ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.3)'],
      duration: 3000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    });
  }

  function startSignalInjection() {
    anime({
      targets: state, // animating a JS object is supported [web:3]
      leftProgress: [0, 1],
      duration: 2000,
      easing: 'linear',
      begin: () => {
        anime({
          targets: root.querySelector('.label-box.left'),
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 800
        });
      },
      complete: () => {
        state.phase = 'processing';
        startProcessing();
      }
    });
  }

  function triggerRotation() {
    state.currentRotation += 120;
    anime({
      targets: root.querySelector('.div2-logo-wrapper'),
      rotate: state.currentRotation,
      duration: 1200,
      easing: 'easeInOutExpo'
    });
  }

  function startProcessing() {
    const beatDuration = 600;

    anime({
      targets: root.querySelector('.div2-logo-container'),
      scale: [1, 1.15],
      boxShadow: ['0 0 10px rgba(0, 242, 255, 0.1)', '0 0 60px rgba(0, 242, 255, 0.5)'],
      borderColor: ['rgba(255, 255, 255, 0.3)', 'rgba(0, 242, 255, 0.8)'],
      duration: beatDuration,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    });

    triggerRotation();
    setInterval(triggerRotation, 1200);

    setTimeout(() => {
      state.phase = 'ejecting';
      startOutputEjection();
    }, 1000);
  }

  function startOutputEjection() {
    anime({
      targets: state,
      rightProgress: [0, 1],
      duration: 2000,
      easing: 'easeOutCubic',
      begin: () => {
        anime({
          targets: root.querySelector('.label-box.right'),
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 800
        });
      },
      complete: () => {
        state.phase = 'flowing';
      }
    });
  }

  // Keep your inline onclick="toggleDetails()" working,
  // but scope it to this component.
  window.toggleDetails = function toggleDetails() {
    state.isDetailsExpanded = !state.isDetailsExpanded;

    const caretRotate = state.isDetailsExpanded ? 90 : 0;
    const headerMove = state.isDetailsExpanded ? -10 : 0;

    anime({
      targets: root.querySelectorAll('.caret'),
      rotate: caretRotate,
      duration: 300,
      easing: 'easeOutQuad'
    });

    anime({
      targets: root.querySelectorAll('.label-header'),
      translateY: headerMove,
      duration: 300,
      easing: 'easeOutQuad'
    });

    if (state.isDetailsExpanded) {
      anime({
        targets: root.querySelectorAll('.label-content'),
        height: (el) => el.scrollHeight,
        opacity: 1,
        duration: 400,
        easing: 'easeOutCubic'
      });
    } else {
      anime({
        targets: root.querySelectorAll('.label-content'),
        height: 0,
        opacity: 0,
        duration: 400,
        easing: 'easeOutCubic'
      });
    }
  };

  // Init
  draw();
  startSequence();
})();