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
const images = [
  './images/image1.webp',
  './images/image2.jpg',
  './images/image3.jpg',
  './images/image4.jpg',
  './images/image5.jfif',
  './images/image6.jfif',
  './images/image7.jpg',
  './images/image8.jpg',
  './images/image9.jfif',
];

// Reference the photo collage and video elements
const photoCollage = document.getElementById("photoCollage");
const videoBackground = document.querySelector(".background-video");

// Dynamically add images to the collage
images.forEach((imageSrc) => {
  const img = document.createElement("img");
  img.src = imageSrc;
  photoCollage.appendChild(img);
});

// Set up the slideshow for desktop view
function setupCollageLayout() {
  const allImages = photoCollage.querySelectorAll("img");
  const imageCount = allImages.length;

  if (window.innerWidth < 768) {
    // Mobile: show one image at a time with a transition
    let currentImageIndex = 0;
    photoCollage.style.gridTemplateColumns = "1fr";
    photoCollage.style.gridTemplateRows = "1fr";

    // Hide all images initially
    allImages.forEach((img) => (img.style.display = "none"));

    // Display one image at a time with an interval
    const imageTransitionInterval = 5000; // 3 seconds per image
    setInterval(() => {
      allImages.forEach((img) => (img.style.display = "none")); // Hide all images
      allImages[currentImageIndex].style.display = "block"; // Show current image
      currentImageIndex = (currentImageIndex + 1) % imageCount; // Move to next image
    }, imageTransitionInterval);
  } else {
    // Desktop: show 3 images per slide
    const imagesPerSlide = 3;
    let currentSlideIndex = 0;
    
    // Arrange in a 3-column grid
    photoCollage.style.display = "grid";
    photoCollage.style.gridTemplateColumns = "repeat(3, 1fr)";
    
    // Hide all images initially
    allImages.forEach((img) => (img.style.display = "none"));

    // Function to update the current slide
    function showSlide() {
      // Hide all images
      allImages.forEach((img) => (img.style.display = "none"));
      
      // Show the current set of 3 images
      for (let i = 0; i < imagesPerSlide; i++) {
        const imgIndex = (currentSlideIndex * imagesPerSlide + i) % imageCount;
        allImages[imgIndex].style.display = "block";
      }

      // Move to the next slide
      currentSlideIndex = (currentSlideIndex + 1) % Math.ceil(imageCount / imagesPerSlide);
    }

    // Start the slideshow with an interval
    showSlide();
    setInterval(showSlide, 5000); // Change slide every 3 seconds
  }
}

// Run layout setup on load and resize
setupCollageLayout();
window.addEventListener("resize", setupCollageLayout);

// Set delay for transition from video to photo collage
const collageDelay = 12000; // 12 seconds delay

// Transition from video to photo collage after delay and refresh page
setTimeout(() => {
  videoBackground.style.opacity = "0";  // Fade out video
  photoCollage.style.opacity = "1";     // Fade in collage
  setTimeout(() => {
    location.reload(); // Refresh the page after showing collage
  }, 30000); // Refresh 5 seconds after the collage transition
}, collageDelay);
