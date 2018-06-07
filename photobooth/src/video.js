export async function populateVideo(videoEl) {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720 },
  });
  videoEl.srcObject = stream;
  await videoEl.play();
  console.log('Playing!!!');
}

export async function drawToCanvas(video, canvas, filter) {
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0,0);
  // check for the pixels
  if (filter) {
    // grab the pixels from the canvas
    let pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //filter the pixels
    pixels = filter(pixels);
    // put them on the canvas
    ctx.putImageData(pixels, 0 ,0);
  }
}
