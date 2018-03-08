use rocket_contrib::{Json, Value};
use super::super::types::single_value_body::SingleValueBody;
use super::super::sql;

#[post("/", format = "application/json", data = "<data>")]
pub fn get_day(data: Json<Option<SingleValueBody>>) -> Json<super::super::models::day::Day> {
  let body_data = data.0.unwrap();
  Json(sql::get_day(body_data.params, &body_data.db))
}
