use rocket_contrib::{Json, Value};
use super::super::types::single_value_body::SingleValueBody;
use super::super::sql;

#[post("/", format = "application/json", data = "<data>")]
pub fn remove_task(data: Json<Option<SingleValueBody>>) -> Json<Value> {
  sql::remove_task(data.0.unwrap().params);
  Json(json!({
    "Success": "true"
  }))
}
