'use strict';

const API_URL = 'http://localhost:9999/api';
const showLoader = function (amountEl, nameEl, numberEl) {
    amountEl.innerHTML = `<div class="loading-indicator"></div>`;
    nameEl.innerHTML = `<div class="loading-indicator"></div>`;
    numberEl.innerHTML = `<div class="loading-indicator"></div>`;
};
const showAccount = (amountEl,  numberEl, nameEl, data, err) => {
    if (err){
        amountEl.innerHTML=`
        <div>Произошла ошибка</div>
        `;
        return;
    }
    // amountEl.innerHTML=`<div>${data.account.amount.toFixed(2)} руб.</div>`;
    amountEl.innerHTML=`<div>${String(data.account.amount).replace('.',',')} руб.</div>`;
    //amountEl.innerHTML=`<div>${data.account.amount.replace(/./,",")} руб.</div>`;
    numberEl.innerHTML=`<div>${data.account.number}</div>`;
    nameEl.innerHTML=`<div>${data.account.name}</div>`;
};
const amountEl =document.querySelector('.amount');
const nameEl = document.querySelector('.name');
const numberEl = document.querySelector('.number');
const loadAccount = async (elAmm, elNmb, elName)=> {
    try {
        showLoader(elAmm, elNmb, elName);
        const response = await fetch (`${API_URL}/hw15`);
        if (!response.ok){
            throw new Error((response.statusText));
        }
        const data=await response.json();
        showAccount(elAmm, elNmb, elName, data);
    }    catch (e){
        console.error(e);
        showAccount(elAmm, elNmb, elName, null, e);
    }
};
loadAccount(amountEl,numberEl, nameEl);




// const request = (method, url)=> {
//     return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.open(method, url);
//         xhr.onload = (evt) => resolve(evt);
//         xhr.onerror = (evt) => reject(evt);
//         xhr.send();
//     })
// }
// showLoader(bonusesEl);
//
// fetch(`${API_URL}/lection/slow/bonuses`)
//     .then((response)=>{
//         if (!response.ok) {
//             throw new Error('err.server');
//         }
//         return response.json();
//         })
//     .then((data)=>{
//         showBonuses(bonusesEl, data);
//     })
//     .catch((error)=>{
//         showBonuses(bonusesEl, null, 'err.common');
//     });
//
// request('GET', `${API_URL}/lection/bonuses/error`)
//     .then((evt)=>{
//             alert('sfsdfsa');
//             if (evt.target.status!==200){
//                 //showBonuses(bonusesEl, null, 'err.server');
//                 throw new Error('err.server');
//                 alert('fsfasdfsadfasdas');
//                  return;
//             }
//             const data =JSON.parse(evt.target.responseText);
//             showBonuses(bonusesEl, data);
//         })
//     .catch(()=>{
//             showBonuses(bonusesEl, null, 'err.network');
//             });



// document.body.addEventListener('click',(evt)=>console.log('clicked'));
// const response = xhr.responseText;
// console.log(response);
// setTimeout(()=>{
//
// },0);