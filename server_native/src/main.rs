#![feature(plugin)]
#![plugin(rocket_codegen)]

extern crate rusqlite;

use rusqlite::Connection;

extern crate rocket;
#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate serde_derive;

use rocket_contrib::{Json, Value};
use rocket::State;
use std::collections::HashMap;
use std::sync::Mutex;

mod models;
mod types;

#[post("/", format = "application/json")]
fn get_days() -> Json<Vec<models::day::Day>> {
    let conn = Connection::open("../data.sqlite").unwrap();
    let mut stmnt = conn.prepare("select * from days").unwrap();
    let day_iter = stmnt.query_map(&[], |row| {
        models::day::Day {
            id: row.get(0),
            date: row.get(1),
            created_at: row.get(2),
            updated_at: row.get(3),
            tasks: vec!{
                models::task::Task {
                    id: 1,
                    description: "test".to_string(),
                    time: 4,
                    created_at: "test".to_string(),
                    updated_at: "test".to_string(),
                    synced: false,
                    day_id: 1,
                }
            }
        }
    }).unwrap();
    let mut final_result = Vec::new();
    for day_result in day_iter {
        final_result.push(day_result.unwrap());
    }
    Json(final_result)
}

#[error(404)]
fn not_found() -> Json<Value> {
    Json(json!({
        "status": "error",
        "reason": "Resource was not found."
    }))
}

fn rocket() -> rocket::Rocket {
    rocket::ignite()
        .mount("/getDays", routes![get_days])
        .catch(errors![not_found])
}

fn main() {
    rocket().launch();
}