// =====================
// LOADING SCREEN
// =====================
window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loading-screen");
    const bar = document.getElementById("loading-bar");
    const loadingText = document.getElementById("loading-text");

    const messages = ["entering the darkness...", "finding her soul...", "almost there..."];
    let msgIndex = 0;
    let width = 0;

    const interval = setInterval(() => {
        width += 2;
        bar.style.width = width + "%";

        if (width === 40) { loadingText.innerText = messages[1]; }
        if (width === 75) { loadingText.innerText = messages[2]; }

        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.style.opacity = "0";
                setTimeout(() => {
                    loadingScreen.style.display = "none";
                    document.getElementById("password-screen").classList.add("active");
                }, 800);
            }, 400);
        }
    }, 30);
});

// =====================
// PASSWORD SCREEN
// =====================
document.getElementById("enter-btn").addEventListener("click", () => {
    const username = document.getElementById("username-input").value.trim().toLowerCase();
    const dd = document.getElementById("dd").value.trim();
    const mm = document.getElementById("mm").value.trim();
    const yyyy = document.getElementById("yyyy").value.trim();
    const errorMsg = document.getElementById("error-msg");

    const validUsers = ["annette", "don"];
    const correctDD = "01";
    const correctMM = "12";
    const correctYYYY = "2025";

    if (!validUsers.includes(username)) {
        errorMsg.innerText = "⚠ I don't know you...";
        shakeBox();
        return;
    }

    if (dd !== correctDD || mm !== correctMM || yyyy !== correctYYYY) {
        errorMsg.innerText = "⚠ Wrong date...try again";
        shakeBox();
        return;
    }

    // Correct!
    const passwordScreen = document.getElementById("password-screen");
    passwordScreen.style.opacity = "0";
    setTimeout(() => {
        passwordScreen.style.display = "none";
        document.getElementById("main-site").classList.remove("hidden");
        initSite();
    }, 800);
});

// auto tab between date fields
document.getElementById("dd").addEventListener("input", (e) => {
    if (e.target.value.length === 2) document.getElementById("mm").focus();
});
document.getElementById("mm").addEventListener("input", (e) => {
    if (e.target.value.length === 2) document.getElementById("yyyy").focus();
});

function shakeBox() {
    const box = document.getElementById("password-box");
    box.classList.add("shake");
    setTimeout(() => box.classList.remove("shake"), 500);
}

// =====================
// MAIN SITE
// =====================
function initSite() {

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".scroll-fade").forEach(el => observer.observe(el));

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

    const allMedia = [
        ...photos.map(p => ({ type: "photo", src: `assets/photos/${p}` })),
        ...videos.map(v => ({ type: "video", src: `assets/videos/${v}` }))
    ];

    let currentIndex = 0;

    // Lightbox
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
        showMedia((currentIndex - 1 + allMedia.length) % allMedia.length);
    });

    document.getElementById("lb-next").addEventListener("click", (e) => {
        e.stopPropagation();
        showMedia((currentIndex + 1) % allMedia.length);
    });

    // Swipe support
    let touchStartX = 0;
    let touchStartY = 0;

    lightbox.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    lightbox.addEventListener("touchend", (e) => {
        const diffX = touchStartX - e.changedTouches[0].clientX;
        const diffY = touchStartY - e.changedTouches[0].clientY;
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 50) showMedia((currentIndex + 1) % allMedia.length);
            if (diffX < -50) showMedia((currentIndex - 1 + allMedia.length) % allMedia.length);
        } else {
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
        img.classList.add("scroll-fade");
        img.addEventListener("click", () => showMedia(i));
        container.appendChild(img);
        observer.observe(img);
    });

    // Load Videos
    videos.forEach((videoFile, i) => {
        const wrapper = document.createElement("div");
        wrapper.style.cssText = "position:relative;cursor:pointer;display:inline-block;";

        const video = document.createElement("video");
        video.src = `assets/videos/${videoFile}`;
        video.controls = false;
        video.style.cssText = "width:300px;border-radius:10px;border:3px solid crimson;box-shadow:0 0 20px red;display:block;";

        const playBtn = document.createElement("div");
        playBtn.innerHTML = "▶";
        playBtn.style.cssText = "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:3rem;color:white;text-shadow:0 0 10px red;pointer-events:none;";

        wrapper.appendChild(video);
        wrapper.appendChild(playBtn);
        wrapper.classList.add("scroll-fade");
        wrapper.addEventListener("click", () => showMedia(photos.length + i));
        container.appendChild(wrapper);
        observer.observe(wrapper);
    });

    // Music
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
}
