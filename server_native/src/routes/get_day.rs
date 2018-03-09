use rocket_contrib::{Json, Value};
use super::super::types::data::Data;
use super::super::sql;

#[post("/", format = "application/json", data = "<data>")]
pub fn get_day(data: Json<Data<Option<i64>>>) -> Json<super::super::models::day::Day> {
  let body_data = data.0;
  Json(sql::get_day(body_data.params.unwrap(), &body_data.db))
}
