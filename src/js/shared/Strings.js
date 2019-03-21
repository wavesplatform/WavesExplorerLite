export default {
    trimEnd: (string, char) => {
        while (string.charAt(string.length - 1) === char) {
            string = string.substring(0, string.length - 1);
        }

        return string;
    }
}
