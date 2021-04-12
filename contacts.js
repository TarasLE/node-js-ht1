const fs = require('fs')
const { loadavg } = require('os')
const path = require('path')
const generateId = require('shortid')
const { promises: fsPromise } = fs

const contactsPath = path.join(__dirname, 'db', 'contacts.json')
let contactsLet
function listContacts() {
    return fs.readFile(contactsPath, 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(data)
    })
}

function getContactById(contactId) {
    try {
        fs.readFile(contactsPath, (err, data) => {
            if (err) {
                console.log(err)
                return
            }
            const contacts = JSON.parse(data)
            console.log(contacts.find((contact) => contact.id == contactId))
        })
    } catch (error) {
        console.log(error.message)
    }
}

async function removeContact(contactId) {
    try {
        fs.readFile(contactsPath, async (err, data) => {
            if (err) {
                console.log(err)
                return
            }
            const contacts = JSON.parse(data)
            const newList = contacts.filter(
                (contact) => contact.id !== contactId
            )
            await fsPromise.writeFile(contactsPath, JSON.stringify(newList))
        })
    } catch (error) {
        console.log(error.message)
    }
}

function addContact(name, email, phone) {
    try {
        fs.readFile(contactsPath, async (err, data) => {
            if (err) {
                console.log(err)
                return
            }
            const contacts = JSON.parse(data)
            const newList = contacts
            const newContact = {
                id: generateId(),
                name,
                email,
                phone,
            }
            newList.push(newContact)
            await fsPromise.writeFile(contactsPath, JSON.stringify(newList))
        })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}
