'use strict';

const API_URL = 'http://localhost:9999/api';
const request = (method, url)=> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = (evt) => resolve(evt);
        xhr.onerror = (evt) => reject(evt);
        xhr.send();
    })
}
const showLoader = function (parentEl) {
    parentEl.innerHTML = `<div class="loading-indicator"></div>`;
};
const showBonuses = (parentEl, data, err) => {
    if (err){
        parentEl.innerHTML=`
        <div>Произошла ошибка</div>
        `;
        return;
    }
    parentEl.innerHTML=`<div>${data.bonuses.toFixed(2)} руб.</div>
    `;
};
const bonusesEl =document.getElementById('bonuses');
const loadBonuses = async ()=> {
    try {
        showLoader(bonusesEl);
        const response = await fetch (`${API_URL}/lection/slow/bonuses`);
        if (!response.ok){
            throw new Error((response.statusText));
        }
        const data=await response.json();
        showBonuses(bonusesEl,data);
    }    catch (e){
        console.error(e);
        showBonuses(bonusesEl, null, e);
    }
};
loadBonuses();
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