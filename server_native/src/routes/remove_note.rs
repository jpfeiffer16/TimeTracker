use rusqlite::Error;
use rocket_contrib::{Json, Value};
use super::super::sql;
use super::super::types::data::Data;

#[post("/", format = "application/json", data = "<data>")]
pub fn remove_note(data: Json<Data<Option<i64>>>) -> Json<Value> {
  let body_data = data.0;
  sql::remove_note(body_data.params.unwrap(), &body_data.db);
  Json(json!({
    "Success": "true"
  }))
}
