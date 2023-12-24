const generateInitialMedicineList = (dos) => {
  console.log(
    "🚀 ~ file: app.js:3 ~ generateInitialMedicineList ~ dos",
    new Date(dos)
  );
  const drops = ["CME-Rx", "Mofo-Rx", "Sofi-Rx Ultra", "Predo-Rx", "Dorzo-Rx"];
  const getDateString = (date, index) =>
    new Date(date.setDate(date.getDate() + index)).toDateString();
  let mofoRX = {
    name: "Mofo-Rx",
    dates: Array(7)
      .fill("")
      .map((_, index) => ({
        date: getDateString(new Date(dos), index),
        count: 0,
        maxCount: 4,
      })),
  };
  let CMERx = {
    name: "CME-Rx",
    dates: Array(21)
      .fill("")
      .map((_, index) => ({
        date: getDateString(new Date(dos), index),
        count: 0,
        maxCount: 3,
      })),
  };
  let DorzoRx = {
    name: "Dorzo-Rx",
    dates: Array(5)
      .fill("")
      .map((_, index) => ({
        date: getDateString(new Date(dos), index),
        count: 0,
        maxCount: 2,
      })),
  };
  let SofiRx = {
    name: "Sofi-Rx",
    dates: Array(60)
      .fill("")
      .map((_, index) => ({
        date: getDateString(new Date(dos), index),
        count: 0,
        maxCount: 4,
      })),
  };
  let PredoRx = {
    name: "Predo-Rx",
    dates: Array(42)
      .fill("")
      .map((_, index) => ({
        date: getDateString(new Date(dos), index),
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
      })),
  };
  return [mofoRX, CMERx, DorzoRx, SofiRx, PredoRx];
};

if (localStorage.getItem("name") && localStorage.getItem("dateOfSurgery")) {
  // Redirect user to medicine page
  window.location.href = "/medicine/medicine.html";
}
document
  .getElementById("surgeryForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    localStorage.setItem("name", name);
    localStorage.setItem("surgeryDate", date);
    localStorage.setItem(
      "medicineData",
      JSON.stringify(generateInitialMedicineList(date))
    );
    window.location.href = "/medicine/medicine.html";
  });
