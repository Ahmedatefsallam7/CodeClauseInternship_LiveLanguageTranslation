const fromText = document.querySelector(".from-text");
toText = document.querySelector(".to-text");
exchangeIcon = document.querySelector(".change");
selectTag = document.querySelectorAll("select");
icons = document.querySelectorAll(".row i");
translateBtn = document.querySelector("button");

selectTag.forEach((tag, id) => {
  for (let countryCode in countries) {
    let selected =
      id == 0
        ? countryCode == "en-GB"
          ? "selected"
          : ""
        : countryCode == "hi-IN"
        ? "selected"
        : "";

    let option = `<option ${selected} value="${countryCode}">
        ${countries[countryCode]}</option>`;

    tag.insertAdjacentHTML("beforeend", option);
  }
});

exchangeIcon.addEventListener("click", () => {
  let tempText = fromText.value,
    tempLang = selectTag[0].value;
  fromText.value = toText.value;
  toText.value = tempText;
  selectTag[0].value = selectTag[1].value;
  selectTag[1].value = tempLang;
});

fromText.addEventListener("keyup", () => {
  if (!fromText.value) {
    toText.value = "";
  }
});

translateBtn.addEventListener("click", () => {
  let text = fromText.value.trim(),
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;

  if (!text) return;

  toText.setAttribute("placeholder", "translation... ");

  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      toText.value = data.responseData.translatedText;
      data.matches.forEach((data) => {
        if (data.id === 0) {
          toText.value = data.translation;
        }
      });
      toText.setAttribute("placeholder", "translation");
    });
});
