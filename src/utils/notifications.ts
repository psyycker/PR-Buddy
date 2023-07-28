import {isPermissionGranted, requestPermission, sendNotification as send} from "@tauri-apps/api/notification";

export const sendNotification = async (content: string) => {
    let permissionGranted = await isPermissionGranted();
    if (!permissionGranted) {
        const permission = await requestPermission();
        permissionGranted = permission === 'granted'
    }
    if (permissionGranted) {
        send(content)
    }
}

export const initPermissions = async () => {
    let permissionGranted = await isPermissionGranted();
    if (!permissionGranted) {
        await requestPermission();
    }
}
