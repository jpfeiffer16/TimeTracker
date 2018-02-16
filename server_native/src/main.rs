#![feature(plugin)]
#![plugin(rocket_codegen)]

extern crate rustc_serialize;
extern crate rocket;

#[get("/<name>/<age>")]
fn hello(name: String, age: u8) -> String {
    format!("Hello, {} year old named {}!", age, name)
}

#[derive(RustcDecodable, RustcEncodable)]
pub struct TestStruct  {
    test: String
}

#[get("/test")]
fn hello(name: String, age: u8) -> String {
    // format!("Hello, {} year old named {}!", age, name)
    
}

fn main() {
    rocket::ignite().mount("/hello", routes![hello]).launch();
}