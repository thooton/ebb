const faker = require('@faker-js/faker').faker;
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

const batches = [];
for (let i = 0; i < 4; i++) {
    const viet_last = viet_last_all[i];
    const white_last = white_last_all[i];
    const batch = [];
    for (const viet_first of viet_first_415) {
        batch.push(profile(
            viet_first, viet_last, 415
        ));
    }
    for (const white_first of white_first_602) {
        batch.push(profile(
            white_first, white_last, 602
        ));
    }
    for (const white_first of white_first_917) {
        batch.push(profile(
            white_first, white_last, 917
        ));
    }
    batches.push(batch);
}

fs.writeFileSync("batches.json", JSON.stringify(
    batches, null, 4
));