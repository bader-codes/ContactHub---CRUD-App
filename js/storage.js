export function saveContacts(contacts){
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

export function loadContacts(){
    return JSON.parse(localStorage.getItem("contacts")) || [];
}