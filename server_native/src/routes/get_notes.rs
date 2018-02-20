use rusqlite::Connection;
use rocket_contrib::{Json, Value};
// use super::super::helpers as helpers;

#[post("/", format = "application/json")]
pub fn get_days() -> Json<Vec<super::super::models::day::Day>> {
  //TODO: Finish implementing. Also, there should be a module or static
  //      property for the DB connection
  // let conn = Connection::open("../data.sqlite").unwrap();
  // let mut stmnt = conn.prepare("select * from notes").unwrap();
  // Json()
}
