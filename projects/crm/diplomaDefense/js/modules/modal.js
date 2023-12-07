function openModal(modalSelector, title, userId = '') {
    const modal = document.querySelector(modalSelector);
    const modalTitle = document.querySelector('.modal__title');
    modalTitle.textContent = title;
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (title === 'Удалить клиента') {
        modalTitle.classList.add('remove-title')
    } else {
        modalTitle.classList.remove('remove-title')
    };

    const idUser = document.querySelector('.modal__user-id');
    if (userId === '') {
        idUser.classList.remove('active');
        idUser.textContent = '';
    } else {
        idUser.classList.add('active');
        idUser.textContent = `ID:${userId}`;
    }
}

function closeModal(modalSelector) {
    if (document.querySelector('.modal__form')) {
        document.querySelector('.modal__form').remove();
    } else if (document.querySelector('.modal__remove-content')) {
        document.querySelector('.modal__remove-content').remove();
    }
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector) {
    const modal = document.querySelector(modalSelector),
          modalTrigger = document.querySelector(triggerSelector);

    modalTrigger.addEventListener('click', () => {
        openModal(modalSelector)}
    );

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });
    // +++++++++++

    // const modalBody = document.querySelector('.modal__body');

    // const modalForm = document.createElement('form'),
    //       modalTopDiv = document.createElement('div'),
    //       inputSurname = document.createElement('input'),
    //       inputName = document.createElement('input'),
    //       inputLastname = document.createElement('input'),
    //       contactsBody = document.createElement('div'),
    //       listContectsBody = document.createElement('ul'),
    //       btnContactsBody = document.createElement('button'),
    //       btnFormSave = document.createElement('button'),
    //       btnFormCancel = document.createElement('button');

    // inputSurname.placeholder = 'Фамилия*';
    // inputName.placeholder = 'Имя*';
    // inputLastname.placeholder = 'Отчество*';

    // btnContactsBody.innerHTML = `
    //     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    //         <g clip-path="url(#clip0_224_8628)">
    //             <path d="M7.99998 4.66659C7.63331 4.66659 7.33331 4.96659 7.33331 5.33325V7.33325H5.33331C4.96665 7.33325 4.66665 7.63325 4.66665 7.99992C4.66665 8.36659 4.96665 8.66659 5.33331 8.66659H7.33331V10.6666C7.33331 11.0333 7.63331 11.3333 7.99998 11.3333C8.36665 11.3333 8.66665 11.0333 8.66665 10.6666V8.66659H10.6666C11.0333 8.66659 11.3333 8.36659 11.3333 7.99992C11.3333 7.63325 11.0333 7.33325 10.6666 7.33325H8.66665V5.33325C8.66665 4.96659 8.36665 4.66659 7.99998 4.66659ZM7.99998 1.33325C4.31998 1.33325 1.33331 4.31992 1.33331 7.99992C1.33331 11.6799 4.31998 14.6666 7.99998 14.6666C11.68 14.6666 14.6666 11.6799 14.6666 7.99992C14.6666 4.31992 11.68 1.33325 7.99998 1.33325ZM7.99998 13.3333C5.05998 13.3333 2.66665 10.9399 2.66665 7.99992C2.66665 5.05992 5.05998 2.66659 7.99998 2.66659C10.94 2.66659 13.3333 5.05992 13.3333 7.99992C13.3333 10.9399 10.94 13.3333 7.99998 13.3333Z" fill="#9873FF"/>
    //         </g>
    //         <defs>
    //             <clipPath id="clip0_224_8628">
    //             <rect width="16" height="16" fill="white"/>
    //             </clipPath>
    //         </defs>
    //     </svg>    
    //     Добавить контакт
    // `;
    // btnFormSave.textContent = 'Сохранить';
    // btnFormCancel.textContent = 'Отмена';
    
    // inputSurname.name = 'surname';
    // inputName.name = 'name';
    // inputLastname.name = 'lastname';

    // modalForm.classList.add('modal__form', 'form-newClient');
    // modalTopDiv.classList.add('form-newClient__top')
    // inputSurname.classList.add('form-newClient__input');
    // inputName.classList.add('form-newClient__input');
    // inputLastname.classList.add('form-newClient__input');
    // contactsBody.classList.add('form-newClient__contacts', 'contacts-form-newClient');
    // listContectsBody.classList.add('contacts-form-newClient__list');
    // btnContactsBody.classList.add('contacts-form-newClient__btn');
    // btnFormSave.classList.add('form-newClient__save', 'button');
    // btnFormCancel.classList.add('form-newClient__cancel', 'button');
    // btnContactsBody.id = 'newClientsAddBtn';
    // listContectsBody.id = 'newClientsAddList';

    // contactsBody.append(listContectsBody);
    // contactsBody.append(btnContactsBody);
    // modalTopDiv.append(inputSurname);
    // modalTopDiv.append(inputName);
    // modalTopDiv.append(inputLastname);
    // modalForm.append(modalTopDiv);
    // modalForm.append(contactsBody);
    // modalForm.append(btnFormSave);
    // modalForm.append(btnFormCancel);

    // modalBody.append(modalForm);
}

export default modal;
export {closeModal};
export {openModal};