var emailAddress;
var districtValue;

chrome.browserAction.onClicked.addListener(function(activeTab){
    chrome.tabs.create({url: "https://hac20.esp.k12.ar.us/HomeAccess20/"});
});

chrome.storage.managed.get("SchoolId", function(value) {
    //console.log(value);
    //console.debug(value);

    if (value != null) {
        districtValue = value.SchoolId;
    } else {
        // Since we're not pulling anything from admin.google.com yet, set this to Gentry, just to prove it's working
        districtValue = 1020;
    }

});

chrome.storage.managed.get("DoNotUseEmail", function(value) {
    if (value.DoNotUseEmail !== true) {
        chrome.identity.getProfileUserInfo(function(info){
            emailAddress=info.email;
        });
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.config == "email") { sendResponse({email: emailAddress}) }
    if (request.config == "district") { sendResponse({district: districtValue}) }
});
