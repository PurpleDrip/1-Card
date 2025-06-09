export const validateAadhar=(aadhar:string)=>{
    // const valid=(/^[2-9]{1}[0-9]{11}$/).test(aadhar);
    // return fetch("https://auth-gate/validate/aadhar",{
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ aadhar })
    // })
    return true;
}

export const validatePassport=(passport:string)=>{
    // const valid=(/^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/).test(passport);
    // return fetch("https://auth-gate/validate/passport",{
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ passport })
    // })
    return true;
}

export const validateVoter=(voter:string)=>{
    // const valid=(/^[A-Z]{3}[0-9]{7}$/).test(voter);
    // return fetch("https://auth-gate/validate/voter",{
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ voter })
    // })
    return true;
}

export const validatePancard=(pancard:string)=>{
    // const valid=(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).test(pancard);
    // return fetch("https://auth-gate/validate/pancard",{
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ pancard })
    // })
    return true;
}

export const validateRation=(ration:string)=>{
    // const valid= (/^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/).test(ration);
    // return fetch("https://auth-gate/validate/ration",{
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ ration })
    // })
    return true;
}

export const validateDrivingLicense=(dl:string)=>{
    // const valid=(/^[A-Z]{2}[0-9]{2}[0-9]{11,13}$/).test(dl)
    // return fetch("https://auth-gate/validate/dl",{
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ dl })
    // })
    return true;
}