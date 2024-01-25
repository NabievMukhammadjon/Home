import modal from './modules/modal.js';
import './modules/tooltips.js';
import { openModal } from './modules/modal.js';
import { closeModal } from './modules/modal.js';

let clients = [];

let column = 'fio',
    columnDir = true;

modal('[data-modal]', '.modal', '');

const searchClients = document.getElementById('headerForm');

const $clientsList = document.getElementById('clientsList'),
      $clientsListThAll = document.querySelectorAll('.clients__table th');

function newClientTr(client) {
    const $clientTr = document.createElement('tr'),
          $idTD = document.createElement('td'),
          $fioTD = document.createElement('td'),
          $createDateTD = document.createElement('td'),
          $lastChangeTD = document.createElement('td'),
          $contactsTD = document.createElement('td'),
          $actionsTD = document.createElement('td');
        
    const btnChange = document.createElement('button'),
          btnDelete = document.createElement('button'),
          btnsBody = document.createElement('div');
    
    btnChange.classList.add('action__btns', '_icon-change');
    btnDelete.classList.add('action__btns', '_icon-delete');
    btnsBody.classList.add('action__body')
    const btnSpan1 = document.createElement('span');
    const btnSpan2 = document.createElement('span');
    btnSpan1.textContent = 'Изменить';
    btnSpan2.textContent = 'Удалить';
    btnChange.append(btnSpan1);
    btnDelete.append(btnSpan2);

    $idTD.textContent = client.id;
    $fioTD.textContent = client.fio;

    const dateCreate = document.createElement('div'),
          timeCreate = document.createElement('span');

    dateCreate.textContent = client.createDate.nowDate;
    timeCreate.textContent = client.createDate.nowTime;

    $createDateTD.append(dateCreate);
    $createDateTD.append(timeCreate);
    $createDateTD.classList.add('create-date');

    const dateChange = document.createElement('div'),
          timeChange = document.createElement('span');

    $lastChangeTD.append(dateChange);
    $lastChangeTD.append(timeChange);
    $lastChangeTD.classList.add('create-date');

    dateChange.textContent = client.lastChange.nowDate;
    timeChange.textContent = client.lastChange.nowTime;
    
    for (const key in client.contacts) {
        client.contacts[key].forEach(item => {
            const tooltipPhone = document.createElement('a'),
                tooltipContent = document.createElement('div'),
                tooltipContainer = document.createElement('div');
            
            tooltipContent.classList.add('tooltip-content')
            tooltipPhone.classList.add('tooltip-button');
            tooltipContainer.classList.add('tooltip-container');

            if (client.contacts[key].length !== 0) {
                switch (key) {
                    case 'phone':
                        tooltipPhone.href = `tel:${item}`;
                        tooltipPhone.classList.add('_icon-phone');
                        tooltipContainer.dataset.contacts = key;
                        break;
                    case 'allphone':
                        tooltipPhone.classList.add('_icon-subtract');
                        tooltipContainer.dataset.contacts = key;
                    break;
                    case 'mail':
                        tooltipPhone.href = `mailto:${item}`;
                        tooltipPhone.classList.add('_icon-mail');
                        tooltipContainer.dataset.contacts = key;
                        break;
                    case 'vk':
                        tooltipPhone.href = item;
                        tooltipPhone.classList.add('_icon-vk');
                        tooltipPhone.target = '_blank';
                        tooltipContainer.dataset.contacts = key;
                        break;
                    case 'facebook':
                        tooltipPhone.href = item;
                        tooltipPhone.classList.add('_icon-fb');
                        tooltipPhone.target = '_blank';
                        tooltipContainer.dataset.contacts = key;
                        break;
                }
                
                tooltipContent.textContent = item;
                
                tooltipContainer.append(tooltipPhone);
                tooltipContainer.append(tooltipContent);
                $contactsTD.append(tooltipContainer);
            }
        });
    }

    $contactsTD.classList.add('tooltips-list');

    btnsBody.append(btnChange);
    btnsBody.append(btnDelete);
    $actionsTD.append(btnsBody);

    $clientTr.append($idTD);
    $clientTr.append($fioTD);
    $clientTr.append($createDateTD);
    $clientTr.append($lastChangeTD);
    $clientTr.append($contactsTD);
    $clientTr.append($actionsTD);

    btnChange.dataset.modal = '';
    btnChange.id = 'clientsChangeData';

    btnChange.addEventListener('click', () => {
        openModal('.modal', 'Изменить данные', client.id);
        settingClients(client);
    
        let lastChange = getNowDate();
        client.lastChange = lastChange;
        
        saveList(clients, 'Клиенты');
        render();
    });

    btnDelete.addEventListener('click', () => {
        openModal('.modal', 'Удалить клиента');
    
        const modalMessage = document.createElement('p'),
              btnRemoveClient = document.createElement('button'),
              buttonCancel = document.createElement('button'),
              removeContent = document.createElement('div');

        modalMessage.textContent = 'Вы действительно хотите удалить данного клиента?';
        btnRemoveClient.textContent = 'Удалить';
        buttonCancel.textContent = 'Отмена';
        
        removeContent.classList.add('modal__remove-content');
        modalMessage.classList.add('modal__message');
        btnRemoveClient.classList.add('btn-primary', 'modal__button');
        buttonCancel.classList.add('btn-cancel', 'modal__cancel');

        removeContent.append(modalMessage, btnRemoveClient, buttonCancel);
        document.querySelector('.modal__body').append(removeContent);

        btnRemoveClient.addEventListener('click', e => {
            e.preventDefault();
            closeModal('.modal');
            for (let i = 0; i < clients.length; i++) {
                if (clients[i].id == client.id) {
                    clients.splice(i, 1); // .splice() это фун-я которая удоляет элемент
                }
            }
            saveList(clients, 'Клиенты');
            render();
        });

        buttonCancel.addEventListener('click', e => {
            e.preventDefault();
            closeModal('.modal');
        });
    });

    return $clientTr;
}

document.getElementById('clients-btn').addEventListener('click', () => {
    openModal('.modal', 'Новый клиент');
    const clientItemForm = settingClients();
    createApp(clientItemForm);
});

function settingClients(obj = '') {
    const modalBody = document.querySelector('.modal__body');
    
    const modalForm = document.createElement('form'),
          modalTopDiv = document.createElement('div'),
          inputSurname = document.createElement('input'),
          inputName = document.createElement('input'),
          inputLastname = document.createElement('input'),
          contactsBody = document.createElement('div'),
          listContectsBody = document.createElement('ul'),
          btnContactsBody = document.createElement('button'),
          btnFormSave = document.createElement('button'),
          btnFormCancel = document.createElement('button');

    inputSurname.placeholder = 'Фамилия*';
    inputName.placeholder = 'Имя*';
    inputLastname.placeholder = 'Отчество*';

    btnContactsBody.innerHTML = `Добавить контакт`;

    btnFormSave.textContent = 'Сохранить';
    btnFormCancel.textContent = 'Отмена';
    
    inputSurname.name = 'surname';
    inputName.name = 'name';
    inputLastname.name = 'lastname';

    modalForm.classList.add('modal__form', 'form-newClient');
    modalTopDiv.classList.add('form-newClient__top')
    inputSurname.classList.add('form-newClient__input');
    inputName.classList.add('form-newClient__input');
    inputLastname.classList.add('form-newClient__input');
    contactsBody.classList.add('form-newClient__contacts', 'contacts-form-newClient');
    listContectsBody.classList.add('contacts-form-newClient__list');
    btnContactsBody.classList.add('contacts-form-newClient__btn', '_icon-plus');
    btnFormSave.classList.add('form-newClient__save', 'btn-primary', 'button');
    btnFormCancel.classList.add('form-newClient__cancel', 'btn-cancel','button');
    btnContactsBody.id = 'newClientsAddBtn';
    listContectsBody.id = 'newClientsAddList';
    
    contactsBody.append(listContectsBody);
    contactsBody.append(btnContactsBody);
    modalTopDiv.append(inputSurname);
    modalTopDiv.append(inputName);
    modalTopDiv.append(inputLastname);
    modalForm.append(modalTopDiv);
    modalForm.append(contactsBody);
    modalForm.append(btnFormSave);
    modalForm.append(btnFormCancel);

    modalBody.append(modalForm);
    if (obj !== '') {
        const fio = obj.fio.split(' ');
        fio.forEach((user, index) => {
            if (index === 0) {
                inputSurname.value = user;
            } else if (index === 1) {
                inputName.value = user;
            } else if (index === 2) {
                inputLastname.value = user;
            }
        });
        if (obj.contacts) {
            if (obj.contacts.phone.length > 0) {
                obj.contacts.phone.forEach((elem, index) => {
                    let clientContact = createContactClients(listContectsBody, btnContactsBody);
                    changeContacts(clientContact, 'phone', elem, index);  
                });
            }
            if (obj.contacts.allphone.length > 0) {
                obj.contacts.allphone.forEach((elem, index) => {
                    let clientContact = createContactClients(listContectsBody, btnContactsBody);
                    changeContacts(clientContact, 'allphone', elem, index);
                 });
            }
            if (obj.contacts.mail.length > 0) {
                obj.contacts.mail.forEach((elem, index) => {
                    let clientContact = createContactClients(listContectsBody, btnContactsBody);
                    changeContacts(clientContact, 'mail', elem, index);
                });
            }
            if (obj.contacts.vk.length > 0) {
                obj.contacts.vk.forEach((elem, index) => {
                    let clientContact = createContactClients(listContectsBody, btnContactsBody);
                    changeContacts(clientContact, 'vk', elem, index);
                });
            }
            if (obj.contacts.facebook.length > 0) {
                obj.contacts.facebook.forEach((elem, index) => {
                    let clientContact = createContactClients(listContectsBody, btnContactsBody);
                    changeContacts(clientContact, 'facebook', elem, index);
                });
            }
        }

        btnFormSave.addEventListener('click', e => {
            e.preventDefault();
            let changeUserFIO = `${inputSurname.value} ${inputName.value} ${inputLastname.value}`;
            
            clients.forEach((client, i) => {
                if (client.id === obj.id) {
                    client.fio = changeUserFIO;
                    // client.contacts = obj.contacts
                    // console.log(obj.contacts)

                    client.contacts = getArrContacts()
                }
            }); 
            
            saveList(clients, 'Клиенты');
            closeModal('.modal');
            render();
        });
        
    }

    //========================================================================================================================================================
    btnContactsBody.addEventListener('click', e => {
        e.preventDefault();
        
        if (listContectsBody.getElementsByTagName('li').length < 10) {
            createContactClients( listContectsBody, btnContactsBody);
        } else {
            btnContactsBody.classList.add('hide');
        }
    });

    return {
        modalForm,
        inputSurname,
        inputName,
        inputLastname,
    };
}

function changeContacts(obj, key, element, index) {
    switch (key) {
        case 'allphone':
            obj.selectData.childNodes[0].textContent = 'Доп. телефон';
            break;
        case 'phone':
            obj.selectData.childNodes[0].textContent = 'Телефон';
            break;
        case 'mail': 
            obj.selectData.childNodes[0].textContent = 'Email';
            break;
        case 'vk': 
            obj.selectData.childNodes[0].textContent = 'Vk';
            break;
        case 'facebook': 
            obj.selectData.childNodes[0].textContent = 'Facebook';
            break;
    }

    obj.inputDataClient.value = element;
    
};

// ===

function createContactClients(listContectsBody, btnContactsBody) {
    const items = document.createElement('li'),
          selectData = document.createElement('select'),
          options = document.createElement('option'),
          inputDataClient = document.createElement('input'),
          btnDeleteContacts = document.createElement('button');

    items.classList.add('list-new-client__item', 'item-new-client');
    listContectsBody.appendChild(items);

    selectData.classList.add('item-new-client__choice');
    inputDataClient.classList.add('item-new-client__input');
    options.textContent = 'Телефон';
    options.value = 'phone';
    selectData.dataset.classModif = 'form';
    btnDeleteContacts.classList.add('item-new-client__btn');
    btnDeleteContacts.type = 'button';

    selectData.name = 'form[]';
    selectData.id = 'ClientsContacts';

    inputDataClient.placeholder = 'Введите данные контакта';

    items.appendChild(selectData);
    items.appendChild(inputDataClient);
    items.appendChild(btnDeleteContacts);
    selectData.appendChild(options);

    let newOption1 = new Option('Доп. телефон', 'Dop tel');
    newOption1.value = 'allPhone';
    newOption1.selected;
    selectData.append(newOption1);
    let newOption2 = new Option('Email', 'Email');
    newOption2.value = 'email';
    selectData.append(newOption2);
    let newOption3 = new Option('Vk', 'Vk');
    newOption3.value = 'vk';
    selectData.append(newOption3);
    let newOption4 = new Option('Facebook', 'Facebook');
    newOption4.value = 'facebook';
    selectData.append(newOption4);

    btnDeleteContacts.addEventListener('click', e => {
        e.preventDefault();

        items.remove();

        if (btnContactsBody.classList.contains('hide')) {
            btnContactsBody.classList.remove('hide');
        }
    });

    return {
        inputDataClient,
        selectData,
    }
}

function getArrContacts() {
    const contactSelects = document.querySelectorAll('.item-new-client__choice');
    const contactInputs = document.querySelectorAll('.item-new-client__input');
    
    const contacts = {phone: [], allphone: [], mail: [], vk: [], facebook: []};

    contactSelects.forEach((selc, i) => {
        selc.childNodes.forEach((elem, index) => {
            if (elem.selected) {
                switch (elem.innerText) {                    
                    case 'Телефон': 
                        contacts.phone.push(contactInputs[i].value);
                        break;
                    case 'Доп. телефон': 
                        contacts.allphone.push(contactInputs[i].value);
                        break;
                    case 'Email':
                        contacts.mail.push(contactInputs[i].value);
                        break;
                    case 'Vk':
                        contacts.vk.push(contactInputs[i].value);
                        break;
                    case 'Facebook':
                        contacts.facebook.push(contactInputs[i].value);
                        break;
                }
            }
        });

    });

    return contacts;
}
// ===
function render() {
    $clientsList.innerHTML = '';

    let localData = localStorage.getItem('Клиенты');  
    if  (localData !== null && localData !== '') {
        clients = JSON.parse(localData);
    }

    let copyClients = [...clients];

    copyClients = getSortClients(column, columnDir);

    if (searchClients.value !== '') {
        copyClients = filter(copyClients, column, searchClients.value)
    }

    for (const client of copyClients) {
        $clientsList.append(newClientTr(client));
    }
    
}
render();

function getNewId(arr) {
    let max = 100;
    for(const item of arr) {
        if(item.id > max) {
            max = item.id
        }
    }
    return max + 1; 
}
//========================================================================================================================================================
function saveList(arr, keyName) {
    localStorage.setItem(keyName, JSON.stringify(arr));
}

$clientsListThAll.forEach(element => {
    element.addEventListener('click', function() {
        column = this.dataset.column;
        columnDir = !columnDir;
        render();
    })
})

function getSortClients(prop, dir) {
    const clientsCopy = [...clients];
    return clientsCopy.sort(function(clientA, clientB) {
        if ((!dir == false ? clientA[prop] < clientB[prop] : clientA[prop] > clientB[prop])) {
            return -1;
        }
    })
}

searchClients.addEventListener('input', () => {
    render();
});

function filter(arr, prop, value) {
    let result = [],
        copy = [...arr];
    for (const item of copy) {
        if(String(item[prop]).includes(value) == true) result.push(item);
    }
    return result
}

function getNowDate() {
    let now = new Date();
    let yyyy = now.getFullYear();
    let mm = now.getMonth() + 1;
    let dd = now.getDate();
    let hour = now.getHours();
    let minut = now.getMinutes();

    if (mm <= 9) {
        mm = '0' + mm;
    }
    if (dd <= 9) {
        dd = '0' + dd;
    }
    if (hour <= 9) {
        hour = '0' + hour;
    }
    if (minut <= 9) {
        minut = '0' + minut;
    }

    let nowDate = `${dd}.${mm}.${yyyy}`;
    let nowTime = `${hour}:${minut}`;
    
    return {
        nowDate,
        nowTime,
    };
}

document.querySelectorAll('.clients__table-title._icon-arrow_filter').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('rotate');
    })
});

function createApp(obj) {
    obj.modalForm.addEventListener('submit', e => {
        e.preventDefault();

        let newItem = {
            id: getNewId(clients),
            fio: `${obj.inputSurname.value} ${obj.inputName.value} ${obj.inputLastname.value}`,
            createDate: getNowDate(),
            lastChange: getNowDate(),
            contacts: getArrContacts(),
        };
        
        let clientTr = newClientTr(newItem);
        
        clients.push(newItem);
        saveList(clients, 'Клиенты');

        closeModal('.modal');
        render()
    });
}
