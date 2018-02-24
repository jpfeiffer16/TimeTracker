use rusqlite::Error;
use rocket_contrib::{Json, Value};
use super::super::sql;
use super::super::types::single_value_body::SingleValueBody;

#[post("/", format = "application/json", data = "<data>")]
pub fn remove_note(data: Json<Option<SingleValueBody>>) -> Json<Value> {
  sql::remove_note(data.0.unwrap().params);
  Json(json!({
    "Success": "true"
  }))
}
