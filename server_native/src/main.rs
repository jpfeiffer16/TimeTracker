#![feature(plugin)]
#![plugin(rocket_codegen)]

extern crate rusqlite;
extern crate chrono;
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
        .mount("/removeDay", routes![routes::remove_day::remove_day])
        .mount("/removeTask", routes![routes::remove_task::remove_task])
        .mount("/getNotes", routes![routes::get_notes::get_notes])
        .mount("/getNote", routes![routes::get_note::get_note])
        .mount("/saveNote", routes![routes::save_note::save_note])
        .mount("/removeNote", routes![routes::remove_note::remove_note])
        .mount("/getCategories", routes![routes::get_categories::get_categories])
        .mount("/getCategory", routes![routes::get_category::get_category])
        .mount("/removeCategory", routes![routes::remove_category::remove_category])
        .mount("/saveCategory", routes![routes::save_category::save_category])
        .catch(errors![not_found])
}

fn main() {
    rocket().launch();
}