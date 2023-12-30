const generateInitialMedicineList = (dos) => {
  // const drops = ["CME-Rx", "Mofo-Rx", "Sofi-Rx Ultra", "Predo-Rx", "Dorzo-Rx"];
  const getDateString = (date, index) =>
    new Date(date.setDate(date.getDate() + index)).toDateString();
  const dateList = Array(60)
    .fill("")
    .map((_, index) => getDateString(new Date(dos), index));
  let res = {};
  dateList.forEach((date, index) => {
    let dateWiseMedicine = [];
    if (index < 7) {
      dateWiseMedicine.push({
        name: "Mofo-Rx",
        color: "#a68729",
        count: 0,
        maxCount: 4,
      });
    }
    if (index < 21) {
      dateWiseMedicine.push({
        name: "CME-Rx",
        color: "#390961",
        count: 0,
        maxCount: 3,
      });
    }
    if (index < 5) {
      dateWiseMedicine.push({
        name: "Dorzo-Rx",
        color: "#38d662",
        count: 0,
        maxCount: 2,
      });
    }
    if (index < 60) {
      dateWiseMedicine.push({
        name: "Sofi-Rx",
        color: "#08378c",
        count: 0,
        maxCount: 4,
      });
    }
    if (index < 42) {
      dateWiseMedicine.push({
        name: "Predo-Rx",
        color: "#660e0e",
        count: 0,
        maxCount:
          index < 2
            ? 8
            : index < 4
            ? 6
            : index < 21
            ? 4
            : index < 28
            ? 3
            : index < 35
            ? 2
            : 1,
      });
    }
    res[date] = dateWiseMedicine;
  });
  return res;
};

let allData = JSON.parse(localStorage.getItem("data") ?? "[]");
const btnToMedicinePage = document.getElementById("linkToMedicinePage");
function renderLists() {
  // create a div element and list out all the patients with their name and date of surgery and append it to the body
  const containerBox = document.getElementById("listOfPatients");
  if (allData.length === 0) {
    btnToMedicinePage.style.display = "none";
    containerBox.innerHTML = `<div class="flex justify-between bg-gray-50 py-2 my-1 rounded">
    <div class='flex-1 text-center'>No patients found</div>
    </div>`;
    return;
  }
  const patientList = allData.map((data) => {
    return `
    <div class="flex justify-between flex px-8 bg-gray-50 py-2 my-1 rounded">
        <div>${data.name}</div>
        <div>${new Date(data.dateOfSurgery).toDateString()}</div>
    </div>
    `;
  });
  containerBox.innerHTML = patientList.join(``);
}
(function () {
  renderLists();
})();

document
  .getElementById("surgeryForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const data = {
      name,
      dateOfSurgery: date,
      medicine: generateInitialMedicineList(date),
    };
    allData = [...allData, data];
    localStorage.setItem("data", JSON.stringify(allData));
    btnToMedicinePage.style.display = "block";
    renderLists();
  });

function handleLinkToMedicinePage() {
  if (allData.length !== 0) {
    window.location.href = "./medicine/medicine.html";
  }
}
