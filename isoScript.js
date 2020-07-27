/*
 *   Script to retrieve ISO 3166-3 information from https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
 *
 *   Written by Steven Huynh-Tran
 *   LinkedIn:   https://linkedin.com/stevenht
 *   Website:    https://stevenhtran.com
 *   Github:     https://github.com/htransteven
 */

const getCountryInfo = () => {
  let data = document.getElementsByClassName("jquery-tablesorter")[0];
  let tbody = data.children[1];
  let trChildren = tbody.children;

  let isoData = {};

  for (let i = 0; i < trChildren.length; i++) {
    const countryObj = {};

    //index 0 = Country name
    const tdNameChildren = trChildren[i].children[0].children;
    if (!tdNameChildren) continue;
    for (const child of tdNameChildren) {
      if (child.tagName === "A") {
        countryObj["name"] = child.innerText;
        break;
      }
    }

    //index 1 = Official state name
    //index 2 = Sovereignty

    //index 3 = Alpha-2 code
    const tdAlpha2 = trChildren[i].children[3];
    if (!tdAlpha2) continue;
    countryObj["alphaTwo"] = tdAlpha2.children[0].children[1].innerText;

    //index 4 = Alpha-3 code
    const tdAlpha3 = trChildren[i].children[4];
    if (!tdAlpha3) continue;
    countryObj["alphaThree"] = tdAlpha3.children[0].children[1].innerText;

    //index 5 = Numberic code
    const tdNumCode = trChildren[i].children[5];
    if (!tdNumCode) continue;
    countryObj["numCode"] = tdNumCode.children[0].children[1].innerText;

    isoData[countryObj.alphaTwo] = countryObj;
  }

  return isoData;
};

const createImportFile = () => {
  const data = getCountryInfo();
  let result = "";

  Object.keys(data).forEach((key) => {
    result += `import {default as ${key.toUpperCase()}} from './${key.toLowerCase()}.svg';\n`;
  });

  result += "const flags = {\n";
  Object.keys(data).forEach((key) => {
    result += `${key.toUpperCase()},\n`;
  });
  result += "\n} \nexport default flags;";

  return result;
};
