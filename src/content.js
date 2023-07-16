var district = document.querySelector("[id=Database]");
var username = document.querySelector("[id=LogOnDetails_UserName]");
let options;

chrome.runtime.sendMessage({config: "district"}, function(response) {
    options = {}
    Array.from(document.querySelectorAll("#Database option")).map(e => {options[e.innerText] = parseInt(e.value)})
    if (response.district != null) {
        district.value = options[response.district];
    } else {
        district.value = options["Gentry School District"];
    }

    console.log(district.value);
});

chrome.runtime.sendMessage({config: "email"}, function(response) {
    if (response.email != null) {
        username.value = response.email;
    }
});
