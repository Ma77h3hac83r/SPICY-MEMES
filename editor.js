const canvas = document.getElementById("memeCanvas");
const ctx = canvas.getContext("2d");
const img = new Image();

// Get the image source, memeName, and tags from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const imageSrc = urlParams.get("img");
const memeName = urlParams.get("memeName");
const tags = urlParams.get("tags");

// Display memeName and tags
document.getElementById("memememeName").textContent = memeName;
document.getElementById("memeTags").textContent = tags;

img.onload = function () {
  // Calculate the scaled dimensions
  const maxWidth = Math.min(img.width, window.innerWidth * 0.8);
  const maxHeight = window.innerHeight * 0.7;
  const scale = Math.min(maxWidth / img.width, maxHeight / img.height);

  canvas.width = img.width * scale;
  canvas.height = img.height * scale;

  drawMeme();
};
img.src = imageSrc;

function drawMeme() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the image
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // Set text style
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  const fontSize = Math.max(20, Math.floor(canvas.height / 10)); // Adjust font size based on canvas height
  ctx.font = `${fontSize}px Impact`;
  ctx.textAlign = "center";

  // Draw top text
  const topText = document.getElementById("topText").value;
  ctx.fillText(topText, canvas.width / 2, fontSize + 10);
  ctx.strokeText(topText, canvas.width / 2, fontSize + 10);

  // Draw bottom text
  const bottomText = document.getElementById("bottomText").value;
  ctx.fillText(bottomText, canvas.width / 2, canvas.height - 10);
  ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 10);
}

function saveMeme() {
  // Create a temporary link element
  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = canvas.toDataURL("image/png");

  // Trigger the download
  link.click();
}

document.getElementById("topText").addEventListener("input", drawMeme);
document.getElementById("bottomText").addEventListener("input", drawMeme);
document.getElementById("saveMeme").addEventListener("click", saveMeme);

// Redraw meme when window is resized
window.addEventListener("resize", () => {
  const maxWidth = Math.min(img.width, window.innerWidth * 0.8);
  const maxHeight = window.innerHeight * 0.7;
  const scale = Math.min(maxWidth / img.width, maxHeight / img.height);

  canvas.width = img.width * scale;
  canvas.height = img.height * scale;

  drawMeme();
});

document.addEventListener("DOMContentLoaded", () => {
  // Get the image URL from the query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const imageUrl = urlParams.get("image");

  if (imageUrl) {
    // Load the image into the editor
    loadImageIntoEditor(imageUrl);
  } else {
    console.error("No image URL provided");
    // Optionally, display an error message to the user
  }
});

function loadImageIntoEditor(imageUrl) {
  const editorCanvas = document.getElementById("editor-canvas");
  const ctx = editorCanvas.getContext("2d");

  const img = new Image();
  img.onload = () => {
    // Resize canvas to match image dimensions
    editorCanvas.width = img.width;
    editorCanvas.height = img.height;

    // Draw the image on the canvas
    ctx.drawImage(img, 0, 0);

    // Additional setup for editing tools can be done here
  };
  img.onerror = () => {
    console.error("Failed to load image");
    // Optionally, display an error message to the user
  };
  img.src = decodeURIComponent(imageUrl);
}
