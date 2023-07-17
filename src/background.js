var emailAddress;
var districtValue;

chrome.action.onClicked.addListener(function(activeTab){
    chrome.tabs.create({url: "https://hac23.esp.k12.ar.us/HomeAccess"});
});

chrome.storage.managed.get("SchoolId", function(value) {
    // console.log(value);
    // console.debug(value);

    if (value != null) {
        districtValue = value.SchoolId;
    } else {
        // Since we're not pulling anything from admin.google.com yet, set this to Gentry, just to prove it's working
        districtValue = "Gentry Public Schools";
    }
    
});

chrome.storage.managed.get("DoNotUseEmail", function(value) {
    if (value.DoNotUseEmail !== true) {
        chrome.identity.getProfileUserInfo(function(info){
            emailAddress = info.email;
        });
    }
});

chrome.storage.managed.get("UsernameOnly", function(value) {
    if (value.UsernameOnly === true) {
        chrome.identity.getProfileUserInfo(function(info){
            emailAddress = info.email
            emailAddress = emailAddress.substring(0, emailAddress.lastIndexOf("@"));;
        });
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.config == "email") { sendResponse({email: emailAddress}) }
    if (request.config == "district") { sendResponse({district: districtValue}) }
});
