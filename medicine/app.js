let medicineData = JSON.parse(localStorage.getItem("medicineData"));
let selectedDate = null;
const container = document.getElementById("container");
(function () {
  setPatientName();
  selectedDate = new Date().toDateString();
  container.appendChild(generateMedicineTable());
  addButtonListeners();
  const selectedDateDropdown = document.getElementById("selectedDate");
  setDateOptions(selectedDateDropdown);
  selectedDateDropdown.addEventListener("change", function (e) {
    selectedDate = new Date(e.target.value).toDateString();
    container.replaceChildren(generateMedicineTable());
    addButtonListeners();
  });
})();
function addButtonListeners() {
  const buttons = document.getElementsByTagName("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function (e) {
      const [medicineName, action] = e.target.value.split("_");
      //   update the count of the medicine in the medicineData for the selected date
      const medicineIndex = medicineData.findIndex(
        (med) => med.name === medicineName
      );
      const dateIndex = medicineData[medicineIndex].dates.findIndex(
        (date) => date.date === selectedDate
      );
      let idx = medicineData[medicineIndex].dates[dateIndex];
      if (action === "add" && idx.count < idx.maxCount) {
        medicineData[medicineIndex].dates[dateIndex].count++;
      } else if (action === "sub" && idx.count > 0) {
        medicineData[medicineIndex].dates[dateIndex].count--;
      }
      localStorage.setItem("medicineData", JSON.stringify(medicineData));
      container.replaceChildren(generateMedicineTable());
      addButtonListeners();
    });
  }
}
function setPatientName() {
  const patientName = document.getElementById("patientName");
  const name = localStorage.getItem("name");
  if (!name) {
    window.location.href = "index.html";
  }
  patientName.textContent = name;
}
function setDateOptions(selectedDateDropdown) {
  let createOptions = medicineData[4].dates.map((date) => {
    return `<option value="${date.date}">${new Date(
      date.date
    ).toDateString()}</option>`;
  });
  selectedDateDropdown.innerHTML = createOptions;
  selectedDateDropdown.value = new Date().toDateString();
}
function renderList(medicineData) {
  return medicineData
    .filter(
      (med) => med.dates.findIndex((date) => date.date === selectedDate) !== -1
    )
    .map((medicine, index) => {
      let date = medicine.dates.find((date) => date.date === selectedDate);
      return `
    <div class="flex justify-between bg-gray-50 py-2 my-1 rounded">
        <div class='flex-1 text-center'>${medicine.name}</div>
        <div class='flex-1 text-center'>${date.count}</div>
        <div class='flex-1 text-center'>${date.maxCount}</div>
        <div class='flex-1 text-center'>
            <button type="button" value='${medicine.name}_sub' class="bg-gray-500 hover:bg-gray-700 text-sm text-white font-bold py-0.5 px-2 rounded">
                -
            </button>
            <button type="button" value='${medicine.name}_add' class="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-0.5 px-2 rounded">
                +
            </button>
        </div>
    </div>
    `;
    })
    .join(``);
}

function generateMedicineTable() {
  const div = document.createElement("div");
  div.setAttribute("id", "medicineTable");
  div.setAttribute("class", "p-4 bg-white shadow-md rounded-md");
  div.innerHTML = `
<div class="flex justify-between mb-4">
    <div class="font-bold flex-1 text-center">Medicine Name</div>
    <div class="font-bold flex-1 text-center">Count</div>
    <div class="font-bold flex-1 text-center">Max Count</div>
    <div class="font-bold flex-1 text-center">Action</div>
</div>
${renderList(medicineData)}
`;
  return div;
}
