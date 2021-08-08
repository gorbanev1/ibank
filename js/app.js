'use strict';

const API_URL = 'http://localhost:9999/api';
const showLoader = function (amountEl, nameEl, numberEl) {
    amountEl.innerHTML = '<div class="loading-indicator"></div>';
    nameEl.innerHTML = '<div class="loading-indicator"></div>';
    numberEl.innerHTML = '<div class="loading-indicator"></div>';
};
const showAccount = (amountEl, numberEl, nameEl, infoEl, data, err) => {
    if (err){
        //alert('dddddddddddddddddddddddddddddddd');
        infoEl.innerHTML=`
        Произошла ошибка
        <button class="retry">Повторить запрос</button>
        `;
        const retryButton = document.querySelector('.retry');

        retryButton.onclick=()=>{
            infoEl.innerHTML='';
            infoEl.appendChild(nameEl);
            infoEl.appendChild(numberEl);
            const divBalance=document.createElement('div');//.setAttribute("class","balance");
            //alert(divBalance);
            divBalance.setAttribute('class','balance');
            divBalance.appendChild(amountEl);
            divBalance.appendChild(document.createTextNode(' ₽'));
            infoEl.appendChild(divBalance);
            loadAccount(amountEl,numberEl, nameEl, infoEl);
        };


        return;
    }

    // infoEl.innerHTML=`
    //         <div class="name">Текущий счет</div>
    //         <div class="number">xxxxx55555555555xxxxx</div>
    //         <div class="balance">
    //             <span class="amount">999,99</span> ₽
    //         </div>
    //     `;
    amountEl.textContent=`${String(data.account.amount).replace('.',',')}`;
    numberEl.textContent=`${data.account.number}`;
    nameEl.textContent=`${data.account.name}`;
};
const amountEl =document.querySelector('.amount');
const nameEl = document.querySelector('.name');
const numberEl = document.querySelector('.number');
const infoEl = document.querySelector('.info');
const loadAccount = async (elAmm, elNmb, elName, elInfo)=> {
    showLoader(elAmm, elNmb, elName);
    try {
        const response = await fetch (`${API_URL}/hw16`);
        if (!response.ok){
            //alert(response.statusText);
            throw new Error((response.statusText));

        }
        //alert('try');
        const data=await response.json();
        showAccount(elAmm, elNmb, elName, elInfo, data);
    } catch (e){
        console.error(e);
        //alert(e);
        showAccount(elAmm, elNmb, elName, elInfo, null, e);

    }
};
loadAccount(amountEl,numberEl, nameEl, infoEl);
