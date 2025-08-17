const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

// Ekran boyutu
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let meteors = [];

// Meteor sınıfı
class Meteor {
  constructor() {
    this.reset();
  }

  reset() {
    // rastgele başlangıç pozisyonu (yukarıdan veya yanlardan gelebilir)
    if (Math.random() > 0.5) {
      this.x = Math.random() * canvas.width;
      this.y = -20;
    } else {
      this.x = -20;
      this.y = Math.random() * canvas.height;
    }

    this.size = Math.random() * 2 + 1.5;
    this.speed = Math.random() * 2 + 1; // biraz daha hızlı
    this.angle = Math.random() * (Math.PI / 3) - Math.PI / 6; // -30° ile +30° arası
    this.length = Math.random() * 80 + 60;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed * 3;
    this.y += Math.sin(this.angle) * this.speed * 3;

    // ekran dışına çıkınca sıfırla
    if (this.x > canvas.width + this.length ||
        this.y > canvas.height + this.length ||
        this.x < -this.length ||
        this.y < -this.length) {
      this.reset();
    }
  }

  draw() {
    const grad = ctx.createLinearGradient(
      this.x, this.y,
      this.x - Math.cos(this.angle) * this.length,
      this.y - Math.sin(this.angle) * this.length
    );
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(1, "rgba(255,255,255,0)");

    ctx.strokeStyle = grad;
    ctx.lineWidth = this.size;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      this.x - Math.cos(this.angle) * this.length,
      this.y - Math.sin(this.angle) * this.length
    );
    ctx.stroke();
  }
}

// Meteorlari başlat
for (let i = 0; i < 20; i++) {
  meteors.push(new Meteor());
}

function animate() {
  ctx.fillStyle = "rgba(5, 5, 25, 0.3)"; // uzay fonu
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  meteors.forEach(meteor => {
    meteor.update();
    meteor.draw();
  });

  requestAnimationFrame(animate);
}

animate();

// Boyut değişince tam ekran olsun
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
