// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{SystemTray, SystemTrayMenu, SystemTrayEvent};
use tauri::Manager;
use tauri_plugin_positioner::{Position, WindowExt};
use tauri::ActivationPolicy;

extern {
    fn LSSetApplicationHidden(hidden: bool);
}

fn main() {
    let system_tray_menu = SystemTrayMenu::new();
    let app = tauri::Builder::default()
        .plugin(tauri_plugin_positioner::init())
        .system_tray(SystemTray::new().with_menu(system_tray_menu))
        .on_system_tray_event(|app, event| {
            tauri_plugin_positioner::on_tray_event(app, &event);
            match event {
                SystemTrayEvent::LeftClick {
                    position: _,
                    size: _,
                    ..
                } => {
                    let window = app.get_window("main").unwrap();
                    // use TrayCenter as initial window position
                    let _ = window.move_window(Position::TrayCenter);
                    if window.is_visible().unwrap() {
                        window.hide().unwrap();
                    } else {
                        window.show().unwrap();
                        window.set_focus().unwrap();
                    }
                }
                _ => {}
            }
        })
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::Focused(is_focused) => {
                // detect click outside of the focused window and hide the app
                if !is_focused {
                    // event.window().hide().unwrap();
                }
            }
            _ => {}
        });
    app.run(tauri::generate_context!()).expect("error while running tauri application");
}
