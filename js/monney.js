// 1) เลือก element ที่ต้องใช้
const amountEl = document.querySelector("#amount");
const fromEl   = document.querySelector("#from");
const toEl     = document.querySelector("#to");
const resultEl = document.querySelector("#result");
const infoEl   = document.querySelector("#info");
let currentRate = null;   // state: อัตราล่าสุด

// 2) ฟังก์ชันเรียก API
async function getRate(from, to) {
  if (from === to) return { rate: 1, date: "-" };
  const res = await fetch(`https://api.frankfurter.dev/v2/rate/${from}/${to}`);
  if (!res.ok) throw new Error("HTTP " + res.status);
  return res.json();      // { date, base, quote, rate }
}

// 3) คำนวณและแสดงผล (ไม่ต้องเรียก API ใหม่)
function showResult() {
  const amount = Number(amountEl.value);
  const total  = amount * currentRate;
  const opt = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  resultEl.textContent =
    `${amount.toLocaleString("th-TH", opt)} ${fromEl.value} = ` +
    `${total.toLocaleString("th-TH", opt)} ${toEl.value}`;
}

// 4) โหลดอัตราใหม่ + จัดการสถานะ loading / error
async function updateRate() {
  resultEl.classList.add("loading");
  infoEl.textContent = "กำลังโหลดอัตราแลกเปลี่ยน...";
  try {
    const data = await getRate(fromEl.value, toEl.value);
    currentRate = data.rate;
    resultEl.classList.remove("error");
    showResult();
    infoEl.textContent =
      `อัตราอ้างอิง 1 ${fromEl.value} = ${data.rate} ${toEl.value} (ข้อมูลวันที่ ${data.date})`;
  } catch (err) {
    resultEl.textContent = "โหลดข้อมูลไม่สำเร็จ";
    resultEl.classList.add("error");
    infoEl.textContent = err.message;
  } finally {
    resultEl.classList.remove("loading");
  }
}

// 5) ผูก event
fromEl.addEventListener("change", updateRate);      // เปลี่ยนสกุล → โหลดใหม่
toEl.addEventListener("change", updateRate);
amountEl.addEventListener("input", () => {          // พิมพ์จำนวน → คำนวณทันที
  if (currentRate !== null) showResult();
});
document.querySelector("#swap").addEventListener("click", () => {
  [fromEl.value, toEl.value] = [toEl.value, fromEl.value];  // สลับค่า
  updateRate();
});
document.querySelector("#convert").addEventListener("click", updateRate);

updateRate();   // โหลดครั้งแรกเมื่อเปิดหน้า