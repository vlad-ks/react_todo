export const getIdByDateNow = (prefix = "") => {
    return `${prefix}_${Date.now()}`;
}