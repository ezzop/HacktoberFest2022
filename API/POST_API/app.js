import fetch from "node-fetch";
const update = {
    "b_email": "email in encoded form",
    "b_name": "name in encoded form",
    "b_reg_no": "reg in encoded form",
    "email": "",
    "name": "",
    "personal_code": "",
    "reg_no": "",
};
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(update),
};

fetch('//', options)
    .then(data => {
        if (!data.ok) {
            throw Error(data.status);
        }
        return data.json();
    }).then(update => {
        console.log(update);
    }).catch(e => {
        console.log(e);
    });