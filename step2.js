const fs = require('fs')
const axios = require('axios')


function cat(path) {
    if (!path.includes('http')) {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                console.log('Error:', err)
                process.exit(1)
            } else {
                console.log('Data:', data)
            }
        })
    } else {
        webCat(path)
    }
}

async function webCat(url) {
    try {
        let resp = await axios.get(url)
        console.log(resp.data)
    } catch (err) {
        console.log('Error:', err)
    }
}

cat(process.argv[2])



