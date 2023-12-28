let allData = JSON.parse(localStorage.getItem("data"));
let selectedDate = null;
const containerBox = document.getElementById("containerBox");
const selectedDateDropdown = document.getElementById("selectedDate");
(function () {
  const allDatesOfSurgeries = allData.map((d) => d.dateOfSurgery);
  let idx = 0;
  allDatesOfSurgeries.forEach((date, index) => {
    if (new Date(date) > new Date(allDatesOfSurgeries[idx])) idx = index;
  });
  setDateOptions(Object.keys(allData[idx].medicine));
  selectedDate = new Date().toDateString();
  render();
  selectedDateDropdown.addEventListener("change", handleSelectedDateChange);
})();
function render() {
  console.log(allData);
  containerBox.innerHTML = "";
  allData.forEach((data, index) => {
    const containerContent = renderList(data, index);
    containerBox.innerHTML += renderName(data.name);
    containerBox.innerHTML += containerContent;
  });
  addButtonListeners();
}
function addButtonListeners() {
  const buttons = document.getElementsByTagName("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", handleButtonClick);
  }
}
function setDateOptions(dates) {
  let createOptions = dates.map((date) => {
    return `<option value="${date}">${new Date(date).toDateString()}</option>`;
  });
  selectedDateDropdown.innerHTML = createOptions;
  selectedDateDropdown.value = new Date().toDateString();
}
function renderList(medicineData, index) {
  const medicines = medicineData.medicine[selectedDate];
  return `<div class="grid grid-cols-1 sm:grid-cols-2 mx-4 mb-10">
    ${medicines
      .map((medicine) => {
        return renderOneMedicine(
          medicine.name,
          medicine.count,
          medicine.maxCount,
          index
        );
      })
      .join(``)}
    </div>
    `;
}

function renderOneMedicine(name, count, maxCount, index) {
  return `<div class="bg-red-3 shadow m-3 border rounded p-2 px-6">
  <p class="text-xs text-gray-300">Medicine Name</p>
  <p class="text-sm">${name}</p>
  <div class="flex justify-between py-2">
  <div>
  <p class="text-xs text-gray-300">Count</p>
  <p class="text-sm">${count}</p></div>
  <div>
  <p class="text-xs text-gray-300">Max Count</p>
  <p class="text-sm">${maxCount}</p></div>
  </div>
  <div class="flex gap-2">
    <button type="button" value='${name}_${index}_sub'
      class="flex-1 bg-gray-500 hover:bg-gray-700 text-sm text-white font-bold rounded">
      -
    </button>
    <button type="button" value='${name}_${index}_add'
      class="flex-1 bg-blue-500 hover:bg-blue-700 py-2 sm:py-4  text-sm text-white font-bold rounded">
      +
    </button>
  </div>
</div>`;
}
function renderName(name) {
  return `<div class="flex flex-col">
            <span class="text-sm text-gray-500">For</span>
            <h1 class="text-2xl font-bold">${name}</h1>
         </div>`;
}
function handleSelectedDateChange(e) {
  selectedDate = new Date(e.target.value).toDateString();
  render();
}
function handleButtonClick(e) {
  const [medicineName, index, action] = e.target.value.split("_");
  //   update the count of the medicine in the medicineData for the selected date
  let md = allData[index];
  console.log("🚀 ~ file: app.js:107 ~ handleButtonClick ~ medicine:", md);
  md = {
    ...md,
    medicine: {
      ...md.medicine,
      [selectedDate]: md.medicine[selectedDate].map((m) => {
        if (m.name === medicineName) {
          if (action === "add") {
            m.count++;
          } else if (action === "sub") {
            m.count--;
          }
        }
        return m;
      }),
    },
  };
  allData[index] = md;
  localStorage.setItem("data", JSON.stringify(allData));
  render();
}
