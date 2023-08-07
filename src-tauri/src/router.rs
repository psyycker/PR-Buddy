use std::fmt::format;
use rspc::{
    Router, Rspc
};
use axum::extract::Query;
use serde::{Deserialize, Serialize};
use specta::Type;
use tower_http::cors;

#[allow(non_upper_case_globals)]
pub(self) const R: Rspc<()> = Rspc::new();

pub fn router() -> Router {
    R.router()
        .merge("auth.", auth())
}

fn auth() -> Router<()> {
    R.router().procedure(
        "github",
        R.subscription(|_, _: ()| async move {
            use axum::*;

            #[derive(Type, Serialize)]
            #[specta(inline)]
            enum Message {
                Listening,
                #[serde(rename_all = "camelCase")]
                Received {
                    access_token: String,
                    refresh_token: String,
                }
            }

            let (tx, mut rx) = tokio::sync::mpsc::channel(4);

            #[derive(Deserialize, Debug)]
            struct TokenData {
                access_token: String,
                refresh_token: String,
                scope: Vec<String>,
                expires_in: u32,
            }

            #[derive(Deserialize, Debug)]
            struct Params {
                token: String,
            }

            let app = <Router>::new()
                .layer(tower_http::cors::CorsLayer::very_permissive())
                .route("/",
                            routing::get(|Query(params): Query<Params>| async move {
                                tx.send(serde_json::from_str::<TokenData>(&params.token).unwrap()).await.expect("no send?!");
                                "You can return to PR-Buddy"
                            })
                );

            let addr = format!(
                "127.0.0.1:{}",
                cfg!(debug_assertions).then_some(2598).unwrap_or(0)
            ).parse().unwrap();

            let (shutdown_tx, shutdown_rx) = tokio::sync::oneshot::channel();
            let server = axum::Server::bind(&addr).serve(app.into_make_service());
            let port = server.local_addr().port();

            tokio::spawn(async move {
                server.with_graceful_shotdown(async {
                    shutdown_rx.await.ok();
                    println!("Shutting down")
                })
                    .await
                    .unwrap();
            });

            let redirect_uri = format!(
                "http://127.0.0.1:8080/auth/github",
            );

            opener::open();
        })
    )
}
