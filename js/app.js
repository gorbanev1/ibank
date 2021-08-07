'use strict';

const API_URL = 'http://localhost:9999/api';
const showLoader = function (amountEl, nameEl, numberEl) {
    amountEl.innerHTML = '<div class="loading-indicator"></div>';
    nameEl.innerHTML = '<div class="loading-indicator"></div>';
    numberEl.innerHTML = '<div class="loading-indicator"></div>';
};
const showAccount = (amountEl, numberEl, nameEl, data, err) => {
    if (err){
        amountEl.innerHTML=`
        <div>Произошла ошибка</div>
        `;
        return;
    }
    amountEl.textContent=`${String(data.account.amount).replace('.',',')}`;
    numberEl.textContent=`${data.account.number}`;
    nameEl.textContent=`${data.account.name}`;
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
    } catch (e){
        console.error(e);
        showAccount(elAmm, elNmb, elName, null, e);
    }
};
loadAccount(amountEl,numberEl, nameEl);
