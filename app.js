const dropDowns = document.querySelectorAll(".drop-down select");
const input = document.querySelector("input");
const ExcBtn = document.querySelector("button");
const msg = document.querySelector(".msg");

dropDowns.forEach((select) => {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    select.prepend(option);
    option.value = currCode;
    option.innerText = currCode;
    if (select.name === "from" && option.value === "USD") {
      option.selected = "selected";
    } else if (select.name === "to" && option.value === "INR") {
      option.selected = "selected";
    }
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
});

// update flag
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const getExchanegRate = async () => {
  if (input.value === "" || input.value < 1) {
    input.value = "1";
  }
  let fromCurr = dropDowns[0].value;
  let toCurr = dropDowns[1].value;
  let amtVal = input.value;
  const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurr.toLowerCase()}.json`;
  const responce = await fetch(URL);
  const data = await responce.json();
  const finalValue =
    amtVal * data[fromCurr.toLowerCase()][toCurr.toLowerCase()];
  const rate = `${input.value} ${fromCurr} = ${finalValue} ${toCurr}`;
  msg.innerText = rate;
};

ExcBtn.addEventListener("click", (eve) => {
  eve.preventDefault();
  getExchanegRate();
});

window.addEventListener("load", () => {
  getExchanegRate();
});
