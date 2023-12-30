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
    containerBox.innerHTML += renderName(data.name, data.dateOfSurgery);
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
  return `<div class="grid grid-cols-1 sm:grid-cols-2 sm:mx-4 mb-10">
    ${medicines
      .map((medicine) => {
        return renderOneMedicine(
          medicine.name,
          medicine.count,
          medicine.maxCount,
          medicine.color,
          index
        );
      })
      .join(``)}
    </div>
    `;
}

function renderOneMedicine(name, count, maxCount, color, index) {
  return `<div class="bg-red-3 shadow-inset m-3 border rounded p-2 px-6 border-4 border-b-[${color}]">
  <div class="flex justify-between py-2">
    <div>
      <p class="text-xs text-gray-300">Medicine Name</p>
      <p class="text-sm text-[${color}]">${name}</p>
      </div>
      <div class='mr-2'>
      <p class="text-xs text-gray-300 mb-1">Box Color</p>
    <div class='bg-[${color}] h-10 w-12 rounded'>
    </div>
    </div>
  </div>
  <div class="flex justify-between py-2">
    <div>
      <p class="text-xs text-gray-300">Count</p>
      <p class="text-sm">${count}</p>
    </div>
    <div>
      <p class="text-xs text-gray-300">Max Count</p>
      <p class="text-sm">${maxCount}</p>
    </div>
  </div>
  <div class="flex gap-2">
    <button type="button" value='${name}_${index}_sub'
      class="flex-1 bg-gray-500 hover:bg-gray-700 text-sm text-white font-bold rounded ${
        count === 0 ? "opacity-10 pointer-events-none" : ""
      }">
      -
    </button>
    <button type="button" value='${name}_${index}_add'
      class="flex-1 bg-blue-500 hover:bg-blue-700 py-2 sm:py-4  text-sm text-white font-bold rounded ${
        count === maxCount ? "opacity-10 pointer-events-none" : ""
      }">
      +
    </button>
  </div>
</div>`;
}
function renderName(name, dos) {
  return `<div class='flex justify-between'>
  <div class="flex flex-col ml-1 mt-3">
            <span class="text-sm text-gray-500">For</span>
            <h1 class="text-xl font-bold">${name}</h1>
         </div>
         <div class="flex flex-col ml-1 mt-3">
            <span class="text-sm text-gray-500">Date of Surgery</span>
            <h1 class="text-xl font-bold">${new Date(
              dos
            ).toLocaleDateString()}</h1>
         </div>
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
          if (action === "add" && m.count < m.maxCount) {
            m.count++;
          } else if (action === "sub" && m.count > 0) {
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
