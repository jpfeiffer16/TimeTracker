use rusqlite::Error;
use rocket_contrib::{Json, Value};
use super::super::sql;
use super::super::types::single_value_body::SingleValueBody;

#[post("/", format = "application/json", data = "<data>")]
pub fn remove_note(data: Json<Option<SingleValueBody>>) -> Json<Value> {
  let body_data = data.0.unwrap();
  sql::remove_note(body_data.params, &body_data.db);
  Json(json!({
    "Success": "true"
  }))
}
