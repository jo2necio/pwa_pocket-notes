const storageKey = "pocket-notes-v1";
const form = document.querySelector("#noteForm");
const input = document.querySelector("#note");
const list = document.querySelector("#notes");
const emptyMessage = document.querySelector("#emptyMessage");
const statusText = document.querySelector("#status");
let notes = JSON.parse(localStorage.getItem(storageKey) || "[]");

function save() {
  localStorage.setItem(storageKey, JSON.stringify(notes));
  render();
}

function render() {
  list.replaceChildren();
  notes.forEach((text, index) => {
    const item = document.createElement("li");
    const label = document.createElement("span");
    const remove = document.createElement("button");
    label.textContent = text;
    remove.textContent = "Delete";
    remove.type = "button";
    remove.setAttribute("aria-label", `Delete ${text}`);
    remove.addEventListener("click", () => { notes.splice(index, 1); save(); });
    item.append(label, remove);
    list.append(item);
  });
  emptyMessage.hidden = notes.length > 0;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  notes.unshift(text);
  input.value = "";
  save();
  input.focus();
});

document.querySelector("#clearButton").addEventListener("click", () => {
  notes = [];
  save();
});

function updateConnectionStatus() {
  statusText.textContent = navigator.onLine ? "Online · notes stay on this device" : "Offline · the app still works";
}
window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);
updateConnectionStatus();
render();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js"));
}
