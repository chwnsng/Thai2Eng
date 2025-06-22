const userInput = document.getElementById("usrInput");
const userOutput = document.getElementById("usrOutput");
const clearButton = document.getElementById("clearBtn");
const copyButton = document.getElementById("copyBtn");

const specialChars = "\",./'-+()?";
const thaiChars =
  'ๅ/-ภถุึคตจขชๆไำพะัีรนยบลฃฟหกดเ้่าสวงผปแอิืทมใฝ+๑๒๓๔ู฿๕๖๗๘๙๐"ฎฑธํ๊ณฯญฐ,ฅฤฆฏโฌ็๋ษศซ.()ฉฮฺ์?ฒฬฦ';
const qwertyChars =
  "1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:\"ZXCVBNM<>?";

function translate(input) {
  let output = "";
  for (const char of input) {
    output += specialChars.includes(char)
      ? handleSpecialChar(char, input.indexOf(char))
      : qwertyChars.includes(char)
      ? thaiChars[qwertyChars.indexOf(char)]
      : thaiChars.includes(char)
      ? qwertyChars[thaiChars.indexOf(char)]
      : char;
  }
  return output;
}

function handleSpecialChar(char, index) {
  const typed = userInput.value;
  if (typed.length <= 1) {
    return char;
  } else if (index == 0) {
    return isThaiAfter(index)
      ? qwertyChars[thaiChars.indexOf(char)]
      : thaiChars[qwertyChars.indexOf(char)];
  } else if (index > 0) {
    return isThaiBefore(index)
      ? qwertyChars[thaiChars.indexOf(char)]
      : thaiChars[qwertyChars.indexOf(char)];
  }
  return char;
}

function isThaiAfter(index) {
  try {
    const next = userInput.value[index + 1];
    if (specialChars.includes(next)) {
      return isThaiAfter(index + 1);
    } else if (thaiChars.includes(next)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return true;
  }
}

function isThaiBefore(index) {
  try {
    const prev = userInput.value[index - 1];
    if (specialChars.includes(prev)) {
      return isThaiBefore(index);
    } else if (thaiChars.includes(prev)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return true;
  }
}

userInput.addEventListener("input", () => {
  const typed = userInput.value;
  const result = translate(typed);
  userOutput.value = result;
});

clearButton.addEventListener("click", () => {
  document.getElementById("usrInput").value = "";
  document.getElementById("usrOutput").value = "";
});

copyButton.addEventListener("click", () => {
  const value = userOutput.value;
  navigator.clipboard
    .writeText(value)
    .then(() => {
      console.log("Text copied to clipboard successfully!");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });

  const sn = document.getElementById("snackBar");
  sn.classList.toggle("show");
  setTimeout(() => {
    sn.classList.remove("show");
  }, 1000);
});
