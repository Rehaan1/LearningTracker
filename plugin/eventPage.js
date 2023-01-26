// @TODO - To fetch from DB and Include from User
var eduURLS = ['www.udemy.com','learn.unity.com' ]


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
  
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            let url = tabs[0].url;
            url = url_domain(url);

            if(eduURLS.includes(url))
            {
                console.log('Sending Request');
                SendData("Rehaan1",url);    
            }
        });
  
    }
})

function url_domain(data) {
    var    a      = document.createElement('a');
           a.href = data;
    return a.hostname;
}

const SendData = async(username, url) => {

    var data = {
        "username" : username,
        "site" : url
    }

    data = JSON.stringify(data);

    console.log(data)

    const response = await fetch('https://learning-tracker.onrender.com/learning/add', {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    //const myJson = await response.json;

    if(response.status == 200)
    {
        console.log("SUCCESS")
    }
}