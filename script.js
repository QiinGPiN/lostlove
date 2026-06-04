const container = document.getElementById("media-container");

// Cursor heart effect
document.addEventListener("mousemove", (e) => {
    const heart = document.createElement("span");
    heart.classList.add("heart-cursor");
    heart.innerText = "❤️";
    heart.style.left = e.clientX + "px";
    heart.style.top = e.clientY + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
});

// Media files
const photos = [
    "p1.jpg","p2.jpg","p3.jpg","p4.jpg","p5.jpg","p6.jpg",
    "p7.jpg","p8.jpg","p9.jpg","p10.jpg","p11.jpg","p12.jpg",
    "p13.jpg","p14.jpg","p15.jpg","p16.jpg","p17.jpg","p18.jpg",
    "p19.jpg","p20.jpg","p21.jpg","p22.jpg","p23.jpg","p24.jpg"
];

const videos = [
    "v0.mp4","v1.mp4","v2.mp4","v3.mp4","v4.mp4",
    "v5.mp4","v6.mp4","v7.mp4","v8.mp4","v9.mp4"
];

// Build full media list: all photos first, then videos
const allMedia = [
    ...photos.map(p => ({ type: "photo", src: `assets/photos/${p}` })),
    ...videos.map(v => ({ type: "video", src: `assets/videos/${v}` }))
];

let currentIndex = 0;

// --- LIGHTBOX ---
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
lightbox.innerHTML = `
  <span id="lightbox-close">✕</span>
  <div id="lightbox-content"></div>
  <div id="lightbox-nav">
    <button id="lb-prev">&#8592;</button>
    <button id="lb-next">&#8594;</button>
  </div>
`;
document.body.appendChild(lightbox);

function showMedia(index) {
    currentIndex = index;
    const content = document.getElementById("lightbox-content");
    content.innerHTML = "";

    const item = allMedia[index];

    if (item.type === "photo") {
        const img = document.createElement("img");
        img.src = item.src;
        content.appendChild(img);
    } else {
        const video = document.createElement("video");
        video.src = item.src;
        video.controls = true;
        video.autoplay = true;
        video.style.maxWidth = "95vw";
        video.style.maxHeight = "80vh";
        content.appendChild(video);
    }

    lightbox.classList.add("active");
}

document.getElementById("lightbox-close").addEventListener("click", () => {
    lightbox.classList.remove("active");
    document.getElementById("lightbox-content").innerHTML = "";
});

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove("active");
        document.getElementById("lightbox-content").innerHTML = "";
    }
});

document.getElementById("lb-prev").addEventListener("click", (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex - 1 + allMedia.length) % allMedia.length;
    showMedia(newIndex);
});

document.getElementById("lb-next").addEventListener("click", (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex + 1) % allMedia.length;
    showMedia(newIndex);
});

// Swipe support
let touchStartY = 0;
let touchStartX = 0;

lightbox.addEventListener("touchstart", (e) => {
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", (e) => {
    const diffY = touchStartY - e.changedTouches[0].clientY;
    const diffX = touchStartX - e.changedTouches[0].clientX;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        // horizontal swipe
        if (diffX > 50) showMedia((currentIndex + 1) % allMedia.length);
        if (diffX < -50) showMedia((currentIndex - 1 + allMedia.length) % allMedia.length);
    } else {
        // vertical swipe down = close
        if (diffY < -80) {
            lightbox.classList.remove("active");
            document.getElementById("lightbox-content").innerHTML = "";
        }
    }
});

// Load Photos
photos.forEach((photo, i) => {
    const img = document.createElement("img");
    img.src = `assets/photos/${photo}`;
    img.style.cursor = "pointer";
    img.addEventListener("click", () => showMedia(i));
    container.appendChild(img);
});

// Load Videos
videos.forEach((videoFile, i) => {
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.style.cursor = "pointer";
    wrapper.style.display = "inline-block";

    const video = document.createElement("video");
    video.src = `assets/videos/${videoFile}`;
    video.controls = false;
    video.style.width = "300px";
    video.style.borderRadius = "10px";
    video.style.border = "3px solid crimson";
    video.style.boxShadow = "0 0 20px red";
    video.style.display = "block";

    const playBtn = document.createElement("div");
    playBtn.innerHTML = "▶";
    playBtn.style.cssText = `
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        color: white;
        text-shadow: 0 0 10px red;
        pointer-events: none;
    `;

    wrapper.appendChild(video);
    wrapper.appendChild(playBtn);
    wrapper.addEventListener("click", () => showMedia(photos.length + i));
    container.appendChild(wrapper);
});

// --- MUSIC ---
const music = document.getElementById("bgMusic");
const btn = document.getElementById("startMusic");

btn.addEventListener("click", () => {
    music.play()
        .then(() => {
            btn.innerText = "♪ Playing...";
            btn.style.opacity = "0.6";
        })
        .catch(err => {
            console.error("Music error:", err);
            btn.innerText = "⚠ Can't play";
        });
});
