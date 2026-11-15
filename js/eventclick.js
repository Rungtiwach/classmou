let count = 0;                                   // state
const numEl = document.querySelector("#countNum");
const btnPlus = document.querySelector("#btnPlus");
const btnMinus = document.querySelector("#btnMinus");
const btnReset = document.querySelector("#btnReset");   

btnPlus.addEventListener("click", () => {
  count++;
  numEl.textContent = count;
});

btnMinus.addEventListener("click", () => {
  count--;
  numEl.textContent = count;
});

btnReset.addEventListener("click", () => {
  count = 0;
  numEl.textContent = count;
});


// function render() {
//   numEl.textContent = count;
//   // บวกสีเขียว ลบสีแดง ศูนย์สีเทา
//   numEl.style.color = count > 0 ? "#16a34a" : count < 0 ? "#dc2626" : "#64748b";
// }

// document.querySelector("#btnPlus").addEventListener("click", () => {
//   count++;
//   render();
// });
// document.querySelector("#btnMinus").addEventListener("click", () => {
//   count--;
//   render();
// });
// document.querySelector("#btnReset").addEventListener("click", () => {
//   count = 0;
//   render();
// });