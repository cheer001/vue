const TOKEN_KEY = 'mxg-msm-token'
const USER_KEY = 'mxg-msm-user'

// ��ȡ token
export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}
// ���� token
export function setToken(token) {
    return localStorage.setItem(TOKEN_KEY, token)
}
// ��ȡ�û���Ϣ
export function getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY))
}
//�����û���Ϣ
export function setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
}
//�Ƴ��û���Ϣ
export function removeToken() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
}