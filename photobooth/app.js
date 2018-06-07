// import your modules
import { populateVideo, drawToCanvas } from './src/video';
import { takePhoto, countdown } from './src/photo';

// make an async function
async function go() {
  const videoEl = document.querySelector('video');
  const canvasEl = document.querySelector('canvas');
  const strip = document.querySelector('.strip');
  const filterButtons = document.querySelectorAll('button.filter');
  const countdownButton = document.querySelector('.count');

  if (!videoEl) {
    throw Error('No video Element Found on the page. 🇨🇦')};

  // next we  will get the video from the webcam
  await populateVideo(videoEl);

  // size the canvas to be the same size as the videoEl
  canvasEl.height = videoEl.videoHeight;
  canvasEl.width = videoEl.videoWidth;

  // draw to canvas
  let interval;
  // = setInterval(() => {
  //   drawToCanvas(videoEl, canvasEl);
  // }, 16);

  const draw = () => {
    drawToCanvas(videoEl, canvasEl);
    interval = window.requestAnimationFrame(draw);
  };
  interval = window.requestAnimationFrame(draw);

  canvasEl.addEventListener('click', () => {
    takePhoto(videoEl, canvasEl, strip);
  });

  countdownButton.addEventListener('click', () => {
    console.log('Click');
    countdown(videoEl, canvasEl, strip);
  });

  filterButtons.forEach(button => {
    button.addEventListener('click', async function() {
      cancelAnimationFrame(interval);
      const filter = this.dataset.filter;
      const filters = await import('./src/filters');
      const { redEffect, default: CatStuff } = await import('./src/filters');
      const draw = () => {
        drawToCanvas(videoEl, canvasEl, filters[filter]);
        interval = window.requestAnimationFrame(draw);
      };
      interval = window.requestAnimationFrame(draw);
    });
  });
}

// call that function on page load
go();

// Service Workers.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    const registration = await navigator.serviceWorker.register('./service-worker.js', {
      scope: '/',
    });
    // Registration successful
    console.log('serviceWorker registration was successful with: ', registration.scope);
    // TODO: listen for updates
  });
}


// this is just a little bit of code that makes our tooling reload the page if
// and then the modules are updated. For development only.
if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload();
  });
}
