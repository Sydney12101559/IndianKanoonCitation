console.log("Pop Up Script Started...");

// Quering Chrome Tabs to see which one is currently open
// Sending command to content.js to prepare a Summary
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(
    tabs[0].id,
    { type: "getSummary" },
    function (summary) {
      console.log(summary);
      if (summary) {
        updatePopUp(summary);
      }
    }
  );
});

function updatePopUp(summary) {
  console.log("Updating Pop Up...");
  // get elements from index.html
  var source = document.getElementById("source");
  var title = document.getElementById("title");
  var date = document.getElementById("date");
  var author = document.getElementById("author");
  var bench = document.getElementById("bench");
  var citation = document.getElementById("citation");

  // Update the values of respective elements with the summary
  source.innerHTML = summary.source;
  title.innerHTML = summary.title;
  date.innerHTML = summary.date;
  author.innerHTML = summary.author;
  bench.innerHTML = summary.bench;
  citation.innerHTML = summary.citation;

  var copyButton = document.getElementById("copy_button");
  copyButton.addEventListener("click", function (event) {
    // Listening to if the copy button is pressed
    console.log("Copy Button Clicked");
    var text =
      source.innerHTML +
      " \n" +
      title.innerHTML +
      " \n" +
      date.innerHTML +
      " \n" +
      author.innerHTML +
      " \n" +
      bench.innerHTML +
      " \n" +
      citation.innerHTML;
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
      if (result.state == "granted" || result.state == "prompt") {
        navigator.clipboard.writeText(text); //Copying to Clipboard
      }
    });
  });


  var excelCopyButton = document.getElementById("excel_copy_button");
  excelCopyButton.addEventListener("click", function (event) {
    // Listening to if the copy button is pressed
    var excelText =
      summary.source +
      " \t" +
      summary.title +
      " \t" +
      summary.date +
      " \t" +
      summary.citation +
      " \t" +
      summary.author +
      " \t" +
      summary.bench;
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
      if (result.state == "granted" || result.state == "prompt") {
        navigator.clipboard.writeText(excelText); //Copying to Clipboard in Excel Style

      }
    });
  });

  var oscolaButton = document.getElementById("oscola_button");
  //   String((title.style.fontStyle = "italic"));

  oscolaButton.addEventListener("click", function (event) {
    // Listening to if the copy button is pressed
    console.log("Oscola Button Clicked");
    var oscolatext =
      summary.title.italics() +
      " [" +
      summary.year +
      "] " +
      summary.citation +
      ".";
    var blob1 = new Blob([oscolatext], { type: "text/html" });
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
      if (result.state == "granted" || result.state == "prompt") {
        //Copying Oscola citation to Clipboard
        navigator.clipboard.write([
          new ClipboardItem({
            "text/html": blob1,
            
          }),
          
        ]);
      }
    });
  });

  var bluebookButton = document.getElementById("bluebook_button");

  bluebookButton.addEventListener("click", function (event) {
    // Listening to if the copy button is pressed
    console.log("Bluebook Button Clicked");
    var bluebooktext =
      summary.title + ", " + summary.citation + "\(" +summary.year + "\)";

    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
      if (result.state == "granted" || result.state == "prompt") {
        navigator.clipboard.writeText(bluebooktext); //Copying to Clipboard in bluebook Style
      }
    });
  });

  document.addEventListener("keypress", function (e) {
    if (e.code == "KeyC") {
      copyButton.click();
    } else if (e.code == "KeyE") {
      excelCopyButton.click();
    }
  });
}
