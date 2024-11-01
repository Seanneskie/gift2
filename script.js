// Set up Fireworks
const container = document.body;
const fireworks = new Fireworks.default(container, {
  maxRockets: 5,
  rocketSpawnInterval: 100,
  numParticles: 80,
  explosionMinHeight: 0.2,
  explosionMaxHeight: 0.8,
  explosionChance: 0.08
});
fireworks.start();

// Transition to Photo Collage after a delay
const collageDelay = 20000; // 20 seconds
const photoCollage = document.getElementById("photoCollage");
const videoBackground = document.querySelector(".background-video");

// Simulate a list of image URLs (replace this with server-side logic if needed)
const images = [
  './images/image1.jpg',
  './images/image2.jpg',
  './images/image3.jpg',
  './images/image4.jpg',
  './images/image5.jpg',
  './images/image6.jpg',
  './images/image7.jpg',
  './images/image8.jpg',
  './images/image9.jpg',
  './images/image10.jpg',
  './images/image11.jpg',
  './images/image12.jpg',
];

// Dynamically set collage layout based on image count
const imageCount = images.length;
for (const imageSrc of images) {
  const img = document.createElement("img");
  img.src = imageSrc;
  photoCollage.appendChild(img);
}

// Adjust collage display based on device type
function setupCollageLayout() {
  if (window.innerWidth < 768) {
    // Mobile: show one image at a time with transition
    let currentImageIndex = 0;
    photoCollage.style.gridTemplateColumns = '1fr';
    photoCollage.style.gridTemplateRows = '1fr';

    // Hide all images initially
    const allImages = photoCollage.querySelectorAll('img');
    allImages.forEach(img => (img.style.display = 'none'));

    // Display one image at a time with interval
    const imageTransitionInterval = 3000; // 3 seconds per image
    setInterval(() => {
      allImages.forEach(img => (img.style.display = 'none')); // Hide all images
      allImages[currentImageIndex].style.display = 'block';    // Show current image
      currentImageIndex = (currentImageIndex + 1) % imageCount; // Move to the next image
    }, imageTransitionInterval);

  } else {
    // Desktop: display in a grid
    const columnCount = Math.ceil(Math.sqrt(imageCount));
    photoCollage.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
    photoCollage.style.gridTemplateRows = `repeat(${Math.ceil(imageCount / columnCount)}, 1fr)`;
  }
}

// Run layout setup on load and resize
setupCollageLayout();
window.addEventListener('resize', setupCollageLayout);

// Transition from video to photo collage
setTimeout(() => {
  videoBackground.style.opacity = '0';  // Fade out video
  photoCollage.style.opacity = '1';     // Fade in collage
}, collageDelay);

