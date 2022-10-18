$(document).ready(() => {
    getNewPassword();
    $("#btn-generate").click(() => {
        getNewPassword();
    });

    $('a').click((e) => {
        e.preventDefault();
        navigator.clipboard.writeText($("#input-text").val()).then(
            () => {
                /* window.alert('Success! The text was copied to your clipboard') */
            },
            () => {
                /* window.alert('Opps! Your browser does not support the Clipboard API') */
            }
        )
        return false;
    });
});

const lower = 'abcdefghijklmnopqrstuvwxyz';
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*()-+={}[]';
const space = ' ';

let allPosibleChar = '';
let newPassword = '';
let randomPos = 0;
let count = 0;

const getRandomInt = (max) => Math.floor(Math.random() * max);

const updateIput = (val) => {

    $("#password-size").html(val);
    getNewPassword();

    $('.strong-password-indicator').removeAttr('id');

    if (val < 10) {
        $('.strong-password-indicator').attr('id', 'weak');
    } else if (val < 20 && val > 9) {
        $('.strong-password-indicator').attr('id', 'medium');
    } else {
        $('.strong-password-indicator').attr('id', 'strong');
    }
}

const getNewPassword = () => {

    allPosibleChar = '';
    newPassword = '';
    count = 0;

    if ($('.lower').is(':checked')) {
        allPosibleChar = allPosibleChar.concat(lower);
        newPassword = newPassword.concat(lower[getRandomInt(lower.length)])
        count++;
    }
    if ($('.upper').is(':checked')) {
        allPosibleChar = allPosibleChar.concat(upper);
        newPassword = newPassword.concat(upper[getRandomInt(upper.length)])
        count++;
    }
    if ($('.number').is(':checked')) {
        allPosibleChar = allPosibleChar.concat(numbers);
        newPassword = newPassword.concat(numbers[getRandomInt(numbers.length)])
        count++;
    }
    if ($('.symbols').is(':checked')) {
        allPosibleChar = allPosibleChar.concat(symbols);
        newPassword = newPassword.concat(symbols[getRandomInt(symbols.length)])
        count++;
    }
    if ($('.spaces').is(':checked')) {
        allPosibleChar = allPosibleChar.concat(space);
        newPassword = newPassword.concat(' ')
        count++;
    }

    let size = parseInt($("#password-size").text());

    for (let index = 0; index < size - count; index++) {
        randomPos = getRandomInt(allPosibleChar.length);
        newPassword = newPassword.concat(allPosibleChar[randomPos]);
    }

    
    if(count > size){
        let differenceCountAndSize = count - size;
        newPassword = newPassword.substring(differenceCountAndSize, count);
    }
    $("#input-text").val(newPassword);
}