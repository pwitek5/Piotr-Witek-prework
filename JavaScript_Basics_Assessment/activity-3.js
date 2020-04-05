const nameList = ['Joe','Katie','Sandra'];
    for (let i = 0; i < 3; i++) {
const name = prompt('Enter Your first name');
nameList.push(name);
}
    for (let i = 0; i < nameList.length; i++) {
        alert(nameList[i]);
    }
