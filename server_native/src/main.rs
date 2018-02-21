#![feature(plugin)]
#![plugin(rocket_codegen)]

extern crate rusqlite;

extern crate rocket;
#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate serde_derive;

use rocket_contrib::{Json, Value};
use std::collections::HashMap;
use std::sync::Mutex;

mod models;
mod types;
mod routes;
mod helpers;

mod sql;

#[error(404)]
fn not_found() -> Json<Value> {
    Json(json!({
        "status": "error",
        "reason": "Resource was not found."
    }))
}

fn rocket() -> rocket::Rocket {
    rocket::ignite()
        .mount("/getDays", routes![routes::get_days::get_days])
        .mount("/getDay", routes![routes::get_day::get_day])
        .mount("/saveDay", routes![routes::save_day::save_day])
        .catch(errors![not_found])
}

fn main() {
    rocket().launch();
}