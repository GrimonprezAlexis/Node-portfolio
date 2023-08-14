module.exports.executeAndSendResult = async function (func, res, next) {
    try {
      const result = await func();
      return result;
    } catch (e) {
      next(e);
    }
};
 
// Handle MongoDB connection errors
module.exports.handleDBError = (error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
};