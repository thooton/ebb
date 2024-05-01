const querystring = require("querystring");
const fs = require("fs");

function getCsrf(text) {
    return text.match(/<input type="hidden" name="_csrf" value="([^"]+)" \/>/)[1];
}

async function register({
    email, phone,
    first, last,
    birthday, city,
    state_code, zip_code
}) {
    if (phone.length != 10) {
        throw new Error("bad phone");
    }
    phone = `(${phone.slice(0, 3)})+${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
    const resp = await fetch("https://rewards.einsteinbros.com/join");
    const cookie = resp.headers.get("Set-Cookie").split(";")[0];
    const resp_text = await resp.text();
    const csrf = getCsrf(resp_text);
    const resp2 = await fetch("https://rewards.einsteinbros.com/join", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Cookie": cookie,
            "Content-Type": "application/x-www-form-urlencoded",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-User": "?1"
        },
        "referrer": "https://rewards.einsteinbros.com/join",
        "body": querystring.stringify({
            emailAddress: email,
            phoneNumber: phone,
            _csrf: csrf
        }),
        "method": "POST",
        "mode": "cors"
    });
    const resp_text2 = await resp2.text();
    const csrf2 = getCsrf(resp_text2);
    const resp3 = await fetch("https://rewards.einsteinbros.com/join", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Cookie": cookie,
            "Content-Type": "application/x-www-form-urlencoded",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-User": "?1"
        },
        "referrer": "https://rewards.einsteinbros.com/join",
        "body": log(querystring.stringify({
            firstName: first,
            lastName: last,
            birthday,
            city,
            stateCode: state_code,
            zipCode: zip_code,
            visitCode: "",
            emailNotifications: "on",
            cateringEmailNotifications: "on",
            password: "%Ser3}*a]Usy9-Y",
            passwordConfirmation: "%Ser3}*a]Usy9-Y",
            joinfull: "1",
            _csrf: csrf2
        })),
        "method": "POST",
        "mode": "cors"
    });
    const resp_text3 = await resp3.text();
    if (!resp_text3.includes("Welcome to Rewards")) {
        throw new Error("failure " + resp_text3);
    }
}

async function main() {

}

main();