use rocket_contrib::{Json, Value};
use super::super::types::data::Data;
use super::super::sql;

#[post("/", format = "application/json", data = "<data>")]
pub fn remove_day(data: Json<Data<Option<i64>>>) -> Json<Value> {
  let body_data = data.0;
  sql::remove_day(body_data.params.unwrap(), &body_data.db);
  Json(json!({
    "Success": "true"
  }))
}
