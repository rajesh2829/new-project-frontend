import Permission from "../lib/Permission";

export function hasPermission(permission) {

    let permissionList = localStorage.getItem(Permission.USER_ROLE);

    if (permissionList) {
        const isExist = permissionList.includes(permission)
        if (isExist) {
            return isExist
        } else {
            return false
        }
    }
    return false;
}



