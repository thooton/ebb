
const fs = require("fs");

function profile(first, last, areaCode) {
    const email = faker.internet.email({
        firstName: first,
        lastName: last
    });
    return {
        first,
        last,
        email: email.toLowerCase(),
        phoneNumber: areaCode + "" + Math.floor(
            Math.random() * 10_000_000
        )
    };
}

const viet_first_415 = [
    "Emily",
    "Ethan",
    "Ben",
    "Theresa"
];
const viet_last_all = [
    "Thach",
    "Nguyen",
    "Tran",
    "Hoang"
];
const white_first_602 = [
    "Sam",
    "Max",
    "Cara",
    "Mike",
];
const white_first_917 = [
    "Sophia",
    "Isabella"
];
const white_last_all = [
    "Scott",
    "Stewart",
    "Taylor",
    "Reeves"  
];

const people = [];
for (let i = 0; i < 4; i++) {
    const viet_last = viet_last_all[i];
    const white_last = white_last_all[i];
    for (const viet_first of viet_first_415) {
        people.push({
            first: viet_first,
            last: viet_last,
            area: 415
        });
    }
    for (const white_first of white_first_602) {
        people.push({
            first: white_first,
            last: white_last,
            area: 602
        });
    }
    for (const white_first of white_first_917) {
        people.push({
            first: white_first,
            last: white_last,
            area: 917
        });
    }
}

fs.writeFileSync("people.json", JSON.stringify(
    people, null, 4
));