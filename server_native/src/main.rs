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
        let id_string: i64 = row.get(0);
        println!("{}", &format!("select * from tasks where dayId = {}", id_string));
        let mut task_stmnt = conn.prepare(&format!("select * from tasks where dayId = {}", id_string)).unwrap();
        let task_iter = task_stmnt.query_map(&[], |task_row| {
            models::task::Task {
                id: task_row.get(0),
                description: task_row.get(1),
                time: task_row.get(2),
                created_at: get_iso_date(task_row.get(3)),
                updated_at: get_iso_date(task_row.get(4)),
                day_id: task_row.get(5),
                synced: task_row.get(6)
            }
        }).unwrap();
        let mut final_task_vec = Vec::new();
        for task in task_iter {
            final_task_vec.push(task.unwrap());
        }
        // let test: String = row.get(0);
        // println!("{}", row.get(0));
        models::day::Day {
            id: row.get(0),
            date: get_iso_date(row.get(1)),
            created_at: get_iso_date(row.get(2)),
            updated_at: get_iso_date(row.get(3)),
            tasks: final_task_vec
            // vec!(
            //     models::task::Task {
            //         id: 1,
            //         description: "test".to_string(),
            //         // time: 4,
            //         // created_at: "test".to_string(),
            //         // updated_at: "test".to_string(),
            //         // synced: 1,
            //         day_id: 1
            //     }
            // )
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

fn get_iso_date(original_str: String) -> String {
    let mut parts = original_str.split(" ");
    format!("{}T{}", parts.nth(0).unwrap(), parts.nth(0).unwrap())
}