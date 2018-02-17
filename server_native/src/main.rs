#![feature(plugin)]
#![plugin(rocket_codegen)]

mod models;

extern crate rustc_serialize;
extern crate rocket;

use rustc_serialize::json;

#[get("/<name>/<age>")]
fn hello(name: String, age: u8) -> String {
    format!("Hello, {} year old named {}!", age, name)
}

#[get("/")]
fn get_days() -> String {
    let mut data: Vec<models::day::Day> = vec!();
    for i in 1..11 {
        data.push(
            models::day::Day{
                date: i.to_string(),
                tasks: vec! {
                    models::task::Task {
                        id: 1,
                        day_id: 1,
                        description: "Test".to_string(),
                        synced: false,
                        time: 3
                    }
                }
            }
        );
    }
    json::encode(&data).unwrap()
}

fn main() {
    rocket::ignite()
        .mount("/hello", routes![hello])
        .mount("/getDays", routes![get_days])
        .launch();
    // rocket::ignite().mount("/getDays", routes![getDays]).launch();
    // let test = TestStruct { test: "test".to_string() };
    // let result = json::encode(&test).unwrap();
    // println!("{}", result);
}