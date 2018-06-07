import wait from 'waait';

export function takePhoto(video, canvas, strip) {
  console.log('Taking a photo. 📸');
  document.body.classList.add('taking');
  // get an image from the canvas
  const data = canvas.toDataURL('image/jpg');
  // create an image element
  const img = document.createElement('img');
  // set the source of the image to the data
  img.src = data;
  // create a link
  const link = document.createElement('a');
  // set attributes on the link
  link.setAttribute('download', `photo-${Date.now()}.jpg`);
  link.setAttribute('href', data);
  // Add a class of full
  link.classList.add('full');
  // put the image in the link
  link.appendChild(img);
  // put the link in the strip at the first position
  strip.insertBefore(link, strip.firstChild);

  // animate some stuff
  setTimeout(() => {
    link.classList.remove('full');
    document.body.classList.remove('taking');
  }, 250);
}

export async function countdown(video, canvas, strip) {
  const span = document.querySelector('.countdown');
  span.textContent = 3;
  await wait(1000);
  span.textContent = 2;
  await wait(1000);
  span.textContent = 1;
  await wait(500);
  span.textContent = '!!🧀!!';
  await wait(200);
  span.textContent = '';
  await wait(300);
  takePhoto(video, canvas, strip);
}
