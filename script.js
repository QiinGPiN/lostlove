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

// 🔴 ADD YOUR FILE NAMES HERE
const photos = [
    "p1.jpg",
    "p2.jpg",
    "p3.jpg",
    "p4.jpg",
    "p5.jpg",
    "p6.jpg",
    "p7.jpg",
    "p8.jpg",
    "p9.jpg",
    "p10.jpg",
    "p11.jpg",
    "p12.jpg",
    "p13.jpg",
    "p14.jpg",
    "p15.jpg",
    "p16.jpg",
    "p17.jpg",
    "p18.jpg",
    "p19.jpg",
    "p20.jpg",
    "p21.jpg",
    "p22.jpg",
    "p23.jpg",
    "p24.jpg"
];

const videos = [
    "v0.mp4",
    "v1.mp4",
    "v2.mp4",
    "v3.mp4",
    "v4.mp4",
    "v5.mp4",
    "v6.mp4",
    "v7.mp4",
    "v8.mp4",
    "v9.mp4"
];

// Lightbox setup
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
lightbox.innerHTML = `<span id="lightbox-close">✕</span><div id="lightbox-content"></div>`;
document.body.appendChild(lightbox);

function openLightbox(element) {
    const content = document.getElementById("lightbox-content");
    content.innerHTML = "";
    const clone = element.cloneNode(true);
    if (clone.tagName === "VIDEO") { clone.controls = true; clone.autoplay = true; }
    content.appendChild(clone);
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

// Load Photos
photos.forEach(photo => {
    const img = document.createElement("img");
    img.src = `assets/photos/${photo}`;
    img.style.cursor = "pointer";
    img.addEventListener("click", () => openLightbox(img));
    container.appendChild(img);
});

// Load Videos
videos.forEach(videoFile => {
    const video = document.createElement("video");
    video.src = `assets/videos/${videoFile}`;
    video.controls = true;
    video.style.cursor = "pointer";
    video.addEventListener("click", (e) => { e.preventDefault(); openLightbox(video); });
    container.appendChild(video);
});

const btn=document.getElementById("startMusic");
const music=document.getElementById("bgMusic");

btn.addEventListener("click",()=>{

    console.log("Button clicked");

    music.play()
    .then(()=>{
        console.log("Music playing");
    })
    .catch(err=>{
        console.log("Error:",err);
    });

});
