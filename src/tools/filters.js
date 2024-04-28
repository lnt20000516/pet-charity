const formatDecimal = (number, decimalPlaces) => {
    const factor = Math.pow(10, decimalPlaces)
    const truncatedNumber = Math.floor(number * factor)
    return (truncatedNumber / factor).toFixed(decimalPlaces)
}

export default (app)=>{
    app.config.globalProperties.$filters = {
        formatDecimal,
    }
}