import './P_style.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Payment = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        alert(`Username: ${username}\nPassword: ${password}`);
    };
    return (
        <div>
            <div className="header">
                <h1>Enter Credit card details</h1>
            </div>
            <div className="p_body">
                <div className="form-container">
                    <button type="button" className="btn-submit" onClick={getSavedCardDetails}>GET SAVED CARDS</button>
                </div>
                <div className="card-details-container">
                    <div className="row">
                        <div className="input-container">
                            <label>CARD NUMBER</label>
                            <input type="text" id="creditno" onKeyDown={checkDigit} onKeyUp={validateCardNumber} placeholder="XXXX XXXX XXXX XXXX" onPaste={(event) => validatePastedCardNumber(event)} maxLength="19" />
                        </div>
                    </div>
                    <div className="expiry-cvv-wrapper">
                        <div className="input-container expiry">
                            <label>EXPIRY DATE</label>
                            <input type="text" id="expirydate" className="input_expiry" onKeyDown={checkDigit} onKeyUp={validateExpiry} placeholder="MM/YY" maxLength="5" />
                        </div>
                        <div className="input-container cvv">
                            <label>SECURITY</label>
                            <input type="password" id="cvv" className="input_cvv" placeholder="CVV" onKeyUp={validateCVV} />
                        </div>
                        <div className="input-container">
                            <img id="card-icon-update" className="card-icon" src="credit-card.png" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-container">
                            <label>CARD NAME</label>
                            <input type="text" id="cardname" placeholder="ENTER CARD NAME" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-container">
                            <label>Amount</label>
                            <input type="text" id="amount" onKeyDown={checkDigit} onKeyUp={validateAmount} placeholder="ENTER AMOUNT TO PAY" required />
                        </div>
                    </div>
                    <p id="showErrorMsg" className="error-message"></p>
                    <div className="form-container">
                        <button type="button" className="btn-submit" onClick={saveCardDetails}>CONTINUE</button>
                    </div>
                    <p id="showSuccessMsg" className="success-message"></p>
                </div>
                <div className="card-list-container">
                    {/* Add your card list here */}
                </div>
            </div>
            <div id="modal-container" className="modal" style={{ display: 'none' }}>
                <div className="overlay">
                    <div className="modal-content">
                        <div className="close-icon" onClick={closeModal}><img src="close.png" alt="Close Icon" /></div>
                        <ul id="saved-card-list">
                            {/* Add your saved card list here */}
                        </ul>
                        <p id="no-cards"></p>
                    </div>
                </div>
            </div>
        </div>    
    );
};

export default Payment;


const CARDS_INFO = {
    VISA : {
        CARDNAME : "Visa",
        REGEX : "^4[0-9]{12}(?:[0-9]{3})?$",
        CARDLENGTH : 16,
        ICON : "visa.png",
        CARD_COLOR: ["#5d4148","#d8a1b8"]
    },
    MASTER : {
        CARDNAME : "MasterCard",
        REGEX : "^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$",
        CARDLENGTH : 16,
        ICON : "master.png",
        CARD_COLOR: ["#264b6b","#777657"]
    },
    AMEX : {
        CARDNAME : "American Express",
        REGEX : "^3[47][0-9]{13}$",
        CARDLENGTH : 15,
        ICON : "amex.png",
        CARD_COLOR: ["#b50b1b","#171302"]
    },
    DINERS : {
        CARDNAME : "Diners Club",
        REGEX : "^3(?:0[0-5]|[68][0-9])[0-9]{11}$",
        CARDLENGTH : 16,
        ICON : "diners-club.png",
        CARD_COLOR: ["#443032","#d8a1b8"]
    },
    DISCOVER : {
        CARDNAME : "Discover",
        REGEX : "^6(?:011|5[0-9]{2})[0-9]{12}$",
        CARDLENGTH : 16,
        ICON : "discover.png",
        CARD_COLOR: ["#0a7154","#88b59c"]
    },
    JCB : {
        CARDNAME: "JCB",
        REGEX : "^(?:2131|1800|35\d{3})\d{11}$",
        CARDLENGTH:16,
        ICON : "jcb.png",
        CARD_COLOR: ["#08610f","#bbd6d5"]
    }
}

const ERROR_MSG = {
    "EXPIRY_REQUIRED" : "Please enter expiry date",
    "CVV_REQUIRED" : "Please enter CVV",
    "CARDNUMBER_REQUIRED" : "Please enter card number",
    "CARDNAME_REQUIRED" : "Please enter card name",
    "EXPIRY_INVALID" : "Invalid expiry date",
    "CVV_INVALID" : "Invalid CVV",
    "CARDNUMBER_INVALID" : "Invalid Card Number",
    "AMOUNT_REQUIRED" : "Please enter Valid amount"
}
let savedCards = [];
let localStorage = window.localStorage;

function formatCardNumber(s) {
    return s.toString().replace(/\d{4}(?=.)/g, '$& ');
}

function formatExpiry(s) {
    s = s.replace("/","");
    return s.toString().replace(/\d{2}(?=.)/g, '$&/');
}

function validateExpiry(jumpToNextInput) {
      let expiryEle = document.getElementById('expirydate');
      
      expiryEle.value = formatExpiry(expiryEle.value);
      
      const expiryDate = expiryEle.value.split("/");
      
      if(expiryEle.value.length == 5 && jumpToNextInput) {
          getElementByID('cvv').focus();
      }

      if(validateExpiryMonth(expiryDate[0]) && validateExpiryYear(expiryDate[1]))  {
        const cardExpiryDate = new Date(
            `20${expiryDate[1]}`,
            parseInt(expiryDate[0]) - 1,
            1
        ).getTime();
        if (cardExpiryDate > Date.now()) {
            return true;
        }
      }
      
      
      return false;
}

function validateCardNumber(event, val, jumpToNextInput) {
    // console.log("object", CARDS_INFO.VISA.ICON);
    let validated = false;
    let cardType;
    let ele = document.getElementById('creditno');
    
    if(!val) {
        val = ele.value.split(' ').join('');
    }
    
    ele.value = formatCardNumber(val);

    const cardInfoArray = Object.entries(CARDS_INFO);

    for(let i=0;i<cardInfoArray.length;i++) {
        cardType = cardInfoArray[i][0];
        let cardInfo = cardInfoArray[i][1];
        if(val.match(cardInfo.REGEX)) {
            console.log("true", cardInfo);
            let img = document.getElementById('card-icon-update');
            img.value = cardType;
            img.src = cardInfo.ICON;
            validated = true;
            break;
        }
    }
    if(validated && jumpToNextInput) {
        getElementByID('expirydate').focus();
    }
    return validated;
}

function validatePastedCardNumber(event) {
    if (navigator.clipboard) {
        navigator.clipboard.readText().then((pasteData) => {
            validateCardNumber(event, pasteData);
        }).catch((error) => {
            console.error('Error reading clipboard data:', error);
        });
    } else {
        const pasteData = event.clipboardData.getData('text');
        validateCardNumber(event, pasteData);
    }
}

function validateExpiryMonth(expiryMonth) {
      return (
        expiryMonth &&
        expiryMonth.length === 2 &&
        parseInt(expiryMonth) <= 12 &&
        parseInt(expiryMonth) > 0
      );
}

function validateExpiryYear(expiryYear) {
    return (
      expiryYear &&
      expiryYear.length === 2 &&
      parseInt(expiryYear) >=
        parseInt(String(new Date().getFullYear()).slice(-2)) &&
      parseInt(expiryYear) < 100
    );
  }

function validateCVV(jumpToNextInput) {
     let cvv  = document.getElementById('cvv').value;
     if(cvv.length == 3) {
           if(jumpToNextInput)
                getElementByID('cardname').focus();
         return true;
     }
     return false;
}

function validateAmount() {
    const amountInput = document.getElementById('amount');
    const amountValue = parseFloat(amountInput.value);

    if (isNaN(amountValue) || amountValue <= 0) {
        return false;
    }

    showErrorMsg("");
    return true;
}

function checkDigit(event) {
    var code = (event.which) ? event.which : event.keyCode;

    if ((code < 48 || code > 57) && (code > 31)) {
        return false;
    }
    return true;
}

function validateForm() {
    if(!validateCardNumber()) {
         showErrorMsg(ERROR_MSG.CARDNUMBER_INVALID);
         return false;
    }
    if(!validateExpiry()) {
        showErrorMsg(ERROR_MSG.EXPIRY_INVALID);
        return false;
    }
    if(!validateCVV()) {
        showErrorMsg(ERROR_MSG.CVV_INVALID);
        return false;
    }
    if(!validateAmount()) {
        showErrorMsg(ERROR_MSG.AMOUNT_REQUIRED);
        return false;
    }
    return true;
}


function saveCardDetails() {
   let isValidated;
   
   let cardNumber = getDataByID('creditno');
   let expiry = getDataByID('expirydate');
   let cvv = getDataByID('cvv');
   let cardName = getDataByID('cardname');
   

   if(!cardNumber) {
       showErrorMsg(ERROR_MSG.CARDNUMBER_REQUIRED);
       return;
   } 
   if(!expiry) {
       showErrorMsg(ERROR_MSG.EXPIRY_REQUIRED);
       return;
   } 
   if(!cvv) {
       showErrorMsg(ERROR_MSG.CVV_REQUIRED);
       return;
   }
   if(!cardName) {
       showErrorMsg(ERROR_MSG.CARDNAME_REQUIRED);
       return;
   }

   isValidated = validateForm();
   if(!isValidated) return;

   showErrorMsg("");

   let cardType = getDataByID('card-icon-update');

   const obj = {
       cardNumber,
       expiry,
       cvv,
       cardType,
       cardName
   }

   savedCards = JSON.parse(localStorage.getItem('CARD_INFO'));
   if(!savedCards) savedCards = [];
   savedCards.push(obj);
   localStorage.setItem('CARD_INFO', JSON.stringify(savedCards)); 
   showSuccessMsg("Card Details Saved and Amount Paid Successfully");
   clearModal();
}
function selectCard(pos) {
    let selectedCard = savedCards[pos];
    getElementByID('creditno').value = selectedCard.cardNumber;
    getElementByID('expirydate').value = selectedCard.expiry;
    getElementByID('cvv').value = selectedCard.cvv;
    getElementByID('card-icon-update').src = CARDS_INFO[selectedCard.cardType].ICON;
    getElementByID('cardname').value = selectedCard.cardName;
    closeModal();
}

function showErrorMsg(msg) {
    getElementByID('showErrorMsg').innerHTML = msg;
}

function showSuccessMsg(msg) {
    getElementByID('showSuccessMsg').innerHTML = msg;
}

function closeModal() {
    document.getElementById('modal-container').style["display"] = "none";
}

function clearModal() {
    getElementByID('creditno').value = "";
    getElementByID('expirydate').value = "";
    getElementByID('cvv').value = "";
    getElementByID('cardname').value = "";
    getElementByID('amount').value = "";
    getElementByID('card-icon-update').src = "credit-card.png";
}

function getSavedCardDetails() {
    savedCards = JSON.parse(localStorage.getItem('CARD_INFO'));

    document.getElementById('modal-container').style["display"] = "block";
    let listcontainer = document.getElementById("saved-card-list");

    document.getElementById("no-cards").innerHTML = "";

    listcontainer.innerHTML = '';

    if (savedCards.length === 0) {
        document.getElementById("no-cards").innerHTML = "No Saved Cards";
        return;
    }

    savedCards.forEach((element, index) => {
        const card_colors = CARDS_INFO[element.cardType].CARD_COLOR;
        const cardItem = document.createElement('li');

        cardItem.innerHTML = `<div class="list-container" style="background-image: linear-gradient(${card_colors[0]},${card_colors[1]})">
            <div class="card-title">${element.cardName}</div>
            <div class="card-number">${element.cardNumber}</div>
            <div class="card-type"><img class="" src=${CARDS_INFO[element.cardType].ICON}></div>
        </div>
        <button type="button" class="btn-delete">Delete Card</button>`;

        cardItem.querySelector('.list-container').addEventListener('click', () => selectCard(index));
        cardItem.querySelector('.btn-delete').addEventListener('click', () => deleteCardDetails(index));

        listcontainer.appendChild(cardItem);
    });
}


function deleteCardDetails(pos) {
    let confirm = window.confirm("You are deleting this card from Saved Card list. Are you sure...???")
    if(!confirm) {
        return;
    }

    savedCards.splice(pos, 1);
    localStorage.setItem('CARD_INFO', JSON.stringify(savedCards));  
    getSavedCardDetails();
}

function getDataByID(element) {
    return document.getElementById(element) ? document.getElementById(element).value : '';
}
function getElementByID(element) {
    return document.getElementById(element);
}

