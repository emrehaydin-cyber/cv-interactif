const themeToggle = document.querySelector("#theme-toggle");
const surpriseButton = document.querySelector("#surprise-button");
const challengeDialog = document.querySelector("#challenge-dialog");
const challengeResult = document.querySelector("#challenge-result");
const xpBar = document.querySelector("#xp-bar");
const xpLabel = document.querySelector("#xp-label");
let xp = 240;

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  themeToggle.querySelector("span").textContent = dark ? "☾" : "☼";
  themeToggle.setAttribute("aria-label", dark ? "Utiliser le thème clair" : "Utiliser le thème sombre");
});

surpriseButton.addEventListener("click", () => {
  challengeResult.textContent = "";
  challengeDialog.showModal();
});

challengeDialog.querySelector(".dialog-close").addEventListener("click", () => challengeDialog.close());

challengeDialog.querySelectorAll("[data-answer]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.answer === "right") {
      challengeResult.textContent = "Bravo ! +60 XP";
      xp = Math.min(300, xp + 60);
      xpBar.style.width = `${(xp / 300) * 100}%`;
      xpLabel.textContent = `${xp} / 300 XP`;
      button.disabled = true;
    } else {
      challengeResult.textContent = "Pas tout à fait — retente ta chance.";
    }
  });
});

document.querySelectorAll(".skill").forEach((skill) => {
  skill.addEventListener("click", () => {
    if (skill.classList.toggle("unlocked")) {
      xp = Math.min(300, xp + Number(skill.dataset.xp));
    } else {
      xp = Math.max(0, xp - Number(skill.dataset.xp));
    }
    xpBar.style.width = `${(xp / 300) * 100}%`;
    xpLabel.textContent = `${xp} / 300 XP`;
  });
});
