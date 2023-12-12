function debugUtils(tittle,message,enable = true) {
    if(enable) {
        console.log(tittle,' ',message);
    }
}

module.exports = debugUtils;