const fs = require('fs')
const path = require('path')
const generateId = require('shortid')

const contactsPath = path.join(__dirname, './db/contacts.json')

function listContacts() {
    fs.readFile(contactsPath, 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(data)
    })
}

function getContactById(contactId) {
    fs.readFile(contactsPath, (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        const contacts = JSON.parse(data)
        contactId < 0 || contactId > contacts.length
            ? console.log('check contactId and try again')
            : console.log(contacts.find((contact) => contact.id === contactId))
    })
}

function removeContact(contactId) {
    fs.readFile(contactsPath, (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        const newList = JSON.parse(data).filter(
            (contact) => contact.id !== contactId
        )

        refreshList(newList)
    })
}

function addContact(name, email, phone) {
    fs.readFile(contactsPath, (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        const newList = JSON.parse(data)

        const newContact = {
            id: generateId(),
            name,
            email,
            phone,
        }

        newList.push(newContact)
        refreshList(newList)
    })
}

function refreshList(contacts) {
    fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
        if (err) {
            console.log(err)
            return
        }
    })
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}
