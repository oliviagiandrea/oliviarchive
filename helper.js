/* This function creates a random string of 20 characters. Not
 * necessarily cryptographically secure, but good for cookie
 * signing. 
 * Thanks to https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 */

function randomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

module.exports = {
    randomString
};
