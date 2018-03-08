use rocket_contrib::{Json, Value};
use super::super::types::single_value_body::SingleValueBody;
use super::super::sql;

#[post("/", format = "application/json", data = "<data>")]
pub fn remove_task(data: Json<Option<SingleValueBody>>) -> Json<Value> {
  let body_data = data.0.unwrap();
  sql::remove_task(body_data.params, &body_data.db);
  Json(json!({
    "Success": "true"
  }))
}
