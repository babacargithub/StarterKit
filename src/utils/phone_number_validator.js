export function isValidPhoneNumber(tel)
{
    return /^7[7680][0-9]{7}$/.test(tel);
}