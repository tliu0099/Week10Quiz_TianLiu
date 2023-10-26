let song;
let fft;
let audioStarted = false;

function preload() {
  soundFormats('mp3');
  song = loadSound('audio/sample-visualisation.mp3');
}

function setup() {
  createCanvas(400, 400);
  fft = new p5.FFT();
  song.connect(fft);
}

function draw() {
  background(220);

  if (!audioStarted) {
    return;
  }

  let spectrum = fft.analyze();
  noFill();
  beginShape();

  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = map(spectrum[i], 0, 255, height, 0);
    
    let col = color(map(i, 0, spectrum.length, 0, 255), 255, 255);
    stroke(col);

    vertex(x, h);
  }
  endShape();
}

function mousePressed() {
  if (!audioStarted) {
    userStartAudio();
    song.play();
    audioStarted = true;
    return;
  }

  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}
