module.exports = {
    sendSuccessMessage: (message, data = []) => {
        return {
            message: message,
            data: data,
            success: true,
        }
    },
    sendErrorMessage: (message) => {
        return {
            message: message,
            success: false
        }
    }
}