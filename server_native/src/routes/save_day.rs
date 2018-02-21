use rocket_contrib::{Json, Value};
use super::super::types::day_body::DayBody;
use super::super::sql;

#[post("/", format = "application/json", data = "<data>")]
pub fn save_day(data: Json<Option<DayBody>>) -> Json<Value> {
  sql::save_day(data.0.unwrap().params);
  Json(json!({
    "Ok": "true"
  }))
}
