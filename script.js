 
const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let meteors = [];

// Meteor sınıfı
class Meteor {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = -20; // hep yukarıdan doğar
    this.size = Math.random() * 2 + 1.5; // çekirdek kalınlığı
    this.speed = Math.random() * 1.5 + 0.8; // yavaş → hızlanma hissi
    this.angle = Math.random() * 0.5 - 0.25; // hafif sağ/sol kayma
    this.length = Math.random() * 80 + 60; // kuyruk uzunluğu
  }

  update() {
    this.x += this.speed * 4;
    this.y += this.speed * 2;

    // Ekran dışına çıkınca sıfırlansın
    if (this.y > canvas.height + this.length || this.x > canvas.width + this.length) {
      this.reset();
    }
  }

  draw() {
    const grad = ctx.createLinearGradient(
      this.x, this.y,
      this.x - this.length, this.y - this.length
    );
    grad.addColorStop(0, "rgba(255,255,255,1)"); // parlak baş
    grad.addColorStop(1, "rgba(255,255,255,0)"); // silik kuyruk

    ctx.strokeStyle = grad;
    ctx.lineWidth = this.size;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.length, this.y - this.length);
    ctx.stroke();
  }
}

// Meteorları başlat (az sayıda)
for (let i = 0; i < 20; i++) {
  meteors.push(new Meteor());
}

// Animasyon döngüsü
function animate() {
  // Arka plan → koyu uzay hissi
  ctx.fillStyle = "rgba(5, 5, 25, 0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Meteorları çiz
  meteors.forEach(meteor => {
    meteor.update();
    meteor.draw();
  });

  requestAnimationFrame(animate);
}

animate();

// Ekran boyutu değişince canvas güncelle
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
