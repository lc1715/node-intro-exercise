const fs = require('fs')
const axios = require('axios')


function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log('Error:', err)
            process.exit(1)
        }
        console.log('Data:', data)
    })
}


function catWrite(oldPath, newPath) {
    fs.readFile(oldPath, 'utf8', (err, data) => {
        if (err) {
            console.log('Error:', err)
            process.exit(1)
        }
        console.log('Data:', data)
        fs.writeFile(newPath, data, 'utf8', (err) => {
            if (err) {
                console.log('Error:', err)
            }
            console.log('it worked!')
        })
    })
}

async function webCat(url) {
    try {
        let resp = await axios.get(url)
        console.log(resp.data)
    } catch (err) {
        console.log('Error:', err)
    }
}

async function webCatWrite(oldPath, newPath) {
    console.log(process.argv)
    try {
        let resp = await axios.get(oldPath)
        fs.writeFile(newPath, resp.data.results[0].name, 'utf8', (err) => {
            if (err) {
                console.log('Error:', err)
            }
            console.log('it worked!')
        })
    } catch (err) {
        console.log('Error:', err)
    }
}

let indexTwo = process.argv[2]
let newPath = process.argv[3]
let oldPath = process.argv[4]


if (indexTwo.includes('http')) {
    webCat(indexTwo)
} else if (indexTwo != ('--out') && !indexTwo.includes('http')) {
    cat(indexTwo)
} else if (oldPath.includes('http')) {
    webCatWrite(oldPath, newPath)
} else if (!oldPath.includes('http')) {
    catWrite(oldPath, newPath)
}


