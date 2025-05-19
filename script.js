function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}

function generatePalette() {
  const boxes = document.querySelectorAll(".color-box");

  boxes.forEach((box) => {
    const color = getRandomColor();
    box.style.backgroundColor = color;
    box.setAttribute("data-color", color);
    box.querySelector("span").textContent = color;

    const oldMsg = box.querySelector(".copied");
    if (oldMsg) oldMsg.remove();
  });

  setupClipboardCopy();
}

function setupClipboardCopy() {
  const boxes = document.querySelectorAll(".color-box");

  boxes.forEach((box) => {
    box.onclick = () => {
      const color = box.getAttribute("data-color");

      navigator.clipboard.writeText(color).then(() => {
        const oldMsg = box.querySelector(".copied");
        if (oldMsg) oldMsg.remove();

        const msg = document.createElement("div");
        msg.className = "copied";
        msg.innerText = "Copied!";
        box.appendChild(msg);

        setTimeout(() => msg.remove(), 1000);
      }).catch((err) => {
        console.error("Clipboard error:", err);
        alert("Clipboard failed. Use HTTPS or localhost.");
      });
    };
  });
}


document.addEventListener("DOMContentLoaded", () => {
  generatePalette();
});

document.getElementById("generateBtn").addEventListener("click", generatePalette);
