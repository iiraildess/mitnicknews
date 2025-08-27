async function getIP(){
    // https://api.ipify.org?format=json

    const res = await fetch("https://api.ipify.org?format=json")
    const data = await res.json()

    return data.ip

}


module.exports = { getIP }