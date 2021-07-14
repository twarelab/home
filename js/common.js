// window.addEventListener("pageshow", function (event) {
//     const queryParam = Util.getQueryParam();
//     const currentPage = queryParam["page"] ? queryParam["page"] : "index";

//     Util.sendXHRequest("/include/_" + currentPage + ".html", {},
//         function (responseText) {
//             const contentBody = document.getElementById("contentBody");
//             contentBody.insertAdjacentHTML("beforeend", responseText);
//             if (currentPage == "index") {
//                 const footer = document.getElementById("footer");
//                 footer.classList.add("index");
//                 initMap();

//                 if (window.location.hash) {
//                     const mapItem = document.querySelector(window.location.hash);
//                     window.scrollTo(0, mapItem.offsetTop);
//                 }
//             }
//         },
//         function () { },
//         "GET"
//     );
// });

const Util = {
    sendXHRequest: function (url, data, onSuccess, onFail, method) {
        if (typeof method != "string") {
            method = "POST";
        }
        if (typeof onSuccess != "function") {
            onSuccess = () => { };
        }

        if (typeof onFail != "function") {
            onFail = () => { };
        }

        if (typeof data == "string") {
            try {
                data = JSON.parse(data);
            } catch (e) {
                return false;
            }
        }

        if (method == "GET") {
            url += "?" + Util.objectToQuery(data);
        }

        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.readyState == xhr.DONE) {
                if (xhr.status == 200 || xhr.status == 201) {
                    try {
                        const responseBody = JSON.parse(xhr.responseText);
                        onSuccess(responseBody);
                    } catch (e) {
                        onSuccess(xhr.responseText);
                    }
                } else {
                    onFail(xhr.status, xhr.responseText);
                }
            }
        }

        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
        xhr.send(JSON.stringify(data));
    },

    objectToQuery: function (obj) {
        const keys = Object.keys(obj);
        let queryStr = "";
        keys.forEach(key => {
            queryStr += `${key}=${obj[key]}&`;
        })

        return queryStr;
    },

    getQueryParam: function () {
        const queryParam = [];
        const queryStr = location.search;
        queryStr.replace(/[?&]+([^=&]+)=([^]*)/gi, function (str, key, value) {
            queryParam[key] = value;
        });

        return queryParam;
    }
}

function toggleDrawerTrigger(isActive) {
    const drawerTrigger = document.getElementById("drawerTrigger");
    const drawer = document.getElementById("drawer");
    console.log(isActive)
    if (typeof isActive != "boolean") {
        isActive = !drawerTrigger.classList.contains("is-active");
    }

    if (isActive) {
        drawerTrigger.classList.add("is-active");
        drawer.classList.add("active");
    } else {
        drawerTrigger.classList.remove("is-active");
        drawer.classList.remove("active");
    }
}
