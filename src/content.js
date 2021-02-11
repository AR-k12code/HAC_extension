var district = document.querySelector("[id=Database]");
var username = document.querySelector("[id=LogOnDetails_UserName]");
var htmlEvent = document.createEvent("HTMLEvents");

htmlEvent.initEvent("change", true, true);

chrome.runtime.sendMessage({config: "district"}, function(response) {
    if (response.district != null) {
        district.value = response.district;
        district.dispatchEvent(htmlEvent);
    }
});

chrome.runtime.sendMessage({config: "email"}, function(response) {
    if (response.email != null) {
        username.value = response.email;
        username.dispatchEvent(htmlEvent);
    }
});
